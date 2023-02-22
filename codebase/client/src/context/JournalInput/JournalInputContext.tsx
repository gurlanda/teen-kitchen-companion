import { createContext } from 'react';
import JournalInputState from 'src/model/InputState/JournalInputState';
import QuestionInputState from 'src/model/InputState/QuestionInputState';
import Reducer from 'src/model/Interfaces/Reducer';

export interface JournalContextInterface {
  state: JournalInputState;
  executeQuestionReducer(
    questionId: string,
    reducer: Reducer<QuestionInputState>
  ): void;
  setIsSubmitted(newValue: boolean): void;
  setDidAttemptSubmit(newValue: boolean): void;
  submit(): void;
  clear(): void;
  isDirty(): boolean;
}
const JournalInputContext = createContext<JournalContextInterface | null>(null);
export default JournalInputContext;
