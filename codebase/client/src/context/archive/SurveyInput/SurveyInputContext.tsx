import { createContext } from 'react';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';
import SurveyInputState from 'src/model/archive/InputState/SurveyInputState';
import Reducer from 'src/model/Interfaces/Reducer';

export interface SurveyContextInterface {
  state: SurveyInputState;
  useQuestionReducer(
    questionId: string,
    reducer: Reducer<QuestionInputState>
  ): void;
  setIsSubmitted(newValue: boolean): void;
  setDidAttemptSubmit(newValue: boolean): void;
  submit(): void;
  clear(): void;
}
const SurveyInputContext = createContext<SurveyContextInterface | null>(null);

export default SurveyInputContext;
