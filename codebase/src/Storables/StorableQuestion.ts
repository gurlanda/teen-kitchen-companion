import { Types } from 'mongoose';
import QuestionType from '../models/QuestionType';
import ScaleType from '../models/ScaleType';
import StorableOption, { isMaybeStorableOptionArray } from './StorableOption';
import StorableRowQuestion, {
  isMaybeStorableRowQuestionArray,
} from './StorableRowQuestion';
import {
  arrayTPFactory,
  isBoolean,
  isMaybeNumber,
  isMaybeString,
  isString,
} from './TypeguardUtil';

type StorableQuestion = {
  _id: string | Types.ObjectId;
  type: QuestionType.asUnion;
  text: string;
  header: string;
  isRequired: boolean;
  minText?: string;
  maxText?: string;
  min?: number;
  max?: number;
  step?: number;
  scaleType?: string;
  numLines?: number;
  options?: StorableOption[];
  rows?: StorableRowQuestion[];
};
export default StorableQuestion;

export const isStorableQuestion = (arg: any): arg is StorableQuestion =>
  isString(arg._id) &&
  isString(arg.text) &&
  isString(arg.header) &&
  isMaybeString(arg.minText) &&
  isMaybeString(arg.maxText) &&
  ScaleType.asArray.includes(arg.scaleType) &&
  QuestionType.asArray.includes(arg.type) &&
  isBoolean(arg.isRequired) &&
  isMaybeNumber(arg.min) &&
  isMaybeNumber(arg.max) &&
  isMaybeNumber(arg.step) &&
  isMaybeNumber(arg.numLines) &&
  isMaybeStorableOptionArray(arg.options) &&
  isMaybeStorableRowQuestionArray(arg.rows);

export const isStorableQuestionArray = arrayTPFactory(isStorableQuestion);
