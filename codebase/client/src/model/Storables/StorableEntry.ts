import StorableResponse from './StorableResponse';

type StorableEntry = {
  _id: string;
  journalId: string;
  userEmail: string;
  submittedAt: number;
  responses: StorableResponse[];
};
export default StorableEntry;
