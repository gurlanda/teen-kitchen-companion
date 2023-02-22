import mongoose from 'mongoose';
import { UserDocument } from './User';

export interface SessionDocument extends mongoose.Document {
  user: UserDocument['email'];
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: String, ref: 'User', required: true },
    isValid: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionDocument>('Session', sessionSchema);
export default Session;
