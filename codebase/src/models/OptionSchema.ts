import mongoose from 'mongoose';
import StorableOption from '../Storables/StorableOption';

export interface OptionDocument extends mongoose.Document {
  text: string;
  toStorable(): StorableOption;
}

export const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

OptionSchema.methods.toStorable = function (): StorableOption {
  const option = this as OptionDocument;
  return {
    _id: option._id,
    text: option.text,
  };
};
