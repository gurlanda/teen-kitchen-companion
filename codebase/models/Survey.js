const mongoose = require('mongoose');
const { userTypes } = require('./userTypes.js');
const QuestionSchema = require('./QuestionSchema.js');

// deactivatedAt is a UTC timestamp
const SurveySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    deactivatedAt: Number,
    questions: {
      type: [QuestionSchema],
      required: [true, 'Please submit at least one Question.'],
    },
    audience: {
      type: [String],
      required: [
        true,
        'Please submit an array of UserTypes to indicate the audience of the survey.',
      ],
      validate: {
        validator: (val) => {
          if (!(val instanceof Array)) {
            return false;
          }

          for (const elem of val) {
            if (!userTypes.includes(elem)) {
              return false;
            }
          }

          return true;
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Survey', SurveySchema);
