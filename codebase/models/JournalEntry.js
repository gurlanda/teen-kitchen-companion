const mongoose = require('mongoose');
const ResponseSchema = require('./ResponseSchema');

const JournalEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [
      true,
      'Please include the ID of the user who is submitting this entry.',
    ],
  },
  journalId: {
    type: String,
    required: [
      true,
      'Please include the ID of the Journal this entry belongs to.',
    ],
  },
  submittedAt: Number,
  responses: {
    type: [ResponseSchema],
    required: [true, 'Please include the Responses for this JournalEntry.'],
  },
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
