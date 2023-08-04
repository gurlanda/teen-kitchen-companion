import { createContext } from 'react';

export type SupportedLanguage = 'english' | 'spanish';
type StorableUser = {
  firstName: string;
  lastName: string;
  preferredLanguage: SupportedLanguage;
};

export class User {
  private _firstName: string;
  private _lastName: string;
  private _preferredLanguage: SupportedLanguage;

  constructor(
    firstName: string,
    lastName: string,
    preferredLanguage: SupportedLanguage
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._preferredLanguage = preferredLanguage;
  }

  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  get preferredLanguage(): SupportedLanguage {
    return this._preferredLanguage;
  }

  clone(): User {
    return new User(this._firstName, this._lastName, this._preferredLanguage);
  }

  static isValidStorable(maybeStorable: any): maybeStorable is StorableUser {
    return (
      (maybeStorable as StorableUser).preferredLanguage !== undefined &&
      (maybeStorable as StorableUser).firstName !== undefined &&
      (maybeStorable as StorableUser).lastName !== undefined
    );
  }

  toStorable(): StorableUser {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      preferredLanguage: this._preferredLanguage,
    };
  }

  static fromStorable(storableUser: StorableUser): User | null {
    if (!User.isValidStorable(storableUser)) {
      return null;
    }

    return new User(
      storableUser.firstName,
      storableUser.lastName,
      storableUser.preferredLanguage
    );
  }
}

export interface AuthContextInterface {
  isSignedIn: boolean;
  user: User | undefined;
}

const AuthContext = createContext<AuthContextInterface | null>(null);
export default AuthContext;
