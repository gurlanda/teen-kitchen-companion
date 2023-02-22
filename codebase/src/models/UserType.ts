import { arrayTPFactory } from '../Storables/TypeguardUtil';

namespace UserType {
  export const ADMIN = 'ADMIN';
  export const DELIVERY_ANGEL = 'DELIVERY_ANGEL';
  export const TEEN_COOK = 'TEEN_COOK';
  export const CLIENT = 'CLIENT';

  export const asArray = [ADMIN, DELIVERY_ANGEL, TEEN_COOK, CLIENT] as const;
  export type asUnion = typeof asArray[number];
}

export default UserType;

export const isUserType = (arg: any): boolean => UserType.asArray.includes(arg);

export const isUserTypeArray = arrayTPFactory(isUserType);
