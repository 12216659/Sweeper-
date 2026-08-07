import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
    name: string;
    description: string;
    category: mongoose.Types.ObjectId;
    basePrice: number;
    durationMinutes: number;
    imageUrl?: string;
    iconUrl?: string;
    isSubscription?: boolean;
    packages?: {
        name: string;
        price: number;
        features: string[];
        isPopular?: boolean;
    }[];
}

const packageSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false }
});

const serviceSchema = new Schema<IService>({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    basePrice: {
        type: Number,
        required: [true, 'Service base price is required'],
        min: 0,
    },
    durationMinutes: {
        type: Number,
        required: [true, 'Estimated duration in minutes is required'],
        min: 1,
    },
    imageUrl: String,
    iconUrl: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    isSubscription: {
        type: Boolean,
        default: false,
    },
    packages: [packageSchema],
    includedItems: [{
        type: String,
    }],
}, { timestamps: true });

const Service = mongoose.model<IService>('Service', serviceSchema);
export default Service;
