import mongoose from 'mongoose';
import StorableRowQuestion from '../Storables/StorableRowQuestion';

export interface RowQuestionDocument extends mongoose.Document {
  text: string;
  toStorable(): StorableRowQuestion;
}

export const RowQuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

RowQuestionSchema.methods.toStorable = function (): StorableRowQuestion {
  const rowQuestion = this as RowQuestionDocument;
  return {
    _id: rowQuestion._id,
    text: rowQuestion.text,
  };
};
