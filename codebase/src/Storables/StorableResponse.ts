import StorableOption, {
  isMaybeStorableOptionArray,
  isStorableOptionArray,
} from './StorableOption';
import { Types } from 'mongoose';
import {
  arrayTPFactory,
  isMaybeNumber,
  isMaybeString,
  isString,
  maybeTPFactory,
} from './TypeguardUtil';

export type StorableRowResponse = {
  questionId: string;
  selcOptions: StorableOption[];
};

type StorableResponse = {
  questionId: string | Types.ObjectId;
  dateResponse?: number;
  numResponse?: number;
  openResponse?: string;
  selcOptions?: StorableOption[];
  selcImgOption?: number;
  rowResponses?: StorableRowResponse[];
};
export default StorableResponse;

const isStorableRowResponse = (arg: any): arg is StorableRowResponse =>
  isString(arg.questionId) && isStorableOptionArray(arg.selcOptions);

const isStorableRowResponseArray = arrayTPFactory(isStorableRowResponse);

const isMaybeStorableRowResponseArray = maybeTPFactory(
  isStorableRowResponseArray
);

export const isStorableResponse = (arg: any): arg is StorableResponse =>
  isString(arg.questionId) &&
  isMaybeString(arg.openResponse) &&
  isMaybeNumber(arg.dateResponse) &&
  isMaybeNumber(arg.numResponse) &&
  isMaybeNumber(arg.selcImgOption) &&
  isMaybeStorableOptionArray(arg.selcOptions) &&
  isMaybeStorableRowResponseArray(arg.rowResponses);

export const isStorableResponseArray = arrayTPFactory(isStorableResponse);
