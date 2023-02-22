import { Types, UpdateQuery } from 'mongoose';
import Entry, { EntryDocument } from '../models/Entry';
import StorableEntry from '../Storables/StorableEntry';

namespace Entries {
  const runValidators = { runValidators: true };
  export const find = async (query: {
    userEmail: Types.ObjectId | string;
    journalId?: Types.ObjectId | string;
  }) => {
    return await Entry.find(query);
  };

  export const findAndUpdate = async (
    entryId: Types.ObjectId | string,
    updatedEntry: UpdateQuery<EntryDocument>
  ) => {
    return await Entry.findByIdAndUpdate(
      { _id: entryId },
      updatedEntry,
      runValidators
    );
  };

  export const findById = async (entryId: Types.ObjectId | string) => {
    return await Entry.findById(entryId);
  };

  export const create = async (newEntry: EntryDocument | StorableEntry) => {
    return await Entry.create(newEntry);
  };

  /**
   * Retrieve all entries for a user.
   * @param {string} userEmail The email of the user.
   * @returns {Promise<(EntryDocument & {_id: Types.ObjectId;})[]>} A promise for an array containing all the user's entries
   */
  export const findByUserEmail = async (userEmail: string) => {
    return await Entry.find({ userEmail });
  };
}

export default Entries;

