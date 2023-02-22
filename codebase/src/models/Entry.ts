import { Document, Schema, Types, model } from 'mongoose';
import StorableEntry from '../Storables/StorableEntry';
import { JournalDocument } from './Journal';
import ResponseSchema, { ResponseDocument } from './ResponseSchema';
import { UserDocument } from './User';

export interface EntryDocument extends Document {
  journalId: JournalDocument['_id'];
  userEmail: UserDocument['email'];
  submittedAt: Date;
  responses: ResponseDocument[];
  toStorable(): StorableEntry;
}

const EntrySchema = new Schema(
  {
    userEmail: { type: String, required: true },
    journalId: { type: String, required: true },
    submittedAt: { type: Date, required: true },
    responses: { type: [ResponseSchema], required: true },
  },
  { timestamps: true }
);

EntrySchema.methods.toStorable = function (): StorableEntry {
  const entry = this as EntryDocument;
  return {
    _id: entry._id,
    journalId: entry.journalId,
    userEmail: entry.userEmail,
    submittedAt: entry.submittedAt.getTime(),
    responses: entry.responses.map((elem) => elem.toStorable()),
  };
};

const Entry = model<EntryDocument>('Entry', EntrySchema);
export default Entry;
