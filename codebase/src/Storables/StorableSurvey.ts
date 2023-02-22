import { Types } from 'mongoose';
import UserType, { isUserTypeArray } from '../models/UserType';
import StorableQuestion, { isStorableQuestionArray } from './StorableQuestion';
import { isMaybeNumber, isNumber, isString } from './TypeguardUtil';

type StorableSurvey = {
  _id: string | Types.ObjectId;
  title: string;
  version: number;
  description: string;
  audience: UserType.asUnion[];
  deactivatedAt?: number;
  updatedAt?: number;
  questions: StorableQuestion[];
};
export default StorableSurvey;

export const isStorableSurvey = (arg: any): arg is StorableSurvey =>
  isString(arg._id) &&
  isString(arg.title) &&
  isString(arg.description) &&
  isUserTypeArray(arg.audience) &&
  isNumber(arg.version) &&
  isMaybeNumber(arg.deactivatedAt) &&
  isMaybeNumber(arg.updatedAt) &&
  isStorableQuestionArray(arg.questions);
