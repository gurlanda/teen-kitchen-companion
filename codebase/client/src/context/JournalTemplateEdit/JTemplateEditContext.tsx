import { createContext } from 'react';
import JTemplateEditState from 'src/model/EditState/JTemplateEditState';
import QuestionEditState from 'src/model/EditState/QuestionEditState';
import Reducer from 'src/model/Interfaces/Reducer';

export interface JTemplateEditContextInterface {
  state: JTemplateEditState;
  executeQuestionReducer(
    questionId: string,
    reducer: Reducer<QuestionEditState>
  ): void;
  executeStateReducer(reducer: Reducer<JTemplateEditState>): void;
  updateTemplate(): void;
  activateAutoFocus(): void;
  disableAutoFocus(): void;
}
const JTemplateEditContext =
  createContext<JTemplateEditContextInterface | null>(null);

export default JTemplateEditContext;
