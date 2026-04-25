import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createCheckoutSession } from '../controllers/billingController.js';
import { asyncHandler } from '../lib/httpError.js';

const router = Router();

router.post('/checkout', authMiddleware, asyncHandler(createCheckoutSession));

export default router;
