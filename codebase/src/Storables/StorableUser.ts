import UserTypes, { isUserType } from '../models/UserType';
import { isString } from './TypeguardUtil';

type StorableUser = {
  name: string;
  email: string;
  type: UserTypes.asUnion;
};
export default StorableUser;

export const isStorableUser = (arg: any): arg is StorableUser =>
  isString(arg.name) && isString(arg.email) && isUserType(arg.type);
