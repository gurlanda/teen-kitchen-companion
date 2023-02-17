const mongoose = require('mongoose');
const { questionTypes } = require('./questionTypes.js');

const ResponseSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: [true, 'Please assign Question IDs to all Responses.'],
  },
  questionText: {
    type: String,
    required: [
      true,
      'Please include the texts of the Questions associated with each Response.',
    ],
  },
  questionType: {
    type: String,
    enum: questionTypes,
    required: [
      true,
      'Please include the types of the Questions associated with each Response.',
    ],
  },
  value: mongoose.Mixed,
});

module.exports = ResponseSchema;
