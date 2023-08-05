const USER = 'USER';
const ADMIN = 'ADMIN';
const OWNER = 'OWNER';

const userTypesArray = [ADMIN, OWNER, USER];

export type UserType = (typeof userTypesArray)[number];
export default UserType;
