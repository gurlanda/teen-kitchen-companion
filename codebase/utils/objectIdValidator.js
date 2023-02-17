const mongoose = require('mongoose');
const Survey = require('../models/Survey');
const { ObjectId } = mongoose.Types;

exports.isValidId = (id) => {
  // Check if the ID given in the URL parameter represents a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return false;
  }

  // There are some cases for which ObjectId.isValid() returns true even
  // when the string passed into it is not a valid ObjectId. This covers
  // those cases
  const objId = new ObjectId(id);
  if (id !== objId.toString()) {
    return false;
  }

  return true;
};
