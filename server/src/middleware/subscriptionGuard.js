import { env } from '../lib/env.js';
import { HttpError } from '../lib/httpError.js';

/**
 * Paywall enforcement. Reads `lessonIndex` from req.params and applies:
 *
 *   lessonIndex <= FREE_LESSON_LIMIT  → free, pass through
 *   lessonIndex >  FREE_LESSON_LIMIT  → require req.user.isSubscribed
 *
 * Must be mounted AFTER authMiddleware so req.user exists. The frontend
 * mirrors this rule for UX, but the server is the source of truth: never
 * return paid lesson content unless this guard passed.
 */
export function subscriptionGuard(req, _res, next) {
  const raw = req.params.lessonIndex;
  const lessonIndex = Number.parseInt(raw, 10);

  if (!Number.isFinite(lessonIndex) || lessonIndex < 0) {
    return next(new HttpError(400, 'Invalid lessonIndex'));
  }

  if (lessonIndex <= env.FREE_LESSON_LIMIT) {
    return next();
  }

  if (req.user?.isSubscribed) {
    return next();
  }

  return next(
    new HttpError(403, 'Subscription required to access this lesson', {
      code: 'SUBSCRIPTION_REQUIRED',
      freeLessonLimit: env.FREE_LESSON_LIMIT,
      requestedLessonIndex: lessonIndex,
      upgradeUrl: '/api/billing/checkout',
    }),
  );
}
