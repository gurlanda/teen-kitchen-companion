import PreferredLanguage from './PreferredLanguage';
import UserType from './UserType';

type StorableUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  type: UserType;
  preferredLanguage: PreferredLanguage;
};

export default StorableUser;
