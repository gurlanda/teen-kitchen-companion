const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const ErrorResponse = require('../utils/errorResponse');
const ErrorMessages = require('../utils/ErrorMessages');
const { ADMIN } = require('../models/userTypes');
const Survey = require('../models/Survey.js');
const User = require('../models/User.js');

const router = express.Router();

// @route   GET /api/v1/surveys[?id]
// @desc    Get one or more surveys
// @access  Private
router.get('/', auth, async (req, res, next) => {
  // If there's a query string, then this request should be for a single survey
  const numQueryParams = Object.keys(req.query).length;
  if (numQueryParams !== 0) {
    const surveyId = req.query.id;
    // console.log(`req.query:`);
    // console.log(req);
    if (surveyId) {
      console.log('GET /surveys?id: Looking for survey...');
      const survey = await Survey.findById(surveyId);
      if (!survey) {
        return next(
          new ErrorResponse(`Survey not found with ID ${surveyId}`, 404)
        );
      }

      // We want the user to have access only when they're a part of the
      // survey's audience or if they're an admin user
      console.log('GET /surveys?id: Survey found. Validating the user...');
      const { userType } = req.session;
      if (!survey.audience.includes(userType) && !userType === ADMIN) {
        return res
          .status(401)
          .json({ error: ErrorMessages.INVALID_CREDENTIALS });
      }

      console.log(
        'GET /surveys?id: Validation succeeded, serving the survey to user.'
      );
      return res.status(200).json({ sucess: true, data: survey });
    } else {
      return next(new ErrorResponse('Invalid query string', 400));
    }
  }

  // If there's no query string, then this request should be for a collection of Surveys
  console.log('GET /surveys: Retrieving surveys...');
  const surveys = await Survey.find();

  const { userType } = req.session;
  if (userType === ADMIN) {
    return res.status(200).json({
      success: true,
      count: surveys.length,
      data: surveys,
    });
  }

  const accessibleSurveys = surveys.filter((survey) => {
    let isActive = false;
    if (survey?.deactivatedAt === null || survey?.deactivatedAt === undefined) {
      isActive = true;
    }

    const isForUser = survey.audience.includes(userType);

    return isActive && isForUser;
  });

  console.log('GET /surveys: Surveys retrieved. Serving to user.');
  res.status(200).json({
    success: true,
    count: accessibleSurveys.length,
    data: accessibleSurveys,
  });
});

// @route   POST /api/v1/surveys
// @desc    Create a new survey
// @access  Admin
router.post('/', isAdmin, async (req, res, next) => {
  const blankSurvey = {
    title: 'Untitled survey',
    description: '',
    audience: [],
    questions: [
      {
        type: 'MULT_CHOICE',
        isRequired: false,
        questionText: 'Question text',
        additionalData: {
          options: [
            {
              id: createId(6),
              value: 'Option 1',
            },
          ],
        },
      },
    ],
  };

  const survey = await Survey.create(blankSurvey);

  // prettier-ignore
  res
    .status(201)
    .json({
      success: true,
      data: survey
    });
});

// @route   PUT /api/v1/surveys?id
// @desc    Update survey
// @access  Admin
router.put('/', isAdmin, async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorResponse('Invalid query string', 400));
  }

  const surveyId = req.query.id;

  const survey = await Survey.findByIdAndUpdate(surveyId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!survey) {
    return next(new ErrorResponse(`Survey not found with ID ${surveyId}`, 404));
  }

  res.status(200).json({
    success: true,
    data: survey,
  });
});

// @route   DELETE /api/v1/surveys?id
// @desc    Delete survey
// @access  Admin
router.delete('/', isAdmin, async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorResponse('Invalid query string', 400));
  }

  const surveyId = req.query.id;
  const survey = await Survey.findByIdAndDelete(surveyId);
  if (!survey) {
    return next(new ErrorResponse(`Survey not found with ID ${surveyId}`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});

// @route   POST /api/v1/surveys/submit[?id]
// @desc    Submit one or more submissions submissions
// @access  Private
router.post('/submit', auth, async (req, res, next) => {
  // If there's a query string, then this request should be for a single submission
  const numQueryParams = Object.keys(req.query).length;
  if (numQueryParams !== 0) {
    const surveyId = req.query.id;
    if (surveyId) {
      // Verify that a survey with the given ID exists
      // We retrieve the survey instead of just looking for it because we need its data later
      const survey = await Survey.findById(surveyId);
      if (!survey) {
        return next(
          new ErrorResponse(`Survey not found with ID ${surveyId}`, 404)
        );
      }

      // The ID given in the Submission must match the ID in the query string
      const dataSurveyId = req.body.surveyId;
      if (surveyId !== dataSurveyId) {
        return next(
          new ErrorResponse(
            `surveyID in Submission must match ID given in query`,
            400
          )
        );
      }

      // Check that the user is actually in the intended audience of the survey
      const submissionData = req.body;
      const userType = submissionData.userType;
      if (!userType) {
        return next(
          new ErrorResponse(
            'Submissions must include the userType of the submitter',
            400
          )
        );
      }

      if (!survey.audience.includes(userType)) {
        return next(
          new ErrorResponse(
            'The submitter was not in the intended audience for this survey'
          )
        );
      }

      // Check if the survey response was submitted on time
      if (
        survey.deactivatedAt === null ||
        survey.deactivatedAt > submissionData.submittedAt
      ) {
        const submission = await Submission.create(req.body);

        return res.status(201).json({ success: true, data: submission });
      } else {
        // If submission.submittedAt >= survey.deactivatedAt then reject
        console.log(
          'Rejected submission: Submission time is after Survey deactivation time.'
        );
        console.log(req.body);
        console.log(survey);

        return next(
          new ErrorResponse(
            'Error with Submission: Submission time is after Survey deactivation time',
            400
          )
        );
      }
    } else {
      // There was no id parameter in the query string
      return next(new ErrorResponse('Invalid query string', 400));
    }
  }

  // If there's no query string, then this request should be for a batch submission
  if (!(req.body instanceof Array)) {
    return next(new ErrorResponse('Body must be an array of Submissions', 400));
  }

  // Remove invalid Submissions that can't be caught by insertMany()
  // Specifically, we check that the user IDs and the survey IDs represent valid entities in the database
  const submissions = req.body.filter(async (sub) => {
    // A Submission must include a surveyId property
    if (!sub.surveyId) {
      return false;
    }

    // sub.surveyId must be a valid ObjectId string
    if (!isValidId(sub.surveyId)) {
      return false;
    }

    // A Survey must exist with ID sub.surveyId
    // We retrieve the survey instead of just looking for it because we need its data later
    const objId = new ObjectId(sub.surveyId);
    const survey = await Survey.findById(objId);
    if (!survey) {
      return false;
    }

    const userId = sub.userId;
    if (!userId) {
      return false;
    }

    const user = await User.findOne({ email: userId });
    if (!user) {
      return false;
    }

    if (!survey.audience.includes(user.type)) {
      return false;
    }

    return true;
  });

  if (submissions.length === 0) {
    return next(
      new ErrorResponse('All submissions have invalid surveyId and userId', 400)
    );
  }

  const validSubmissions = await Submission.insertMany(submissions, {
    ordered: false,
  });

  res.status(201).json({ success: true, data: validSubmissions });
});

module.exports = router;
