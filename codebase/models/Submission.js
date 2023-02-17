const mongoose = require('mongoose');
const { userTypes } = require('./userTypes.js');
const ResponseSchema = require('./ResponseSchema');

// Both startedAt and submittedAt are UTC timestamps
const SubmissionSchema = new mongoose.Schema({
  surveyId: {
    type: String,
    required: [true, 'Please include the ID of the Survey being responded to.'],
  },
  startedAt: Number,
  submittedAt: Number,
  userId: {
    type: String,
    required: [true, 'Please include the ID of the survey respondent.'],
  },
  userType: {
    type: String,
    required: [
      true,
      'userType not included: Please include the role of the user.',
    ],
    enum: userTypes,
  },
  responses: {
    type: [ResponseSchema],
    required: [true, 'Please include the Responses for this Submission.'],
  },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
