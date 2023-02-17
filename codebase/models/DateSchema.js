const mongoose = require('mongoose');

const DateSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  // Remember that for JS Dates, months are zero-indexed
  monthIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
  },
  date: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
});

mongoose.exports = DateSchema;
