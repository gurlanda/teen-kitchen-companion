const mongoose = require('mongoose');
const QuestionSchema = require('./QuestionSchema.js');
const DateSchema = require('./DateSchema.js');

const JournalSchema = new mongoose.Schema({
  weekStartDate: {
    type: DateSchema,
    required: true,
  },
  weekEndDate: {
    type: DateSchema,
    required: true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
  },
});

module.exports = mongoose.model('Journal', JournalSchema);
