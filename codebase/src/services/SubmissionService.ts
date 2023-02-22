import Submission, { SubmissionDocument } from '../models/Submission';
import StorableSubmission from '../Storables/StorableSubmission';

namespace Submissions {
  export const insertMany = async (submissions: StorableSubmission[]) => {
    return await Submission.insertMany(submissions, { ordered: false });
  };

  export const create = async (
    newSubmission: SubmissionDocument | StorableSubmission
  ) => {
    return await Submission.create(newSubmission);
  };

  export const findBySurvey = async (surveyId: string) => {
    return await Submission.find({ surveyId });
  };

  export const findByUserEmail = async (userEmail: string) => {
    return await Submission.find({ userEmail });
  };
}

export default Submissions;
