import mongoose from 'mongoose';
import StorableQuestion from '../Storables/StorableQuestion';
import { OptionDocument, OptionSchema } from './OptionSchema';
import QuestionType from './QuestionType';
import { RowQuestionDocument, RowQuestionSchema } from './RowQuestionSchema';
import ScaleType from './ScaleType';

export interface QuestionDocument extends mongoose.Document {
  type: QuestionType.asUnion;
  text: string;
  header: string;
  id: string;
  isRequired: boolean;
  minText?: string;
  maxText?: string;
  min?: number;
  max?: number;
  step?: number;
  scaleType?: ScaleType.asUnion;
  numLines?: number;
  options?: OptionDocument[];
  rows?: RowQuestionDocument[];
  toStorable(): StorableQuestion;
}

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: QuestionType.asArray,
    required: true,
  },
  isRequired: {
    type: Boolean,
    required: true,
  },
  text: { type: String, required: true },
  header: { type: String, required: true },
  minText: { type: String },
  maxText: { type: String },
  min: { type: Number },
  max: { type: Number },
  step: { type: Number },
  scaleType: { type: String, enum: ScaleType.asArray },
  numLines: { type: Number },
  options: [OptionSchema],
  rows: [RowQuestionSchema],
});

QuestionSchema.methods.toStorable = function (): StorableQuestion {
  const question = this as QuestionDocument;
  return {
    _id: question._id,
    type: question.type,
    text: question.text,
    header: question.header,
    isRequired: question.isRequired,
    minText: question.minText,
    maxText: question.maxText,
    min: question.min,
    max: question.max,
    step: question.step,
    scaleType: question.scaleType,
    numLines: question.numLines,
    options: question.options?.map((elem) => elem.toStorable()),
    rows: question.rows?.map((elem) => elem.toStorable()),
  };
};

export default QuestionSchema;
