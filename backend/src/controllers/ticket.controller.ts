import { Request, Response, NextFunction } from 'express';
import Ticket from '../models/Ticket';
import { catchAsync } from '../utils/catchAsync';

export const createTicket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { subject, description, priority } = req.body;

    const ticketId = 'TKT-' + Math.random().toString(36).substr(2, 6).toUpperCase();

    const ticket = await Ticket.create({
        ticketId,
        user: req.user._id,
        subject,
        description,
        priority,
        messages: [{
            sender: 'customer',
            message: description,
        }]
    });

    res.status(201).json({
        status: 'success',
        data: { ticket }
    });
});

export const getMyTickets = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({ user: req.user._id }).sort('-createdAt');

    res.status(200).json({
        status: 'success',
        results: tickets.length,
        data: { tickets }
    });
});
