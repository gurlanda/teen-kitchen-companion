import { model, Document, Schema } from 'mongoose';
import StorableSurvey from '../Storables/StorableSurvey';
import QuestionSchema, { QuestionDocument } from './QuestionSchema';
import UserType from './UserType';

export interface SurveyDocument extends Document {
  title: string;
  description: string;
  audience: UserType.asUnion[];
  deactivatedAt?: Date;
  updatedAt?: Date;
  questions: QuestionDocument[];
  toStorable(): StorableSurvey;
  isActive(): boolean;
}

const SurveySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deactivatedAt: Date,
    updatedAt: Date,
    questions: { type: [QuestionSchema], required: true },
    audience: {
      type: [String],
      required: true,
      validate: {
        validator: (vals: any[]) => {
          for (const elem of vals) {
            if (!UserType.asArray.includes(elem)) {
              return false;
            }
          }

          return true;
        },
      },
    },
  },
  { timestamps: true }
);

SurveySchema.methods.toStorable = function (): StorableSurvey {
  const survey = this as SurveyDocument;
  return {
    _id: survey._id,
    version: survey.__v,
    title: survey.title,
    description: survey.description,
    audience: survey.audience,
    deactivatedAt: survey.deactivatedAt?.getTime(),
    updatedAt: survey.updatedAt?.getTime(),
    questions: survey.questions.map((elem) => elem.toStorable()),
  };
};

SurveySchema.methods.isActive = function (): boolean {
  const survey = this as SurveyDocument;

  // This survey is active if & only if there is NO deactivatedAt
  if (!survey.deactivatedAt) {
    return true;
  } else {
    return false;
  }
};

const Survey = model<SurveyDocument>('Survey', SurveySchema);
export default Survey;
