import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './lib/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { asyncHandler } from './lib/httpError.js';
import { stripeWebhook } from './controllers/billingController.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import billingRoutes from './routes/billingRoutes.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// IMPORTANT: Stripe webhook MUST receive the raw body for signature
// verification. Mount it BEFORE the JSON parser, scoped to its exact path.
app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  asyncHandler(stripeWebhook),
);

// JSON parser for everything else.
app.use(express.json({ limit: '1mb' }));

// Health probe — useful for load balancers and container orchestrators.
app.get('/healthz', (_req, res) => res.json({ ok: true, env: env.NODE_ENV }));

// API routes.
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/billing', billingRoutes);

// 404 + error handler — must be last.
app.use(notFound);
app.use(errorHandler);

export { app };
