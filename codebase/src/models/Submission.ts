import { Schema, Document, model, Types } from 'mongoose';
import StorableSubmission from '../Storables/StorableSubmission';
import ResponseSchema, { ResponseDocument } from './ResponseSchema';
import { SurveyDocument } from './Survey';
import { UserDocument } from './User';

export interface SubmissionDocument extends Document {
  surveyId: SurveyDocument['_id'];
  surveyVersion: SurveyDocument['__v'];
  userEmail: UserDocument['email'];
  submittedOn: Date;
  responses: ResponseDocument[];
  toStorable(): StorableSubmission;
  isOnTime(deactivatedOn: Date): boolean;
}

// Both startedAt and submittedAt are UTC timestamps
const SubmissionSchema = new Schema({
  surveyId: { type: Types.ObjectId, required: true },
  submittedAt: { type: Date, required: true },
  userEmail: { type: String, required: true },
  responses: { type: [ResponseSchema], required: true },
});

SubmissionSchema.methods.toStorable = function (): StorableSubmission {
  const submission = this as SubmissionDocument;
  return {
    _id: submission._id,
    surveyId: submission.surveyId,
    surveyVersion: submission.surveyVersion,
    userEmail: submission.userEmail,
    submittedOn: submission.submittedOn.getTime(),
    responses: submission.responses.map((elem) => elem.toStorable()),
  };
};

SubmissionSchema.methods.isOnTime = function (deactivatedOn?: Date): boolean {
  if (!deactivatedOn) {
    return true;
  }

  const submission = this as SubmissionDocument;
  const submittedOn = submission.submittedOn;
  return submittedOn.getTime() < deactivatedOn.getTime();
};

const Submission = model<SubmissionDocument>('Submission', SubmissionSchema);
export default Submission;
