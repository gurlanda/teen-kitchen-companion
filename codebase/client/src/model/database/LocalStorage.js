import Dexie from 'dexie';
import ServerAdapter from './ServerAdapter';

import Response from '../survey/response/Response';
import Submission from '../survey/Submission';
import Survey from '../survey/Survey';
import User from '../user/User';

const db = new Dexie('TeenKitchenCompanion');

// Set up schema
db.version(1).stores({
  /**
    surveys:
    - id [string]: Unique identifier for the object.
    - version [integer]: The version of this survey.
    - questions [array:Question]: The array of Question objects included in this survey.

    submissions:
    - surveyId [string]: The ID of the survey being responded to.
    - version [integer]: The version of the survey that this response is for.
    - submittedOn [timestamp]: The date & time that this response was submitted.
    - userId [string]: Identifier of the user taking the survey.
    - responses [array:Response]: The array of Response objects included in this submission.
   */
  surveys: 'id, version, title, description, questions',
  submissions: '++id, surveyId, surveyVersion, submittedOn, userId, responses',
  journals: 'id, weekStart, weekEnd, questions',
  journalEntries: 'id, userId, journalId, submittedAt, responses',
});

// Attempt to fill the database on creation
// We don't use on('populate') because we will be
//  performing asynchronous operations,
//  which would cause problems within on('populate')
//  (See Dexie documentation for more info)
// db.on('ready', () => {
//   let activeSurveys;

//   // We want to return a Promise so that the initialization of local storage happens before we use it
//   // ServerAdapter.fetchAllSurveys() is async, so it implicitly returns a Promise
//   return ServerAdapter.fetchAllSurveys()
//     .then((fetchedSurveys) => {
//       if (fetchedSurveys === null) {
//         return;
//       }

//       activeSurveys = fetchedSurveys;
//       return deleteAllSurveys();
//     })
//     .then(() => {
//       return bulkPutSurveys(activeSurveys);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

/* ------------------ Submission operations ------------------ */

export const retrieveSubmissions = async () => {
  const allSubs = await db.submissions.toArray();

  // Store raw data into Submission objects
  const submissions = allSubs.map(
    ({ responses, submittedOn, surveyId, surveyVersion, user }) => {
      // Store response data into Response objects
      const allRes = responses.map((res) => {
        return new Response(
          res.questionType,
          res.questionText,
          res.questionId,
          res.value,
          res.id
        );
      });

      const userObj = new User(user.name, user.email, user.type);

      // Create Submission object
      return new Submission(
        surveyId,
        userObj,
        parseInt(submittedOn),
        allRes,
        surveyVersion
      );
    }
  );

  return submissions;
};

// The given argument must be a Submission object
export const storeSubmission = async (submission) => {
  try {
    if (!(submission instanceof Submission)) {
      throw new TypeError(
        'In LocalStorage.js > storeSubmission(): The given argument is not a Submission object.'
      );
    }

    const storable = submission.toStorable();
    await db.submissions.add(storable);
  } catch (err) {
    console.error(err);
  }
};

/* ------------------ Survey operations ------------------ */

// If online, deletes the stored Surveys and replaces them with the fresh surveys
// If offline, no changes are made
export const refreshSurveys = async () => {
  const activeSurveys = await ServerAdapter.fetchAllSurveys();

  // Do nothing if offline or there's an error
  if (activeSurveys === null) {
    return;
  }

  await deleteAllSurveys();
  await bulkPutSurveys(activeSurveys);
};

// Retrieve survey from local storage as a Survey object
export const retrieveSurvey = async (surveyId) => {
  try {
    const surveyData = await db.surveys.where({ id: surveyId }).first();
    return Survey.fromData(surveyData);
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Update the given Survey data in local storage
// The given argument must be a Survey object
export const updateSurvey = async (survey) => {
  if (!(survey instanceof Survey)) {
    throw new TypeError(
      'In LocalStorage > updateSurvey(): The given argument is not of type Survey.'
    );
  }

  const storable = survey.toStorable();

  try {
    await db.surveys.update(survey.id, storable);
  } catch (err) {
    console.error(err);
  }
};

// Accepts array of Surveys, stores them in Local Storage
// The given argument must be an array of Survey objects
export const bulkPutSurveys = async (surveys) => {
  if (!(surveys instanceof Array)) {
    throw new TypeError(
      'In LocalStorage > bulkPutSurveys(): The given argument is not an array.'
    );
  }

  for (const elem of surveys) {
    if (!(elem instanceof Survey)) {
      throw new TypeError(
        'In LocalStorage > bulkPutSurveys(): At least one element in the given array is not of type Survey.'
      );
    }
  }

  try {
    await db.surveys.bulkPut(surveys.map((surv) => surv.toStorable()));
  } catch (err) {
    console.error(err);
  }
};

// Delete all currently-stored surveys
export const deleteAllSurveys = async () => {
  await db.surveys.clear();
};

export default db;
