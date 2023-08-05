namespace UserType {
  export const USER = 'USER';
  export const ADMIN = 'ADMIN';
  export const OWNER = 'OWNER';

  export const asArray = [ADMIN, OWNER, USER];
  export type Type = (typeof asArray)[number];
}
export default UserType;
