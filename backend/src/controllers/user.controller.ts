import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

export const addAddress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const { title, street, city, state, zipCode, isDefault } = req.body;

    if (isDefault) {
        user.savedAddresses.forEach(addr => addr.isDefault = false);
    }

    user.savedAddresses.push({ title, street, city, state, zipCode, isDefault });
    await user.save();

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});
