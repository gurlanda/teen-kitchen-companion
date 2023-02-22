import StorableQuestion, { isStorableQuestionArray } from './StorableQuestion';

type StorableJournalTemplate = {
  questions: StorableQuestion[];
};
export default StorableJournalTemplate;

export const isStorableJournalTemplate = (
  arg: any
): arg is StorableJournalTemplate => isStorableQuestionArray(arg.questions);
