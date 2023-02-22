import { FilterQuery, Types } from 'mongoose';
import User, { UserDocument } from '../models/User';
import UserTypes from '../models/UserType';

const runValidators = { runValidators: true };
namespace Users {
  export const exists = async (userEmail: string) => {
    const found = await User.exists({ email: userEmail });
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  export const deleteUser = async (userEmail: string) => {
    return await User.deleteOne({ email: userEmail });
  };

  export const create = async (newUser: {
    name: string;
    email: string;
    type: UserTypes.asUnion;
    password: string;
  }) => {
    const user = await User.create(newUser);
    return user?.toStorable() ?? null;
  };

  export const validatePassword = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return null;
    }

    return user.toStorable();
  };

  export const findByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user?.toStorable() ?? null;
  };

  export const findUser = async (query: FilterQuery<UserDocument>) => {
    const user = await User.findOne(query);
    if (!user) {
      return false;
    }

    return user.toStorable();
  };
}

export default Users;
