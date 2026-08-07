import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import User from '../models/User';
import Service from '../models/Service';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const getDashboardStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1. Total Revenue (sum of totalAmount from all bookings that are not cancelled)
    const revenueResult = await Booking.aggregate([
        { $match: { bookingStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // 2. Total Bookings
    const totalBookings = await Booking.countDocuments();

    // 3. Total Customers
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // 4. Total Services
    const totalServices = await Service.countDocuments();

    // 5. Recent Bookings for a chart (Last 7 days, mock simple aggregate)
    // In production we would group by day.

    res.status(200).json({
        status: 'success',
        data: {
            stats: {
                totalRevenue,
                totalBookings,
                totalCustomers,
                totalServices,
            }
        }
    });
});

export const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await Booking.find()
        .populate('user', 'firstName lastName email')
        .populate('service', 'name')
        .sort('-createdAt');

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: { bookings }
    });
});

export const makeMeAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // DEV ONLY ROUTE to upgrade current user to Admin
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'You are now an Admin! Please refresh or log in again to see changes.',
        data: { user }
    });
});
