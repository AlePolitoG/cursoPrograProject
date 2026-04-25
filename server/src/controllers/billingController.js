import Stripe from 'stripe';
import { env } from '../lib/env.js';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

// Lazy singleton — keeps the server bootable in dev without a Stripe key
// and lets us throw a clearer error when billing routes are actually hit.
let stripeClient = null;
function getStripe() {
  if (stripeClient) return stripeClient;
  if (!env.STRIPE_SECRET_KEY) {
    throw new HttpError(503, 'Billing is not configured (missing STRIPE_SECRET_KEY)');
  }
  stripeClient = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  return stripeClient;
}

/** POST /api/billing/checkout
 *  Creates (or reuses) a Stripe customer and returns a Checkout Session URL
 *  for the configured subscription price. Front-end redirects the browser
 *  to that URL.
 */
export async function createCheckoutSession(req, res) {
  if (!env.STRIPE_PRICE_ID) {
    throw new HttpError(503, 'Billing is not configured (missing STRIPE_PRICE_ID)');
  }
  const stripe = getStripe();
  const user = req.user;

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${env.CORS_ORIGIN}/dashboard?checkout=success`,
    cancel_url: `${env.CORS_ORIGIN}/dashboard?checkout=cancelled`,
    allow_promotion_codes: true,
  });

  res.json({ url: session.url });
}

/** POST /api/webhooks/stripe
 *  Express raw-body parser is mounted only on this path (see index.js) so
 *  signature verification works. Updates `isSubscribed` based on subscription
 *  lifecycle events. Idempotent — Stripe retries are safe.
 */
export async function stripeWebhook(req, res) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw new HttpError(503, 'Webhook secret not configured');
  }
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      const active = ['active', 'trialing'].includes(sub.status);
      await prisma.user.updateMany({
        where: { stripeCustomerId: sub.customer },
        data: { isSubscribed: active },
      });
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      await prisma.user.updateMany({
        where: { stripeCustomerId: sub.customer },
        data: { isSubscribed: false },
      });
      break;
    }
    default:
      // Ignore unrelated events — log only in dev.
      if (env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[stripe] unhandled event', event.type);
      }
  }

  res.json({ received: true });
}
