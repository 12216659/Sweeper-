import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

const signToken = (id: string, secret: string, expiresIn: string) => {
    return jwt.sign({ id }, secret, {
        expiresIn: expiresIn as any,
    });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const accessToken = signToken(user._id, process.env.JWT_SECRET!, process.env.JWT_EXPIRES_IN!);
    const refreshToken = signToken(user._id, process.env.JWT_REFRESH_SECRET!, process.env.JWT_REFRESH_EXPIRES_IN!);

    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    // Remove password from output
    user.password = undefined;
    user.refreshToken = undefined;

    res.status(statusCode).json({
        status: 'success',
        token: accessToken,
        data: {
            user,
        },
    });
};

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('Email is already in use.', 400));
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        role: role || 'customer', // Default to customer if not specified
    });

    createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
});

export const logout = (req: Request, res: Response) => {
    res.cookie('refreshToken', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
