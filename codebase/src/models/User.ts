import mongoose from 'mongoose';
import StorableUser from '../Storables/StorableUser';
import UserType from './UserType';
import bcrypt from 'bcrypt';
import { load } from 'ts-dotenv';

const env = load({
  SALT_WORK_FACTOR: Number,
  // ACCESS_TOKEN_TTL: Number,
  // REFRESH_TOKEN_TTL: Number,
});

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  type: UserType.asUnion;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  toStorable(): StorableUser;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: UserType.asArray,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(env.SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

userSchema.methods.toStorable = function (): StorableUser {
  const user = this as UserDocument;
  return {
    name: user.name,
    email: user.email,
    type: user.type,
  };
};

const User = mongoose.model<UserDocument>('user', userSchema);
export default User;
