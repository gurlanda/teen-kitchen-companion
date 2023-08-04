import { createContext } from 'react';
import SurveyEditState from 'src/model/archive/EditState/SurveyEditState';
import QuestionEditState from 'src/model/archive/EditState/QuestionEditState';
import Reducer from 'src/model/Interfaces/Reducer';

export interface AdminContextInterface {
  state: SurveyEditState;
  executeQuestionReducer(
    questionId: string,
    reducer: Reducer<QuestionEditState>
  ): void;
  executeStateReducer(reducer: Reducer<SurveyEditState>): void;
  activateAutoFocus(): void;
  disableAutoFocus(): void;
  updateSurvey(): void;
  deleteSurvey(): void;
}
const SurveyAdminContext = createContext<AdminContextInterface | null>(null);

export default SurveyAdminContext;
