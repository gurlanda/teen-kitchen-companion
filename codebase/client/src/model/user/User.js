import * as UserTypes from './userTypes';

const isString = (arg) => {
  if (!arg) return false;
  else if (typeof arg === 'string' || arg instanceof String) return true;
  else return false;
};

export default class User {
  constructor(name, email, userType) {
    if (!isString(name)) {
      throw new TypeError(
        "In constructor User(): The argument passed into the parameter 'name' is not a string."
      );
    }
    if (!isString(email)) {
      throw new TypeError(
        "In constructor User(): The argument passed into the parameter 'email' is not a string."
      );
    }

    if (!UserTypes.asArray.includes(userType)) {
      throw new TypeError(
        "In constructor User(): The argument passed into the parameter 'userType' is not a valid UserType."
      );
    }

    this.email = email;
    this.name = name;
    this.type = userType;
  }

  clone() {
    return new User(this.name, this.email, this.type);
  }

  toStorable() {
    return {
      name: this.name,
      email: this.email,
      type: this.type,
    };
  }
}
