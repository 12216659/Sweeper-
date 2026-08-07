import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import Coupon from '../models/Coupon';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

// Generate random booking ID e.g. SWP-8291A
const generateBookingId = () => {
    return 'SWP-' + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { 
        service, 
        packageType, 
        extraServices = [], 
        date, 
        timeSlot, 
        recurringType,
        baseAmount, 
        couponCode,
        address, 
        notes 
    } = req.body;

    if (!service || !date || !timeSlot || !baseAmount || !address) {
        return next(new AppError('Please provide all required booking fields', 400));
    }

    let discountAmount = 0;
    
    // Calculate extras
    const extrasAmount = extraServices.reduce((sum: number, extra: any) => sum + extra.price, 0);
    const subtotal = baseAmount + extrasAmount;

    // Validate Coupon
    if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
        if (coupon && coupon.expirationDate > new Date() && coupon.timesUsed < coupon.usageLimit) {
            let calculatedDiscount = (subtotal * coupon.discountPercentage) / 100;
            if (calculatedDiscount > coupon.maxDiscountAmount) {
                calculatedDiscount = coupon.maxDiscountAmount;
            }
            discountAmount = calculatedDiscount;
            
            // Increment coupon usage
            coupon.timesUsed += 1;
            await coupon.save();
        }
    }

    const amountAfterDiscount = subtotal - discountAmount;
    
    // Calculate 18% GST
    const gstAmount = amountAfterDiscount * 0.18;
    const totalAmount = amountAfterDiscount + gstAmount;

    const bookingId = generateBookingId();

    const booking = await Booking.create({
        bookingId,
        user: req.user._id,
        service,
        packageType,
        extraServices,
        date,
        timeSlot,
        recurringType,
        baseAmount,
        extrasAmount,
        discountAmount,
        couponCode,
        gstAmount,
        totalAmount,
        address,
        notes,
    });

    // In a real scenario, this is where we'd send email/SMS
    console.log(`[Notification Engine Mock]: Sending Booking Confirmation to User for Booking ID: ${bookingId}`);

    res.status(201).json({
        status: 'success',
        data: {
            booking,
        },
    });
});

export const getMyBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('service').sort('-createdAt');

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
            bookings,
        },
    });
});

export const cancelBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!booking) {
        return next(new AppError('Booking not found', 404));
    }

    booking.bookingStatus = 'Cancelled';
    await booking.save();

    console.log(`[Notification Engine Mock]: Sending Cancellation Email for Booking ID: ${booking.bookingId}`);

    res.status(200).json({
        status: 'success',
        message: 'Booking cancelled successfully',
        data: { booking }
    });
});

export const applyCoupon = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    
    if (!coupon) {
        return next(new AppError('Invalid coupon code', 400));
    }
    
    if (coupon.expirationDate < new Date()) {
        return next(new AppError('Coupon has expired', 400));
    }
    
    if (coupon.timesUsed >= coupon.usageLimit) {
        return next(new AppError('Coupon usage limit reached', 400));
    }

    res.status(200).json({
        status: 'success',
        data: { coupon }
    });
});
