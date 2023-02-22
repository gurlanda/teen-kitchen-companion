import UserType from '../User/UserType';

type StorableUser = {
  name: string;
  email: string;
  type: UserType.asUnion;
};
export default StorableUser;
