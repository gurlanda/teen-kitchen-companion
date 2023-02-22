import StorableResponse from './StorableResponse';

type StorableSubmission = {
  _id: string;
  surveyId: string;
  surveyVersion: number;
  userEmail: string;
  submittedOn: number;
  responses: StorableResponse[];
};
export default StorableSubmission;
