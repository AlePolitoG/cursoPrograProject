import Stripe from 'stripe';
import { env } from '../lib/env.js';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

// Demo mode: when real Stripe keys are absent we run a self-contained payment
// flow (no external charge) so the product is usable in beta. As soon as
// STRIPE_SECRET_KEY + STRIPE_PRICE_ID are provided, the real Stripe flow wins.
const isStripeConfigured = () => Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_PRICE_ID);

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
 *  In Stripe mode: creates (or reuses) a customer and returns a Checkout
 *  Session URL for the browser to redirect to.
 *  In demo mode (no Stripe keys): returns `{ mock: true, amount }` and the
 *  client renders an in-app demo checkout page instead.
 */
export async function createCheckoutSession(req, res) {
  if (!isStripeConfigured()) {
    // Beta / demo: no external provider. The client routes to its own
    // checkout page and later calls /billing/demo/confirm to activate PRO.
    return res.json({
      mock: true,
      amount: env.BILLING_PRICE_USD,
      currency: 'usd',
    });
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

/** POST /api/billing/demo/confirm
 *  Demo-mode only. Activates the subscription for the authenticated user
 *  without any external charge. Hard-disabled once real Stripe keys exist,
 *  so it can never be used to bypass a real paywall in production.
 */
export async function confirmDemoPayment(req, res) {
  if (isStripeConfigured()) {
    throw new HttpError(409, 'Demo checkout is disabled while Stripe is configured');
  }

  await prisma.user.update({
    where: { id: req.user.id },
    data: { isSubscribed: true },
  });

  res.json({ ok: true, isSubscribed: true });
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
