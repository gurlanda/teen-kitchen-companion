import StorableQuestion from './StorableQuestion';

type StorableJournal = {
  _id: string;
  weekStart: number;
  weekEnd: number;
  questions: StorableQuestion[];
};
export default StorableJournal;
