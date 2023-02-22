import { Types } from 'mongoose';
import StorableQuestion, { isStorableQuestionArray } from './StorableQuestion';
import { isNumber, isString } from './TypeguardUtil';

type StorableJournal = {
  _id: string | Types.ObjectId;
  weekStart: number;
  weekEnd: number;
  questions: StorableQuestion[];
};
export default StorableJournal;

export const isStorableJournal = (arg: any): arg is StorableJournal =>
  isString(arg._id) &&
  isNumber(arg.weekStart) &&
  isNumber(arg.weekEnd) &&
  isStorableQuestionArray(arg.questions);
