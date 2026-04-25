import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { subscriptionGuard } from '../middleware/subscriptionGuard.js';
import {
  getLesson,
  upsertProgress,
  listProgress,
  listAllProgress,
} from '../controllers/courseController.js';
import { asyncHandler } from '../lib/httpError.js';

const router = Router();

// Every route under /api/courses requires a valid JWT.
router.use(authMiddleware);

// Progress read (all courses) — auth-only, no paywall
router.get('/progress', asyncHandler(listAllProgress));

// Lesson read — paywalled.
router.get(
  '/:courseId/lessons/:lessonIndex',
  subscriptionGuard,
  asyncHandler(getLesson),
);

// Progress write — also paywalled (no point recording fake progress on
// content the user isn't allowed to see).
router.post(
  '/:courseId/progress/:lessonIndex',
  subscriptionGuard,
  asyncHandler(upsertProgress),
);

// Progress read — auth-only, no paywall (clients need to render the lock UI).
router.get('/:courseId/progress', asyncHandler(listProgress));

export default router;
