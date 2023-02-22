import { Types } from 'mongoose';
import StorableResponse, { isStorableResponseArray } from './StorableResponse';
import { arrayTPFactory, isNumber, isString } from './TypeguardUtil';

type StorableEntry = {
  _id: string | Types.ObjectId;
  journalId: string;
  userEmail: string;
  submittedAt: number;
  responses: StorableResponse[];
};
export default StorableEntry;

export const isStorableEntry = (arg: any): arg is StorableEntry =>
  isString(arg._id) &&
  isString(arg.journalId) &&
  isString(arg.userEmail) &&
  isNumber(arg.submittedAt) &&
  isStorableResponseArray(arg.responses);

export const isStorableEntryArray = arrayTPFactory(isStorableEntry);
