import Clonable from '../Interfaces/Clonable';
import Identifiable from '../Interfaces/Identifiable';
import PreferredLanguage from './PreferredLanguage';
import StorableUser from './StorableUser';
import UserType from './UserType';

export default class User implements Clonable<User>, Identifiable {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  type: UserType;
  preferredLanguage: PreferredLanguage;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    userType: UserType,
    preferredLanguage: PreferredLanguage
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = userType;
    this.id = id;
    this.preferredLanguage = preferredLanguage;
  }

  clone(): User {
    return new User(
      this.firstName,
      this.lastName,
      this.email,
      this.id,
      this.type,
      this.preferredLanguage
    );
  }

  toStorable(): StorableUser {
    return {
      ...this,
    };
  }

  static fromStorable(data: StorableUser): User {
    return new User(
      data.firstName,
      data.lastName,
      data.email,
      data.id,
      data.type,
      data.preferredLanguage
    );
  }
}
