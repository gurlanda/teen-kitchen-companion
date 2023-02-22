import StorableResponse, { isStorableResponseArray } from './StorableResponse';
import { Types } from 'mongoose';
import { arrayTPFactory, isNumber, isString } from './TypeguardUtil';

type StorableSubmission = {
  _id: string | Types.ObjectId;
  surveyId: string | Types.ObjectId;
  surveyVersion: number;
  userEmail: string;
  submittedOn: number;
  responses: StorableResponse[];
};
export default StorableSubmission;

export const isStorableSubmission = (arg: any): arg is StorableSubmission =>
  isString(arg._id) &&
  isString(arg.surveyId) &&
  isString(arg.userEmail) &&
  isNumber(arg.surveyVersion) &&
  isNumber(arg.submittedOn) &&
  isStorableResponseArray(arg.responses);

export const isStorableSubmissionArray = arrayTPFactory(isStorableSubmission);
