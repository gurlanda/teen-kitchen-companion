import React, { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyAdminContext from './SurveyAdminContext';
import QuestionEditState from 'src/model/EditState/QuestionEditState';
import SurveyEditState from 'src/model/EditState/SurveyEditState';
import Survey from 'src/model/Survey/Survey';
import Reducer from 'src/model/Interfaces/Reducer';
import LocalDb from 'src/model/LocalDatabase/LocalDatabase';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import AuthContext from '../Auth/AuthContext';
import UserType from 'src/model/User/UserType';

const SurveyAdminContextState: React.FC<{
  survey: Survey;
  children: ReactNode;
}> = ({ survey, children }) => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<SurveyEditState>(
    new SurveyEditState(survey)
  );
  const navigate = useNavigate();

  if (!authContext || !authContext.state.isAuthenticated) {
    return <></>;
  }

  const { user } = authContext.state;
  if (user!.type !== UserType.ADMIN) {
    return <></>;
  }

  const providedMethods = {
    executeQuestionReducer: (
      questionId: string,
      reducer: Reducer<QuestionEditState>
    ): void => {
      setState(state.applyQuestionReducer(questionId, reducer));
    },

    executeStateReducer: (reducer: Reducer<SurveyEditState>) => {
      setState(reducer(state));
    },

    activateAutoFocus: (): void => {
      const newState = SurveyEditState.createSetAutoFocus(true)(state);
      setState(newState);
    },

    disableAutoFocus: (): void => {
      const newState = SurveyEditState.createSetAutoFocus(false)(state);
      setState(newState);
    },

    updateSurvey: async () => {
      const updatedSurvey = state.buildSurvey();

      try {
        const confirmedSurvey = await ServerAdapter.updateSurvey(updatedSurvey);
        if (confirmedSurvey) {
          await LocalDb.updateSurvey(confirmedSurvey);
        }
      } catch (e: any) {
        console.error(e);
      }
    },

    deleteSurvey: async () => {
      try {
        await ServerAdapter.deleteSurvey(state.id);
        navigate('/survey/admin'); // Redirect to SurveyAdminSelect page after deletion
      } catch (e: any) {
        console.error(e);
      }
    },
  };

  return (
    <SurveyAdminContext.Provider value={{ state, ...providedMethods }}>
      {children}
    </SurveyAdminContext.Provider>
  );
};

export default SurveyAdminContextState;
