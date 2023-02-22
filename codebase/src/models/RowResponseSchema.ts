import mongoose from 'mongoose';
import StorableResponse, {
  StorableRowResponse,
} from '../Storables/StorableResponse';
import { OptionDocument, OptionSchema } from './OptionSchema';

export interface RowResponseDocument extends mongoose.Document {
  questionId: string;
  selcOptions: OptionDocument[];
  toStorable(): StorableRowResponse;
}

const RowResponseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Types.ObjectId, required: true },
  selcOptions: { type: [OptionSchema], required: true },
});

RowResponseSchema.methods.toStorable = function (): StorableRowResponse {
  const rowResponse = this as RowResponseDocument;
  return {
    questionId: rowResponse.questionId,
    selcOptions: rowResponse.selcOptions.map((elem) => elem.toStorable()),
  };
};

export default RowResponseSchema;
