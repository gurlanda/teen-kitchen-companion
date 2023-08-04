import UserType from './UserType';

type StorableUser = {
  name: string;
  email: string;
  type: UserType.asUnion;
};
export default StorableUser;
