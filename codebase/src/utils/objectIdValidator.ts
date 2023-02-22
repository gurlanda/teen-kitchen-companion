import { Types } from 'mongoose';

const isValidId = (id: string): boolean => {
  // Check if the ID given in the URL parameter represents a valid ObjectId
  if (!Types.ObjectId.isValid(id)) {
    return false;
  }

  // There are some cases for which ObjectId.isValid() returns true even
  // when the string passed into it is not a valid ObjectId. This covers
  // those cases
  const objId = new Types.ObjectId(id);
  if (id !== objId.toString()) {
    return false;
  }

  return true;
};
export default isValidId;
