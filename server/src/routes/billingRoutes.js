import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createCheckoutSession, confirmDemoPayment } from '../controllers/billingController.js';
import { asyncHandler } from '../lib/httpError.js';

const router = Router();

router.post('/checkout', authMiddleware, asyncHandler(createCheckoutSession));
router.post('/demo/confirm', authMiddleware, asyncHandler(confirmDemoPayment));

export default router;
