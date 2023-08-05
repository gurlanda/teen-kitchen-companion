import PreferredLanguage from './PreferredLanguage';
import UserType from './UserType';

type StorableUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  type: UserType.Type;
  preferredLanguage: PreferredLanguage.Type;
};

export default StorableUser;
