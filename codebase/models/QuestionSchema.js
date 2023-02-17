const mongoose = require('mongoose');
const { questionTypes } = require('./questionTypes.js');

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: questionTypes,
    required: [true, 'Please assign a type for all Questions.'],
  },
  isRequired: {
    type: Boolean,
    required: [
      true,
      'For all Questions, please indicate whether they are required.',
    ],
  },
  questionHeader: String,
  questionText: String,
  additionalData: mongoose.Mixed,
});

module.exports = QuestionSchema;
