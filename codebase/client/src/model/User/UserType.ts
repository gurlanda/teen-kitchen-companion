namespace UserType {
  export const ADMIN = 'ADMIN';
  export const DELIVERY_ANGEL = 'DELIVERY_ANGEL';
  export const TEEN_COOK = 'TEEN_COOK';
  export const CLIENT = 'CLIENT';

  export const asArray = [ADMIN, DELIVERY_ANGEL, TEEN_COOK, CLIENT] as const;
  export type asUnion = typeof asArray[number];
}

export default UserType;
