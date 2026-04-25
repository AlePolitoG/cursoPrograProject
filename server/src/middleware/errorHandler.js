import { env } from '../lib/env.js';
import { HttpError } from '../lib/httpError.js';

// Express identifies error-handling middleware by arity (4 args), so the
// `_next` parameter is required even though it's unused.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  // Prisma — unique constraint violation
  if (err?.code === 'P2002') {
    return res.status(409).json({ error: 'Conflict', details: err.meta });
  }

  // Unknown — log server-side, return a generic message to the client.
  // eslint-disable-next-line no-console
  console.error('[unhandled]', err);
  res.status(500).json({
    error: 'Internal server error',
    ...(env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}

export function notFound(_req, res) {
  res.status(404).json({ error: 'Not found' });
}
