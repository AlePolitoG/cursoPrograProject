import 'dotenv/config';
import { z } from 'zod';

// Validate environment at boot. Failing fast here is much cheaper than
// debugging a 500 in production caused by a missing JWT_SECRET.
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  DATABASE_URL: z.string().url(),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 chars'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  FREE_LESSON_LIMIT: z.coerce.number().int().nonnegative().default(4),

  // Subscription price shown in the UI and charged at checkout (whole USD).
  BILLING_PRICE_USD: z.coerce.number().int().positive().default(30),

  // Stripe is optional in dev — only required when /webhooks/stripe is hit.
  // When STRIPE_SECRET_KEY + STRIPE_PRICE_ID are absent, billing runs in a
  // self-contained "demo" mode (no real charge) — see billingController.js.
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
