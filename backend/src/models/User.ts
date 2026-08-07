import mongoose, { Document, Schema } from 'mongoose';
import * as argon2 from 'argon2';

export enum UserRole {
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
    ADMIN = 'admin',
    SUPER_ADMIN = 'superadmin'
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone?: string;
    role: 'customer' | 'employee' | 'manager' | 'admin';
    googleId?: string;
    profileImage?: string;
    isActive: boolean;
    walletBalance: number;
    loyaltyPoints: number;
    referralCode: string;
    savedAddresses: Array<{
        title: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        isDefault: boolean;
    }>;
    isEmailVerified: boolean;
    lastLogin?: Date;
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    
    // Virtuals/Methods
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: [true, 'First name is required'], trim: true },
    lastName: { type: String, required: [true, 'Last name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    password: { type: String, minlength: [8, 'Password must be at least 8 characters'], select: false },
    phone: { type: String, trim: true },
    role: { type: String, enum: ['customer', 'employee', 'manager', 'admin'], default: 'customer' },
    googleId: String,
    profileImage: String,
    isActive: { type: Boolean, default: true },
    walletBalance: { type: Number, default: 0 },
    loyaltyPoints: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    savedAddresses: [{
        title: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        isDefault: { type: Boolean, default: false }
    }],
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {
    timestamps: true,
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password') || !this.password) return;

    try {
        this.password = await argon2.hash(this.password);
    } catch (error: any) {
        throw new Error(error.message);
    }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    try {
        return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
        return false;
    }
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
