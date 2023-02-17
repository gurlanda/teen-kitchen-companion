import { ServerFacade } from './ServerFacade';
import localDb, { retrieveSubmissions } from './LocalStorage';
import * as Qtypes from '../survey/questionTypes';
import Option from '../survey/question/Option';
import CheckboxGridQuestion from '../survey/question/CheckboxGridQuestion';
import CheckboxQuestion from '../survey/question/CheckboxQuestion';
import MultChoiceQuestion from '../survey/question/MultChoiceQuestion';
import ShortAnswerQuestion from '../survey/question/ShortAnswerQuestion';
import LongAnswerQuestion from '../survey/question/LongAnswerQuestion';
import DateQuestion from '../survey/question/DateQuestion';
import MultChoiceGridQuestion from '../survey/question/MultChoiceGridQuestion';
import NumberQuestion from '../survey/question/NumberQuestion';
import { RowQuestion } from '../survey/question/GridQuestion';
import Survey from '../survey/Survey';
import Submission from '../survey/Submission';
import Response from '../survey/response/Response';
import Question from '../survey/question/Question';
import User from '../user/User';
import Journal from '../journal/Journal';
import DataError from './DataError';
import ImgOption from '../survey/question/ImgOption';
import DateTimeQuestion from '../survey/question/DateTimeQuestion';
import TimeQuestion from '../survey/question/TimeQuestion';
import LinearScaleQuestion from '../survey/question/LinearScaleQuestion';
import ImgLinearScaleQuestion from '../survey/question/ImgLinearScaleQuestion';
import JournalEntry from '../journal/JournalEntry';

// Helper function for determining if the input is a string
const isString = (arg) => {
  if (!arg) return false;
  if (typeof arg === 'string' || arg instanceof String) return true;
  else return false;
};

/* ------------------ Backend-to-Frontend data conversion ------------------ */
// Convert an array of image option data into ImgOption objects
const decodeImgOptions = (imgOptsData) => {
  // {id, value, img: {scale, value}}
  const imgOptions = imgOptsData.map((opt) => {
    const { id, value, img } = opt;
    return new ImgOption(img.value, img.scale, false, id);
  });

  return imgOptions;
};

// Refactor an array of Option fetched from the server into a form usable by the front-end
const decodeOptions = (options) => {
  let optsArray;
  if (!(options instanceof Array)) {
    optsArray = new Array(...options);
  } else {
    optsArray = options;
  }

  return optsArray.map((opt) => {
    // Throw an exception if the required data fields aren't found in the object
    if (!Object.hasOwn(opt, 'id') || !Object.hasOwn(opt, 'value')) {
      throw new DataError(
        'Passed-in option object does not have expected data fields'
      );
    }

    return new Option(opt.value, false, opt.id);
  });
};

const decodeRowQuestions = (rowQuestions) => {
  return rowQuestions.map((row) => {
    // Throw an exception if the required data fields aren't found in the object
    if (!Object.hasOwn(row, 'id') || !Object.hasOwn(row, 'questionText')) {
      throw new DataError(
        'Passed-in option object does not have expected data fields'
      );
    }

    return new RowQuestion(row.questionText, row.id);
  });
};

// Refactor a Question fetched from the server into a form usable by the front-end
const decodeQuestion = (questionData) => {
  const {
    type,
    isRequired,
    questionText,
    questionHeader,
    additionalData,
    _id,
  } = questionData;

  try {
    switch (type) {
      case Qtypes.SHORT_ANSWER:
        return new ShortAnswerQuestion(
          isRequired,
          questionText,
          questionHeader,
          _id
        );
      case Qtypes.MULT_CHOICE:
        return new MultChoiceQuestion(
          isRequired,
          questionText,
          decodeOptions(additionalData.options),
          questionHeader,
          _id
        );
      case Qtypes.LINEAR_SCALE:
        return new LinearScaleQuestion(
          isRequired,
          questionText,
          additionalData.min,
          additionalData.max,
          additionalData.step,
          additionalData.minText,
          additionalData.maxText,
          questionHeader,
          _id
        );
      case Qtypes.IMG_LINEAR_SCALE:
        return new ImgLinearScaleQuestion(
          isRequired,
          questionText,
          questionData.questionHeader,
          additionalData.minText,
          additionalData.maxText,
          decodeImgOptions(additionalData.imgOptions),
          questionHeader,
          _id
        );
      case Qtypes.DATE:
        return new DateQuestion(isRequired, questionText, questionHeader, _id);
      case Qtypes.TIME:
        return new TimeQuestion(isRequired, questionText, questionHeader, _id);
      case Qtypes.DATE_TIME:
        return new DateTimeQuestion(
          isRequired,
          questionText,
          questionHeader,
          _id
        );
      case Qtypes.CHECKBOX:
        return new CheckboxQuestion(
          isRequired,
          questionText,
          decodeOptions(additionalData.options),
          questionHeader,
          _id
        );
      case Qtypes.LONG_ANSWER:
        return new LongAnswerQuestion(
          isRequired,
          questionText,
          additionalData.numLines,
          questionHeader,
          _id
        );
      case Qtypes.CHECKBOX_GRID:
        return new CheckboxGridQuestion(
          isRequired,
          questionText,
          decodeRowQuestions(additionalData.rowQuestions),
          decodeOptions(additionalData.options),
          questionHeader,
          _id
        );
      case Qtypes.MULT_CHOICE_GRID:
        return new MultChoiceGridQuestion(
          isRequired,
          questionText,
          decodeRowQuestions(additionalData.rowQuestions),
          decodeOptions(additionalData.options),
          additionalData.isOneToOne,
          questionHeader,
          _id
        );
      case Qtypes.NUMBER:
        return new NumberQuestion(
          isRequired,
          questionText,
          additionalData.min,
          additionalData.max,
          additionalData.step,
          questionHeader,
          _id
        );
      default:
        throw new DataError(
          'Passed-in question data does not have a valid type'
        );
    }
  } catch (error) {
    console.log('Question decoding failed. Passed-in data:');
    console.log(questionData);
    console.log(error);
    return null;
  }
};

// Refactor a Survey fetched from the server into a form usable by the front-end; Returns null if there is some error
const decodeSurvey = (surveyData) => {
  try {
    const {
      _id,
      title,
      description,
      audience,
      deactivatedAt,
      updatedAt,
      questions,
      __v,
    } = surveyData;
    const surveyQuestions = questions.map((question) =>
      decodeQuestion(question)
    );

    return new Survey(
      title,
      description,
      audience,
      parseInt(deactivatedAt),
      parseInt(updatedAt),
      surveyQuestions,
      _id,
      __v
    );
  } catch (err) {
    if (err instanceof DataError) {
      console.error(err);
      return null;
    } else {
      throw err;
    }
  }
};

const decodeResponse = (resData) => {
  const { questionId, questionText, questionType, value } = resData;
  return new Response(questionType, questionText, questionId, value);
};

const decodeSubmission = (submData) => {
  const { surveyId, userId, submittedAt, responses, __v } = submData;

  // Parse the responses
  const parsedResp = responses.map((resp) => decodeResponse(resp));

  return new Submission(
    surveyId,
    userId,
    parseInt(submittedAt),
    parsedResp,
    __v
  );
};

// Packages response data into a User object
const decodeUser = (resData) => {
  const { name, email, type } = resData;
  return new User(name, email, type);
};

// Convert response data into a Journal object
const decodeJournal = (resData) => {
  try {
    console.log('ServerAdapter: Decoding a journal...');
    const weekStartData = resData.weekStartDate;
    const weekStart = new Date(
      weekStartData.year,
      weekStartData.monthIndex,
      weekStartData.date
    );
    const weekEndData = resData.weekEndDate;
    const weekEnd = new Date(
      weekEndData.year,
      weekEndData.monthIndex,
      weekEndData.date
    );

    const questions = resData.questions.map((ques) => decodeQuestion(ques));

    const journal = new Journal(weekStart, weekEnd, questions, resData._id);
    console.log('ServerAdapter: Decoding successful.');
    return journal;
  } catch (error) {
    console.log('ServerAdapter: Decoding failed. Passed-in data:');
    console.log(resData);
    console.log(error);
    return null;
  }
};

const decodeJournalEntry = (resData) => {
  try {
    return new JournalEntry(
      resData?._id,
      resData?.userId,
      resData?.journalId,
      resData?.submittedAt,
      resData?.responses?.map((res) => Response.fromData(res))
    );
  } catch (error) {
    return null;
  }
};

/* ------------------ Frontend-to-Backend data conversion ------------------ */
// Package Option data into an object that can be accepted by the back-end
const encodeOptions = (options) => {
  if (!(options instanceof Array)) {
    throw new TypeError(
      'In ServerAdapter.js> encodeOptions(): The given options argument is not an Array'
    );
  }

  return options.map((opt) => {
    if (!(opt instanceof Option)) {
      throw new TypeError(
        'In ServerAdapter.js > encodeOptions(): At least one element of the given options array is not of type Option'
      );
    }

    return {
      id: opt.id,
      value: opt.text,
    };
  });
};

// Package RowQuestion data into an object that can be accepted by the back-end
const encodeRowQuestions = (rows) => {
  if (!(rows instanceof Array)) {
    throw new TypeError(
      'In ServerAdapter > encodeOptions(): The given rows argument is not an Array'
    );
  }

  return rows.map((row) => {
    if (!(row instanceof RowQuestion)) {
      throw new TypeError(
        'In ServerAdapter > encodeOptions(): At least one element of the given rows array is not of type RowQuestion'
      );
    }

    return {
      id: row.id,
      questionText: row.text,
    };
  });
};

// Create the additionalData member for the server-formatted version of the Question object
// The given argument must be a Question object
const encodeQuestion = (question) => {
  if (!(question instanceof Question)) {
    throw new TypeError(
      'In ServerAdapter.js > encodeQuestion(): The given question argument is not of type Question'
    );
  }

  let encoded = {
    type: question.type,
    isRequired: question.isRequired,
    questionText: question.text,
  };

  switch (question.type) {
    case Qtypes.CHECKBOX:
    case Qtypes.MULT_CHOICE: {
      encoded = {
        ...encoded,
        additionalData: {
          options: encodeOptions(question.options),
        },
      };
      break;
    }
    case Qtypes.CHECKBOX_GRID:
    case Qtypes.MULT_CHOICE_GRID: {
      encoded = {
        ...encoded,
        additionalData: {
          rowQuestions: encodeRowQuestions(question.rowQuestions),
          options: encodeOptions(question.options),
        },
      };
      break;
    }
    case Qtypes.SHORT_ANSWER: {
      encoded = {
        ...encoded,
        additionalData: null,
      };
      break;
    }
    case Qtypes.LONG_ANSWER: {
      encoded = {
        ...encoded,
        additionalData: {
          numLines: question?.numLines ?? null,
        },
      };
      break;
    }
    case Qtypes.NUMBER: {
      encoded = {
        ...encoded,
        additionalData: {
          min: question?.min ?? null,
          max: question?.max ?? null,
          step: question?.step ?? null,
        },
      };
      break;
    }
    default:
      throw new TypeError(
        'In ServerAdapter.js > encodeQuestion(): The given question argument has an unsupported Question type'
      );
  }

  return encoded;
};

// Package Survey data into an object that can be accepted by the back-end
// The given argument must be a Survey object
const encodeSurvey = (survey) => {
  try {
    if (!(survey instanceof Survey)) {
      throw new TypeError(
        'In ServerAdapter.js > encodeSurvey(): The given survey argument is not of type Survey'
      );
    }

    return {
      title: survey.title,
      description: survey.description,
      audience: survey.audience,
      deactivatedAt: survey.deactivatedAt?.getTime() ?? null,
      questions: survey.questions.map((ques) => encodeQuestion(ques)),
    };
  } catch (err) {
    if (err instanceof TypeError) {
      console.error(err);
      return null;
    } else {
      throw err;
    }
  }
};

// Package Submission data into an object that can be accepted by the back-end
// The given argument must be a Submission object
const encodeSubmission = (submission) => {
  try {
    if (!(submission instanceof Submission)) {
      throw new TypeError(
        'In ServerAdapter.js > encodeSubmission(): The given submission argument is not of type Submission'
      );
    }

    return {
      surveyId: submission.surveyId,
      userId: submission.user.userId,
      userType: submission.user.userType,
      responses: submission.responses.map((res) => res.toStorable()),
      submittedAt: submission.submittedOn.getTime(),
    };
  } catch (err) {
    if (err instanceof TypeError) {
      console.error(err);
      return null;
    } else {
      throw err;
    }
  }
};

export default class ServerAdapter {
  /* ------------------ Survey operations ------------------ */
  // Fetch all available surveys from the server in a form that is usable by the front-end
  static fetchAllSurveys = async () => {
    try {
      console.log('ServerAdapter: Attempting to batch fetch surveys...');
      const surveys = await ServerFacade.getAllSurveys();
      if (!surveys) {
        console.log('ServerAdapter: Batch fetching of surveys unsuccessful.');
        return null;
      }

      const decoded = surveys.map((survey) => decodeSurvey(survey));
      console.log(
        'ServerAdapter: Batch fetching & decoding of surveys successful. Decoded surveys:'
      );
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.log(
        'ServerAdapter: Batch fetching & decoding of surveys unsuccessful.'
      );
      console.error(err);
      return null;
    }
  };

  // Fetch the latest version of a particular survey in a form that is usable by the front-end
  static fetchSurvey = async (surveyId) => {
    try {
      console.log('ServerAdapter: Attempting to retrieve a survey...');
      const survey = await ServerFacade.getSurvey(surveyId);
      if (!survey) {
        console.log(
          'ServerAdapter: Fetching & decoding of a survey unsuccessful.'
        );
        return null;
      }

      const decoded = decodeSurvey(survey);
      console.log(
        'ServerAdapter: Fetching & decoding of a survey successful. Decoded survey:'
      );
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.log(
        'ServerAdapter: Fetching & decoding of a survey unsuccessful.'
      );
      console.error(err);
      return null;
    }
  };

  /* ------------------ Admin survey operations ------------------ */
  // Create a new Survey
  static createSurvey = async () => {
    try {
      const blankSurveyData = await ServerFacade.createSurvey();
      const newSurvey = decodeSurvey(blankSurveyData);
      console.log(
        'ServerAdapter: Survey creation & decoding successful. New survey data: '
      );
      console.log(newSurvey);
      return newSurvey;
    } catch (err) {
      console.log('ServerAdapter: Survey creation or decoding unsuccessful');
      console.error(err);
    }
  };

  // Update an existing survey
  // The given survey data must be given in a Survey object
  static updateSurvey = async (survey) => {
    try {
      if (!(survey instanceof Survey)) {
        throw new TypeError(
          'In ServerAdapter.updateSurvey(): The given argument is not of type Survey.'
        );
      }

      const outgoingData = encodeSurvey(survey);
      const updatedSurvey = await ServerFacade.updateSurvey(
        outgoingData,
        survey.id
      );
      const decoded = decodeSurvey(updatedSurvey);
      console.log(
        'ServerAdapter: Survey update & decoding successful. New survey data: '
      );
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.log('ServerAdapter: Survey update or decoding unsuccessful.');
      console.error(err);
      return null;
    }
  };

  // Delete a survey
  static deleteSurvey = async (surveyId) => {
    try {
      await ServerFacade.deleteSurvey(surveyId);
      console.log('ServerAdapter: Survey deletion successful');
    } catch (err) {
      console.log('ServerAdapter: Survey deletion unsuccessful');
      console.error(err);
    }
  };

  /* ------------------ Submission operations ------------------ */

  // Get all submissions from a particular survey
  static getSubmissions = async (surveyId) => {
    try {
      const submissions = await ServerFacade.getSubmissions(surveyId);
      const decoded = submissions.map((sub) => decodeSubmission(sub));
      return decoded;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Post a survey submission
  // The given submission data must be in the form of a Submission object
  static postSubmission = async (submission) => {
    try {
      if (!(submission instanceof Submission)) {
        throw new TypeError(
          'In ServerAdapter.postSubmission(): The given argument is not of type Submission.'
        );
      }

      await ServerFacade.postSubmission(
        encodeSubmission(submission),
        submission.surveyId
      );

      console.log('ServerAdapter: Survey submission successful');
    } catch (err) {
      console.log('ServerAdapter: Survey submission unsuccessful');
      console.error(err);
    }
  };

  // Post all currently-stored survey submissions
  static postStoredSubmissions = async () => {
    // Get all submissions
    const submissions = await retrieveSubmissions();
    if (submissions.length === 0) {
      return;
    }

    // Encode the submissions
    const encoded = submissions.map((sub) => encodeSubmission(sub));

    // Submit them
    try {
      await ServerFacade.postSubmissions(encoded);

      // If successful, delete the submissions from local storage
      await localDb.submissions.clear();
      console.log('ServerAdapter: Posting of stored submissions successful');
    } catch (err) {
      console.log('ServerAdapter: Posting of stored submissions unsuccessful');
      console.error(err);
    }
  };

  /* ----------- User authentication and data fetching ----------- */
  // Registers a new user
  // Accepts a User object
  // Returns array of error messages, which is empty if the registration is successful
  static registerUser = async (user, password) => {
    if (!(user instanceof User)) {
      throw new TypeError(
        "In ServerAdapter.registerUser(): The given argument to parameter 'user' is not of type User."
      );
    }

    if (!(password instanceof String || typeof password === 'string')) {
      throw new TypeError(
        "In ServerAdapter.registerUser(): The given argument to parameter 'password' is not of type String."
      );
    }

    const errors = await ServerFacade.registerUser(
      user.name,
      user.email,
      user.type,
      password
    );
    console.log(
      'ServerAdapter: Finished attempting to register a new user. Error messages:'
    );
    console.log(errors);
    return errors;
  };

  // Log in a user
  // Returns array of error messages, which is empty if the registration is successful
  static login = async (email, password) => {
    if (!isString(password)) {
      throw new TypeError(
        'In ServerAdapter.login(): The argument passed into the parameter password is not a string.'
      );
    }
    if (!isString(email)) {
      throw new TypeError(
        'In ServerAdapter.login(): The argument passed into the parameter email is not a string.'
      );
    }

    // Send request
    const errors = await ServerFacade.login(email, password);
    console.log(
      'ServerAdapter: Finished attempting to login a new user. Error messages:'
    );
    console.log(errors);
    return errors;
  };

  // Returns a User object containing the data of a logged-in user
  // If authentication fails, returns null
  static getUserData = async () => {
    // Send the request
    const data = await ServerFacade.getUserInfo();
    if (!data) {
      console.log('ServerAdapter: Fetching user data failed.');
      return null;
    }
    const decoded = decodeUser(data);
    console.log('ServerAdapter: Fetching user data successful.');
    return decoded;
  };

  // Logs out a user
  // Returns true if successful, false if not
  static logout = async () => {
    const success = await ServerFacade.logout();
    return success;
  };

  /* ----------------- Journal operations ----------------- */
  // Fetch all available journals from the server
  static fetchAllJournals = async () => {
    try {
      console.log('ServerAdapter: Attempting to batch fetch journals...');
      const rawData = await ServerFacade.getAllJournals();
      if (!rawData) {
        console.log('ServerAdapter: Batch fetch failed.');
        return null;
      }

      console.log(
        'ServerAdapter: Batch fetch succeeded. Attempting to decode...'
      );
      const decoded = rawData.map((journalData) => decodeJournal(journalData));
      console.log('ServerAdapter: Finished decoding.');
      return decoded;
    } catch (error) {
      console.log('ServerAdapter.fetchAllJournals(): Something went wrong.');
      return null;
    }
  };

  // Fetch the latest version of a particular journal
  static fetchJournal = async (journalId) => {
    const journalData = await ServerFacade.getJournal(journalId);
    const decoded = decodeJournal(journalData);
    if (!decoded) {
      return null;
    }

    return decoded;
  };

  // Create a new journal and get its data
  // The arguments are of type Date
  static createJournal = async (weekStartDate, weekEndDate) => {};

  // FIX ALL BELOW
  // Update the journal template
  // The argument must be a ?
  static updateJournalTemplate = async (templateQuestions) => {};

  // Delete a journal
  static deleteJournal = async (journalId) => {};

  // Get a single journal entry
  static getJournalEntry = async (entryId) => {};

  // Get all journal entries associated with a journal
  static getJournalEntries = async (journalId) => {};

  // Post a new journal entry
  static postJournalEntry = async (entry, journalId) => {};

  // Post multiple new journal entries
  // entries must be an array of JournalEntries
  static postJournalEntries = async (entries, journalId) => {};

  // Update an existing entry
  static updateJournalEntry = async (entry) => {};

  // Update multiple existing entries
  static updateJournalEntries = async (entries, journalId) => {};
}
