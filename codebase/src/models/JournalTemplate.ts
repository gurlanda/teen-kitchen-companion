import { model, Schema } from 'mongoose';
import StorableJournalTemplate from '../Storables/StorableJournalTemplate';
import QuestionSchema, { QuestionDocument } from './QuestionSchema';

export interface JournalTemplateDocument extends Document {
  questions: QuestionDocument[];
  toStorable(): StorableJournalTemplate;
}

const JournalTemplateSchema = new Schema(
  {
    questions: { type: [QuestionSchema], required: true },
  },
  { timestamps: true }
);

JournalTemplateSchema.methods.toStorable =
  function (): StorableJournalTemplate {
    const journalTemplate = this as JournalTemplateDocument;
    return {
      questions: journalTemplate.questions.map((elem) => elem.toStorable()),
    };
  };

const JournalTemplate = model<JournalTemplateDocument>(
  'JournalTemplate',
  JournalTemplateSchema
);
export default JournalTemplate;
