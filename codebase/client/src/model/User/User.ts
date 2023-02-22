import Clonable from '../Interfaces/Clonable';
import Identifiable from '../Interfaces/Identifiable';
import StorableUser from '../Storables/StorableUser';
import UserType from './UserType';

export default class User implements Clonable<User>, Identifiable {
  name: string;
  email: string;
  type: UserType.asUnion;
  get id(): string {
    return this.email;
  }

  constructor(name: string, email: string, userType: UserType.asUnion) {
    this.email = email;
    this.name = name;
    this.type = userType;

    // if (typeof userType === 'string') {
    //   this.type = stringToUserType(userType);
    // } else {
    //   this.type = userType;
    // }
  }

  clone(): User {
    return new User(this.name, this.email, this.type);
  }

  toStorable(): StorableUser {
    return {
      name: this.name,
      email: this.email,
      type: this.type,
    };
  }

  static fromStorable(data: StorableUser): User {
    return new User(data.name, data.email, data.type);
  }
}
