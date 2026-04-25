import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../lib/httpError.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login',    asyncHandler(login));
router.get('/me',        authMiddleware, asyncHandler(me));

export default router;
