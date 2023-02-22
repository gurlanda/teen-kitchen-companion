import QuestionType from '../Question/QuestionType';
import StorableOption from './StorableOption';
import StorableRowQuestion from './StorableRowQuestion';

type StorableQuestion = {
  _id: string;
  type: QuestionType.asUnion;
  text: string;
  header: string;
  isRequired: boolean;
  minText?: string;
  maxText?: string;
  min?: number;
  max?: number;
  step?: number;
  scaleType?: string;
  numLines?: number;
  options?: StorableOption[];
  rows?: StorableRowQuestion[];
};
export default StorableQuestion;
