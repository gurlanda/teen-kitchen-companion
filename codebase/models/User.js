const mongoose = require('mongoose');
const { userTypes } = require('./userTypes');

const UserSchema = mongoose.Schema({
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
  date: {
    type: Number,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: userTypes,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
