import mongoose from 'mongoose';
import StorableJournal from '../Storables/StorableJournal';
import QuestionSchema, { QuestionDocument } from './QuestionSchema';

export interface JournalDocument extends mongoose.Document {
  title: string;
  weekStart: Date;
  weekEnd: Date;
  questions: QuestionDocument[];
  toStorable(): StorableJournal;
}

const JournalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true },
    questions: {
      type: [QuestionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

JournalSchema.methods.toStorable = function (): StorableJournal {
  const journal = this as JournalDocument;
  return {
    _id: journal._id,
    weekStart: journal.weekStart.getTime(),
    weekEnd: journal.weekEnd.getTime(),
    questions: journal.questions.map((elem) => elem.toStorable()),
  };
};

const Journal = mongoose.model<JournalDocument>('Journal', JournalSchema);
export default Journal;
