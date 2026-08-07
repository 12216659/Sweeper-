import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description: string;
    imageUrl?: string;
    isActive: boolean;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Category description is required'],
    },
    imageUrl: String,
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
