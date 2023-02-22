import mongoose, { Types } from 'mongoose';
import StorableResponse, {
  StorableRowResponse,
} from '../Storables/StorableResponse';
import { OptionDocument, OptionSchema } from './OptionSchema';
import { QuestionDocument } from './QuestionSchema';
import RowResponseSchema, { RowResponseDocument } from './RowResponseSchema';

export interface ResponseDocument extends mongoose.Document {
  questionId: QuestionDocument['_id'];
  dateResponse?: Date;
  numResponse?: number;
  openResponse?: string;
  selcImgOption?: number;
  selcOptions?: OptionDocument[];
  rowResponses?: RowResponseDocument[];
  toStorable(): StorableResponse;
}

const ResponseSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Types.ObjectId, required: true },
    dateResponse: Date,
    numResponse: Number,
    openResponse: String,
    selcImgOption: Number,
    selcOptions: [OptionSchema],
    rowResponses: [RowResponseSchema],
  },
  { timestamps: true }
);

ResponseSchema.methods.toStorable = function (): StorableResponse {
  const response = this as ResponseDocument;
  return {
    questionId: response.questionId,
    dateResponse: response.dateResponse?.getTime(),
    numResponse: response.numResponse,
    openResponse: response.openResponse,
    selcImgOption: response.selcImgOption,
    rowResponses: response.rowResponses?.map((elem) => elem.toStorable()),
    selcOptions: response.selcOptions?.map((elem) => elem.toStorable()),
  };
};

export default ResponseSchema;
