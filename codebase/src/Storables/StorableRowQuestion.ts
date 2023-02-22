import { Types } from 'mongoose';
import { arrayTPFactory, isString, maybeTPFactory } from './TypeguardUtil';

type StorableRowQuestion = {
  _id: string | Types.ObjectId;
  text: string;
};

export default StorableRowQuestion;

export const isStorableRowQuestion = (arg: any): arg is StorableRowQuestion =>
  isString(arg._id) && isString(arg.text);

export const isStorableRowQuestionArray = arrayTPFactory(isStorableRowQuestion);

export const isMaybeStorableRowQuestionArray = maybeTPFactory(
  isStorableRowQuestionArray
);
