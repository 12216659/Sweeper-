import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    discountPercentage: number;
    maxDiscountAmount: number;
    expirationDate: Date;
    isActive: boolean;
    usageLimit: number;
    timesUsed: number;
}

const couponSchema = new Schema<ICoupon>({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    maxDiscountAmount: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    usageLimit: {
        type: Number,
        default: 100,
    },
    timesUsed: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
export default Coupon;
