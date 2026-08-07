import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
    ticketId: string;
    user: mongoose.Types.ObjectId;
    subject: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    priority: 'Low' | 'Medium' | 'High';
    messages: Array<{
        sender: 'customer' | 'support';
        message: string;
        timestamp: Date;
    }>;
}

const ticketSchema = new Schema<ITicket>({
    ticketId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    messages: [{
        sender: { type: String, enum: ['customer', 'support'], required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
export default Ticket;
