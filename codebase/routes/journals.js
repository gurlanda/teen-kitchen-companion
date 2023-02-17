const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const Journal = require('../models/Journal');
const JournalEntry = require('../models/JournalEntry');
const JournalTemplate = require('../models/JournalTemplate');
const ErrorResponse = require('../utils/errorResponse');
const createId = require('../utils/createId');
const matchesUser = require('../middleware/matchesUser');

const router = express.Router();

// @route   GET /api/v1/journals[?journalid]
// @desc    Get a single journal or a collection of journals
// @access  Private
router.get('/', async (req, res, next) => {
  // If there's a query string, then this request should be for a single journal
  const numQueryParams = Object.keys(req.query).length;
  if (numQueryParams !== 0) {
    const journalId = req.query.journalid;
    if (journalId) {
      console.log('GET /journals?journalid: Looking for journal...');
      const journal = await Journal.findById(journalId);
      if (!journal) {
        return next(
          new ErrorResponse(`Journal not found with ID ${journalId}`, 404)
        );
      }

      console.log(
        'GET /journals?journalid: Journal found, serving the journal to user.'
      );
      return res.status(200).json({ success: true, data: journal });
    } else {
      return next(new ErrorResponse('Invalid query string', 400));
    }
  }

  // If there's no query string, then this request should be for a collection of Journals
  console.log('GET /journals: Retrieving journals...');
  const journals = await Journal.find();

  console.log(journals);
  console.log('GET /journals: Journals retrieved. Serving to user.');
  res.status(200).json({
    success: true,
    count: journals.length,
    data: journals,
  });
});

// @route   GET /api/v1/journals/entries?journalid||entryid
// @desc    Get a logged-in user's entry/entries for this journal
// @access  Private
router.get('/entries', auth, async (req, res, next) => {
  // There should only be one parameter
  const numQueryParams = Object.keys(req.query).length;
  if (numQueryParams === 1) {
    const journalId = req.query.journalid;
    const entryId = req.query.entryid;
    if (journalId) {
      const journal = await Journal.findById(journalId);
      if (!journal) {
        return next(
          new ErrorResponse(`Journal not found with ID ${journalId}`, 404)
        );
      }

      // Get all the user's entries for the journal
      const userId = req.session.userEmail;
      const entries = await JournalEntry.find({ journalId, userId });
      return res
        .status(200)
        .json({ success: true, count: entries.length, data: entries });
    } else if (entryId) {
      // Get single entry
      const entry = await JournalEntry.findById(entryId);
      if (!entry) {
        return next(
          new ErrorResponse(`Entry not found with ID ${entryId}`, 404)
        );
      }

      // Check if the logged-in user owns the found entry
      const userId = req.session.userEmail;
      if (!(entry.userId === userId)) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }

      return res.status(200).json({ success: true, data: entry });
    } else {
      // Error: Invalid query param
      return next(new ErrorResponse('Invalid query string', 400));
    }
  } else {
    // Invalid query
    return next(new ErrorResponse('Invalid query string', 400));
  }
});

// @route   PUT /api/v1/journals/entries?entryid
// @desc    Update an existing entry
// @access  Private
router.put('/entries', [auth, matchesUser], async (req, res, next) => {
  const numQueryParams = Object.keys(req.query).length;
  if (numQueryParams !== 0) {
    const entryId = req.query.entryid;
    if (entryId) {
      // console.log('PUT /journals/entry?entryid: Validating userId...');
      // const submittedEntry = req.body;
      // if (submittedEntry?.userId !== req.session.userEmail) {
      //   return next(
      //     new ErrorResponse(
      //       'userId in the given entry does not match the logged-in user',
      //       400
      //     )
      //   );
      // }

      console.log(
        'PUT /journals/entry?entryid: Verifying existence of entry...'
      );
      const journalEntry = await JournalEntry.findById(entryId);
      if (!journalEntry) {
        return next(
          new ErrorResponse(`JournalEntry not found with ID ${entryId}`, 404)
        );
      }

      // console.log(
      //   'PUT /journals/entry?entryid: JournalEntry found. Looking for journal entry...'
      // );
      // const entry = await JournalEntry.findOne({
      //   entryId,
      //   userId: req.session.userEmail,
      // });
      // let updatedEntry = null;
      // if (!entry) {
      //   console.log(
      //     'PUT /journals/entry?entryid: Entry not found. Creating new journal entry...'
      //   );
      //   updatedEntry = await JournalEntry.create(req.body);
      //   if (!updatedEntry) {
      //     return next(new ErrorResponse(`Entry could not be updated.`, 500));
      //   }
      // }
      console.log('PUT /journals/entry?entryid: Entry found. Updating...');
      updatedEntry = await JournalEntry.findByIdAndUpdate(
        journalEntry._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedEntry) {
        return next(new ErrorResponse(`Entry could not be updated.`, 500));
      }

      console.log(
        'PUT /journals/entry?entryid: Entry updated or created. Serving updated entry to user.'
      );
      return res.status(200).json({ success: true, data: updatedEntry });
    } else {
      return next(new ErrorResponse('Invalid query string', 400));
    }
  } else {
    return next(new ErrorResponse('Invalid query string', 400));
  }
});

// @route   POST /api/v1/journals/entries?journalid
// @desc    Create a new entry
// @access  Private
router.post('/entries', [auth, matchesUser], async (req, res, next) => {
  const numQueryParams = Object.keys(req.query).length;
  if (numQueryParams !== 0) {
    const journalId = req.query.journalid;
    if (journalId) {
      // Check if the journal exists
      console.log('POST /journals/entries?journalid: Looking for journal...');
      const journal = await Journal.findById(journalId);
      if (!journal) {
        return next(
          new ErrorResponse(`Journal not found with ID ${journalId}`, 404)
        );
      }

      console.log(
        'POST /journals/entries?journalid: Journal found, attempting to create new journal entry...'
      );

      newEntry = await JournalEntry.create(req.body);
      if (!newEntry) {
        return next(new ErrorResponse(`Entry could not be updated.`, 500));
      }

      return res.status(201).json({
        success: true,
        data: newEntry,
      });
    } else {
      return next(new ErrorResponse('Invalid query string', 400));
    }
  } else {
    return next(new ErrorResponse('Invalid query string', 400));
  }
});

// @route   POST /api/v1/journals
// @desc    Create a new journal
// @access  Admin
router.post('/', async (req, res, next) => {
  // Check that the request is well-formed
  console.log('POST /journals: Validating given dates...');
  const weekStartDate = req.body?.weekStartDate;
  const weekEndDate = req.body?.weekEndDate;

  if (!weekStartDate || !weekEndDate) {
    return next(
      new ErrorResponse('weekStartDate and weekEndDate must be given.', 400)
    );
  }

  const valiDate = (date) => {
    if (!date.year || !date.monthIndex || !date.date) {
      return false;
    }
    return true;
  };

  if (!valiDate(weekStartDate) || !valiDate(weekEndDate)) {
    return next(
      new ErrorResponse(
        'One of the given dates is missing a required field.',
        400
      )
    );
  }

  // Make sure the start date is before the end date
  if (!(weekStartDate.year <= weekEndDate.year)) {
    return next(
      new ErrorResponse('weekStartDate is not before weekEndDate', 400)
    );
  } else if (!(weekStartDate.monthIndex <= weekEndDate.monthIndex)) {
    return next(
      new ErrorResponse('weekStartDate is not before weekEndDate', 400)
    );
  }
  // else if (!(weekStartDate.date <= weekEndDate.date)) {
  //   return next(
  //     new ErrorResponse('weekStartDate is not before weekEndDate', 400)
  //   );
  // }

  console.log(
    'POST /journals: Dates validated. Attempting to create new Journal...'
  );
  const template = await JournalTemplate.findOne();
  const newJournal = await Journal.create({
    weekStartDate,
    weekEndDate,
    questions: template.questions,
  });

  if (!newJournal) {
    return next(new ErrorResponse('Ill-formed journal', 400));
  }

  console.log('POST /journals: Creation successful. Serving new Journal.');
  return res.status(201).json({
    success: true,
    data: newJournal,
  });
});

// @route   PUT /api/v1/journals/template
// @desc    Update the journal template
// @access  Admin
router.put('/template', async (req, res, next) => {
  // Retrieve the journal template
  let template = await JournalTemplate.findOne();
  if (!template) {
    // If there's no template, create it
    const blankTemplate = {
      questions: [
        {
          type: 'DATE',
          isRequired: true,
          questionHeader: 'DATE',
          questionText: 'Date of your meal/snack.',
          additionalData: null,
        },
        {
          type: 'TIME',
          isRequired: true,
          questionHeader: 'START TIME',
          questionText: 'When did you start your meal/snack?',
          additionalData: null,
        },
        {
          type: 'TIME',
          isRequired: true,
          questionHeader: 'END TIME',
          questionText: 'When did you finish your meal/snack?',
          additionalData: null,
        },
        {
          type: 'SHORT_ANSWER',
          isRequired: true,
          questionHeader: 'PLACE',
          questionText:
            'For example: kitchen, living room, bedroom, car, desk, at work',
          additionalData: null,
        },
        {
          type: 'SHORT_ANSWER',
          isRequired: true,
          questionHeader: 'WITH WHOM',
          questionText: 'For example: alone, with family/friends, collegues',
          additionalData: null,
        },
        {
          type: 'LINEAR_SCALE',
          isRequired: true,
          questionHeader: 'HUNGER',
          questionText: '',
          additionalData: {
            min: 0,
            max: 5,
            step: 1,
            minText: 'No hunger',
            maxText: 'Starving',
          },
        },
        {
          type: 'SHORT_ANSWER',
          isRequired: true,
          questionHeader: 'AMOUNT',
          questionText: '',
          additionalData: null,
        },
        {
          type: 'SHORT_ANSWER',
          isRequired: true,
          questionHeader: 'FOOD',
          questionText: '',
          additionalData: null,
        },
        {
          type: 'MULT_CHOICE',
          isRequired: true,
          questionHeader: 'FULLNESS',
          questionText: 'How do you feel after eating?',
          additionalData: {
            options: [
              {
                id: createId(6),
                value: '1: Still hungry',
              },
              {
                id: createId(6),
                value: '2: Quite satisfied',
              },
              {
                id: createId(6),
                value: '3: Uncomfortable',
              },
            ],
          },
        },
        {
          type: 'IMG_LINEAR_SCALE',
          isRequired: true,
          questionHeader: 'HAPPINESS',
          questionText: 'How do you feel?',
          additionalData: {
            minText: 'Unhappy',
            maxText: 'Happy',
            imgOptions: [
              {
                id: createId(6),
                value: 1,
                img: {
                  scale: 'HAPPINESS',
                  value: 1,
                },
              },
              {
                id: createId(6),
                value: 2,
                img: {
                  scale: 'HAPPINESS',
                  value: 2,
                },
              },
              {
                id: createId(6),
                value: 3,
                img: {
                  scale: 'HAPPINESS',
                  value: 3,
                },
              },
              {
                id: createId(6),
                value: 4,
                img: {
                  scale: 'HAPPINESS',
                  value: 4,
                },
              },
              {
                id: createId(6),
                value: 5,
                img: {
                  scale: 'HAPPINESS',
                  value: 5,
                },
              },
            ],
          },
        },
        {
          type: 'IMG_LINEAR_SCALE',
          isRequired: true,
          questionHeader: 'ENERGY',
          questionText: 'How do you feel?',
          additionalData: {
            minText: 'Calm',
            maxText: 'Excited',
            imgOptions: [
              {
                id: createId(6),
                value: 1,
                img: {
                  scale: 'ENERGY',
                  value: 1,
                },
              },
              {
                id: createId(6),
                value: 2,
                img: {
                  scale: 'ENERGY',
                  value: 2,
                },
              },
              {
                id: createId(6),
                value: 3,
                img: {
                  scale: 'ENERGY',
                  value: 3,
                },
              },
              {
                id: createId(6),
                value: 4,
                img: {
                  scale: 'ENERGY',
                  value: 4,
                },
              },
              {
                id: createId(6),
                value: 5,
                img: {
                  scale: 'ENERGY',
                  value: 5,
                },
              },
            ],
          },
        },
        {
          type: 'IMG_LINEAR_SCALE',
          isRequired: true,
          questionHeader: 'CONTROL',
          questionText: 'How do you feel?',
          additionalData: {
            minText: 'Controlled',
            maxText: 'In control',
            imgOptions: [
              {
                id: createId(6),
                value: 1,
                img: {
                  scale: 'CONTROL',
                  value: 1,
                },
              },
              {
                id: createId(6),
                value: 2,
                img: {
                  scale: 'CONTROL',
                  value: 2,
                },
              },
              {
                id: createId(6),
                value: 3,
                img: {
                  scale: 'CONTROL',
                  value: 3,
                },
              },
              {
                id: createId(6),
                value: 4,
                img: {
                  scale: 'CONTROL',
                  value: 4,
                },
              },
              {
                id: createId(6),
                value: 5,
                img: {
                  scale: 'CONTROL',
                  value: 5,
                },
              },
            ],
          },
        },
      ],
    };

    console.log(
      'PUT /journals/template: Creating and retrieving new Journal template.'
    );
    template = await JournalTemplate.create(blankTemplate);
  }

  // Get the ID of the template
  console.log(
    'PUT /journals/template: Template retrieved. Attempting to update template...'
  );
  const templateId = template._id;

  // findByIdAndUpdate and run validators

  const updatedTemplate = await JournalTemplate.findByIdAndUpdate(
    templateId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(
    'PUT /journals/template: Template updated. Serving updated template.'
  );
  return res.status(200).json({ success: true, data: updatedTemplate });
});

// @route   DELETE /api/v1/journals?journalid
// @desc    Delete a journal
// @access  Admin
router.delete('/', isAdmin, async (req, res, next) => {
  if (!req.query.journalid) {
    return next(new ErrorResponse('Invalid query string', 400));
  }

  console.log('DELETE /journals?journalid: Looking for Journal...');
  const journalId = req.query.journalid;
  const journal = await Journal.findByIdAndDelete(journalId);
  if (!journal) {
    return next(
      new ErrorResponse(`Journal not found with ID ${journalId}`, 404)
    );
  }

  console.log('DELETE /journals?journalid: Deletion successful.');
  res.status(200).json({ success: true, data: {} });
});

module.exports = router;
