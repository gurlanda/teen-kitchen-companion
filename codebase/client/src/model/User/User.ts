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
  type: UserType.Type;
  preferredLanguage: PreferredLanguage.Type;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    userType: UserType.Type,
    preferredLanguage: PreferredLanguage.Type,
    id: string
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
      this.type,
      this.preferredLanguage,
      this.id
    );
  }

  toStorable(): StorableUser {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      type: this.type,
      preferredLanguage: this.preferredLanguage,
    };
  }

  static fromStorable(data: StorableUser, userId: string): User {
    return new User(
      data.firstName,
      data.lastName,
      data.email,
      data.type,
      data.preferredLanguage,
      userId
    );
  }
}
