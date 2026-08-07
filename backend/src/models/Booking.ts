import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    bookingId: string;
    user: mongoose.Types.ObjectId;
    service: mongoose.Types.ObjectId;
    packageType: string;
    extraServices: Array<{ name: string; price: number }>;
    date: Date;
    timeSlot: string;
    recurringType: 'None' | 'Weekly' | 'Bi-Weekly' | 'Monthly';
    baseAmount: number;
    extrasAmount: number;
    discountAmount: number;
    couponCode?: string;
    gstAmount: number;
    totalAmount: number;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        lat?: number;
        lng?: number;
    };
    notes?: string;
    bookingStatus: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
    paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
}

const bookingSchema = new Schema<IBooking>({
    bookingId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    packageType: { type: String, default: 'Standard' },
    extraServices: [{
        name: String,
        price: Number
    }],
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    recurringType: { type: String, enum: ['None', 'Weekly', 'Bi-Weekly', 'Monthly'], default: 'None' },
    
    baseAmount: { type: Number, required: true },
    extrasAmount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String },
    gstAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        lat: Number,
        lng: Number
    },
    notes: String,
    
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Confirmed'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Paid' // Default to Paid for mocked payment flow
    }
}, { timestamps: true });

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
