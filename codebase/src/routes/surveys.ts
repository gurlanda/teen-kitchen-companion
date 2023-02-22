import express from 'express';
import Surveys from '../services/SurveyService';
import StorableSurvey, { isStorableSurvey } from '../Storables/StorableSurvey';
import { TypedRequest, TypedResponse } from '../utils/TypedExpress';
import QuestionType from '../models/QuestionType';
import UserTypes from '../models/UserType';
import * as ErrorMessages from '../utils/ErrorMessages';
import { Types } from 'mongoose';
import StorableSubmission, {
  isStorableSubmissionArray,
} from '../Storables/StorableSubmission';
import Submissions from '../services/SubmissionService';
import Users from '../services/UserService';
import { resBodyAbstractFactory } from '../Storables/ResponseData';
import createLogger from '../utils/createLogger';
import Auth from '../middleware/auth';

const surveyRoutes = express.Router();

/**
 * @route   GET /api/v1/surveys[?surveyid]
 * @desc    Get one or more surveys
 * @access  Private
 * @param   {string} surveyid
 * @return  {ResponseData<StorableSurvey | StorableSurvey[]>}
 */
surveyRoutes.get(
  '/',
  Auth.authenticator,
  async (
    req: TypedRequest<{ surveyid: string }>,
    res: TypedResponse<StorableSurvey | StorableSurvey[]>
  ) => {
    type Payload = StorableSurvey | StorableSurvey[];
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'GET /surveys (Retrieve one or more surveys)'
    );

    try {
      // If there's a query string, then this request should be for a single survey
      const numQueryParams = Object.keys(req.query).length;
      if (numQueryParams !== 0) {
        const surveyId = req.query.surveyid;
        // console.log(`req.query:`);
        // console.log(req);
        if (surveyId) {
          log(`surveyid === ${surveyId}`);
          log('Looking for survey...');
          const survey = await Surveys.findById(surveyId);
          if (!survey) {
            end('Survey not found.');
            return res
              .status(404)
              .json(resBody(false, null, 'Survey not found'));
          }

          // We want the user to have access only when they're a part of the
          // survey's audience or if they're an admin user
          log('Survey found. Validating the user...');
          const userType = res.locals.user?.type;
          if (!userType) {
            end(
              'Possibly server error: res.local.user is invalid after successful auth'
            );
            return res.status(401).json(resBody(false, null, 'Invalid token'));
          }

          if (userType === UserTypes.ADMIN) {
            end('Serving survey to admin user.');
            return res.status(200).json(resBody(true, survey.toStorable()));
          }

          log('Validating audience...');
          if (!survey.audience.includes(userType)) {
            end('Logged-in user is not part of survey audience');
            return res
              .status(403)
              .json(resBody(false, null, ErrorMessages.INVALID_CREDENTIALS));
          }

          if (!survey.isActive()) {
            end(
              "Requested survey isn't active and the logged-in user is not an admin."
            );
            return res
              .status(403)
              .json(resBody(false, null, ErrorMessages.INVALID_CREDENTIALS));
          }

          end('Validation succeeded, serving the survey to user.');
          return res.status(200).json(resBody(true, survey.toStorable()));
        } else {
          end('Invalid query');
          return res.status(400).json(resBody(false, null, 'Invalid query'));
        }
      }

      // If there's no query string, then this request should be for a collection of Surveys
      log('Retrieving all available surveys...');
      const surveys = await Surveys.retrieveAllSurveys();

      const userType = res.locals.user?.type;
      if (!userType) {
        end(
          'Possibly server error: res.local.user is invalid after successful auth'
        );
        return res.status(401).json(resBody(false, null, 'Not authorized'));
      }

      if (userType === UserTypes.ADMIN) {
        end('Serving all surveys to admin user.');
        return res.status(200).json(
          resBody(
            true,
            surveys.map((elem) => elem.toStorable())
          )
        );
      }

      log('Filtering surveys...');
      const accessibleSurveys = surveys.filter((survey) => {
        const isForUser = survey.audience.includes(userType);
        return survey.isActive() && isForUser;
      });

      end('Surveys retrieved. Serving to user.');
      return res.status(200).json(
        resBody(
          true,
          accessibleSurveys.map((elem) => elem.toStorable())
        )
      );
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   POST /api/v1/surveys
 * @desc    Create a new survey
 * @access  Admin
 * @return  {ResponseData<StorableSurvey>}
 */
surveyRoutes.post(
  '/',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (req: TypedRequest, res: TypedResponse<StorableSurvey>) => {
    type Payload = StorableSurvey;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('POST /surveys (Create a new survey)');

    try {
      const blankSurvey: StorableSurvey = {
        _id: new Types.ObjectId().toString(),
        title: 'Untitled survey',
        version: 0,
        description: 'Empty description',
        audience: [],
        questions: [
          {
            _id: new Types.ObjectId().toString(),
            type: QuestionType.NUMBER,
            isRequired: false,
            text: 'New question',
            header: ' ',
          },
        ],
      };

      log('Creating new survey.');
      const survey = await Surveys.create(blankSurvey);

      // prettier-ignore
      end('Serving new survey to user.')
      return res.status(201).json(resBody(true, survey.toStorable()));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   PUT /api/v1/surveys?surveyid
 * @desc    Update survey
 * @access  Admin
 * @param   {string} surveyid
 * @param   {StorableSurvey} body
 * @return  {ResponseData<StorableSurvey>}
 */
surveyRoutes.put(
  '/',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (
    req: TypedRequest<{ surveyid: string }, StorableSurvey>,
    res: TypedResponse<StorableSurvey>
  ) => {
    type Payload = StorableSurvey;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'PUT /surveys?surveyid (Update an existing survey)'
    );

    try {
      if (!req.query.surveyid) {
        end('Invalid query.');
        return res.status(400).json(resBody(false));
      }

      if (isStorableSurvey(req.body)) {
        end('Ill-formed body.');
        return res.status(400).json(resBody(false, null, 'Ill-formed body'));
      }

      log('Checking survey existence...');
      const surveyId = req.query.surveyid;
      const exists = await Surveys.exists(surveyId);
      if (!exists) {
        end('Survey not found.');
        return res.status(404).json(resBody(false, null, 'Survey not found'));
      }

      log('Updating survey...');
      const survey = await Surveys.findByIdAndUpdate(surveyId, req.body);
      if (!survey) {
        end('Survey is ill-formed.');
        return res
          .status(400)
          .json(resBody(false, null, 'Given survey is ill-formed'));
      }

      end('Update succeeded, serving updated survey.');
      return res.status(200).json(resBody(true, survey.toStorable()));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   DELETE /api/v1/surveys?surveyid
 * @desc    Delete survey
 * @access  Admin
 * @param   {string} surveyid
 * @return  {ResponseData<null>}
 */
surveyRoutes.delete(
  '/',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (req: TypedRequest<{ surveyid: string }>, res: TypedResponse<null>) => {
    type Payload = null;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'DELETE /surveys?surveyid (Delete an existing survey)'
    );

    try {
      if (!req.query.surveyid) {
        end('Invalid query.');
        return res.status(400).json(resBody(false));
      }
      const surveyId = req.query.surveyid;
      log(`surveyid === ${surveyId}`);

      log('Checking survey existence...');
      const exists = await Surveys.exists(surveyId);
      if (!exists) {
        end('Survey not found.');
        return res.status(404).json(resBody(false, null, 'Survey not found'));
      }

      log('Attempting delete...');
      const survey = await Surveys.deleteSurvey(surveyId);
      if (!survey) {
        end('Deletion failed.');
        return res.status(404).json(resBody(false, null, 'Survey not found'));
      }

      log('Deletion succeeded. Deletion data:');
      log(survey);
      return res.status(204).json(resBody(true));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   POST /api/v1/surveys/submissions
 * @desc    Submit one or more new submissions
 * @access  Private
 * @param   {StorableSubmission[]} body
 * @return  {ResponseData<StorableSubmission[]>}
 */
surveyRoutes.post(
  '/submissions',
  Auth.authenticator,
  async (
    req: TypedRequest<{}, StorableSubmission[]>,
    res: TypedResponse<StorableSubmission[]>
  ) => {
    type Payload = StorableSubmission[];
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'POST /surveys/submissions (Submit one or more new submissions)'
    );

    try {
      if (!isStorableSubmissionArray(req.body)) {
        end('Request payload is not an array.');
        return res.status(400).json(resBody(false));
      }

      log('Validating submissions...');
      const submissions = req.body.filter(async (sub) => {
        const survey = await Surveys.findById(sub.surveyId);
        if (!survey) {
          return false;
        }

        // Check that the submission was on time
        const submittedOn = sub.submittedOn;
        const deactivatedOn = survey.deactivatedAt;
        if (deactivatedOn) {
          if (!submittedOn || submittedOn >= deactivatedOn.getTime()) {
            return false;
          }
        }

        const user = await Users.exists(sub.userEmail);
        if (!user) {
          return false;
        }

        return true;
      });

      if (submissions.length === 0) {
        end('All submissions are invalid.');
        return res
          .status(400)
          .json(resBody(false, null, 'Given submission(s) are invalid'));
      }

      log('Attempting to insert submissions...');
      const validSubmissions = await Submissions.insertMany(submissions);
      if (validSubmissions.length === 0) {
        end('All submissions are invalid.');
        return res
          .status(400)
          .json(resBody(false, null, 'Given submission(s) are invalid'));
      }

      end('Success. Serving valid submissions.');
      return res.status(201).json(
        resBody(
          true,
          validSubmissions.map((elem) => elem.toStorable())
        )
      );
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

// TODO: Finish implementing
/**
 * @route   GET /api/v1/surveys/submissions?surveyid
 * @desc    Get all submissions for a particular survey
 * @access  Private
 * @param   {string} surveyid
 * @return  {ResponseData<StorableSubmission[]>}
 */
surveyRoutes.get(
  '/submissions',
  Auth.authenticator,
  async (
    req: TypedRequest<{ surveyid: string }>,
    res: TypedResponse<StorableSubmission[]>
  ) => {
    type Payload = StorableSubmission[];
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'GET /surveys/submissions?surveyid (Get all submissions for a particular survey)'
    );

    try {
      // TODO: Retrieve submissions by userEmail
      if (!req.query.surveyid) {
        end('Invalid query.');
        return res.status(400).json(resBody(false));
      }
      const surveyId = req.query.surveyid;

      // TODO: Filter remaining submissions by surveyid

      log(`surveyId === ${surveyId}`);
      log('Finding matching submissions...');
      const submissions = await Submissions.findBySurvey(surveyId);
      if (submissions.length === 0) {
        end('No submissions found for the given survey.');
        return res.status(404).json(resBody(false));
      }

      end('Not implemented.');
      return res.status(500).json(resBody(false));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

export default surveyRoutes;
