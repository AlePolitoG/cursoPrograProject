import { verifyToken } from '../lib/jwt.js';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

/**
 * Verifies a Bearer JWT, loads the fresh user row, and attaches it to
 * `req.user`. We re-fetch from the DB on every protected request rather than
 * trusting the token's claims because subscription state mutates outside the
 * auth flow (Stripe webhooks). Token claims are still useful as a cheap
 * existence/expiry check before the DB hit.
 *
 * Failure modes:
 *   - missing/malformed header  → 401 "Missing token"
 *   - invalid signature/expired → 401 "Invalid or expired token"
 *   - token valid but user gone → 401 "User no longer exists"
 */
export async function authMiddleware(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new HttpError(401, 'Missing token');
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      throw new HttpError(401, 'Invalid or expired token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        isSubscribed: true,
        stripeCustomerId: true,
        createdAt: true,
      },
    });

    if (!user) throw new HttpError(401, 'User no longer exists');

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
