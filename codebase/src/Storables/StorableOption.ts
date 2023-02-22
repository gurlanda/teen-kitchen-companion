import { Types } from 'mongoose';
import {
  isArray,
  maybeTPFactory,
  isString,
  arrayTPFactory,
} from './TypeguardUtil';

type StorableOption = {
  _id: string | Types.ObjectId;
  text: string;
};
export default StorableOption;

export const isStorableOption = (arg: any): arg is StorableOption =>
  isString(arg._id) && isString(arg.text);

export const isStorableOptionArray = arrayTPFactory(isStorableOption);

export const isMaybeStorableOption = maybeTPFactory(isStorableOption);

export const isMaybeStorableOptionArray = maybeTPFactory(isStorableOptionArray);
