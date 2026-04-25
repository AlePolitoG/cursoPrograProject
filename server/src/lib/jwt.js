import jwt from 'jsonwebtoken';
import { env } from './env.js';

// Token payload contract — keep small. We re-fetch isSubscribed from the DB
// in authMiddleware so that subscription state can change without forcing a
// re-login (e.g., after a Stripe webhook flips the flag).
export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN, algorithm: 'HS256' },
  );
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
}
