import express from 'express';
import { getDashboardStats, getAllBookings, makeMeAdmin } from '../controllers/admin.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../models/User';

const router = express.Router();

// DEV ONLY route to easily test Admin features
router.post('/make-me-admin', protect, makeMeAdmin);

// Protect all other admin routes
router.use(protect);
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.get('/stats', getDashboardStats);
router.get('/bookings', getAllBookings);

export default router;
