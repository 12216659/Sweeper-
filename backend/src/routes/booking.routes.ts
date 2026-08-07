import express from 'express';
import { createBooking, getMyBookings, cancelBooking, applyCoupon } from '../controllers/booking.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// All booking routes require authentication
router.use(protect);

router.post('/', createBooking);
router.get('/my-bookings', getMyBookings);
router.post('/apply-coupon', applyCoupon);
router.patch('/:id/cancel', cancelBooking);

export default router;
