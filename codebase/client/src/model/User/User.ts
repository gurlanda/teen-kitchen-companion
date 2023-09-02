import Clonable from '../Interfaces/Clonable';
import Identifiable from '../Interfaces/Identifiable';
import SupportedLanguage from '../Language/SupportedLanguage';
import StorableUser from './StorableUser';

export default class User implements Clonable<User>, Identifiable {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  preferredLanguage: SupportedLanguage.Type;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    preferredLanguage: SupportedLanguage.Type,
    id: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.preferredLanguage = preferredLanguage;
  }

  clone(): User {
    return new User(
      this.firstName,
      this.lastName,
      this.email,
      this.preferredLanguage,
      this.id
    );
  }

  toStorable(): StorableUser {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      preferredLanguage: this.preferredLanguage,
    };
  }

  static fromStorable(data: StorableUser, userId: string): User {
    return new User(
      data.firstName,
      data.lastName,
      data.email,
      data.preferredLanguage,
      userId
    );
  }
}
