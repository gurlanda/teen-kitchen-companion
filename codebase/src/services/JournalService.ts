import { Types } from 'mongoose';
import Journal from '../models/Journal';
import JournalTemplate, {
  JournalTemplateDocument,
} from '../models/JournalTemplate';
import QuestionType from '../models/QuestionType';
import StorableJournalTemplate from '../Storables/StorableJournalTemplate';

const runValidators = { runValidators: true };
namespace Journals {
  export const exists = async (query: { _id: Types.ObjectId | string }) => {
    const found = await Journal.exists(query);
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  export const findById = async (journalId: Types.ObjectId | string) => {
    return await Journal.findById(journalId);
  };

  export const retrieveJournals = async () => {
    return await Journal.find();
  };

  export const deleteJournal = async (journalId: Types.ObjectId | string) => {
    return await Journal.deleteOne({ _id: journalId });
  };

  export const retrieveTemplate = async () => {
    let template = await JournalTemplate.findOne();
    if (!template) {
      const blankTemplate: StorableJournalTemplate = {
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

      await JournalTemplate.create(blankTemplate);
      template = await JournalTemplate.findOne();
    }

    return template;
  };

  export const updateTemplate = async (
    template: JournalTemplateDocument | StorableJournalTemplate
  ) => {
    // Get the journal template
    const storedTemplate = await retrieveTemplate();
    if (!storedTemplate) {
      // This should not happen
      return null;
    }

    const id = storedTemplate._id;
    return await JournalTemplate.findByIdAndUpdate(id, template, runValidators);
  };
}

export default Journals;
