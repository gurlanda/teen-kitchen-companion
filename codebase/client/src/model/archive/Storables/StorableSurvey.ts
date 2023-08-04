import UserType from '../../User/UserType';
import StorableQuestion from './StorableQuestion';

type StorableSurvey = {
  _id: string;
  title: string;
  version: number;
  description: string;
  audience: UserType.asUnion[];
  deactivatedAt?: number;
  updatedAt?: number;
  questions: StorableQuestion[];
};
export default StorableSurvey;
