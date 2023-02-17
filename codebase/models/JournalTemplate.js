const mongoose = require('mongoose');
const QuestionSchema = require('./QuestionSchema.js');
const DateSchema = require('./DateSchema.js');

const JournalTemplateSchema = new mongoose.Schema({
  questions: {
    type: [QuestionSchema],
    required: true,
  },
});

module.exports = mongoose.model('JournalTemplate', JournalTemplateSchema);
