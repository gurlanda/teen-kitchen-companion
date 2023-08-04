import React, { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JTemplateEditContext from './JTemplateEditContext';
import QuestionEditState from 'src/model/archive/EditState/QuestionEditState';
import JTemplateEditState from 'src/model/archive/EditState/JTemplateEditState';
import JournalTemplate from 'src/model/archive/Journal/JournalTemplate';
import Reducer from 'src/model/Interfaces/Reducer';
import ServerAdapter from 'src/model/archive/Server/ServerAdapter';
import AuthContext from '../../Auth/AuthContext';
import UserType from 'src/model/User/UserType';

const JTemplateEditContextState: React.FC<{
  template: JournalTemplate;
  children: ReactNode;
}> = ({ template, children }) => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<JTemplateEditState>(
    new JTemplateEditState(template)
  );
  const navigate = useNavigate();

  // if (!authContext || !authContext.state.isAuthenticated) {
  //   return <></>;
  // }

  // const { user } = authContext.state;
  // if (user!.type !== UserType.ADMIN) {
  //   return <></>;
  // }

  const providedMethods = {
    executeQuestionReducer: (
      questionId: string,
      reducer: Reducer<QuestionEditState>
    ): void => {
      setState(state.applyQuestionReducer(questionId, reducer));
    },

    executeStateReducer: (reducer: Reducer<JTemplateEditState>) => {
      setState(reducer(state));
    },

    activateAutoFocus: (): void => {
      const newState = JTemplateEditState.createSetAutoFocus(true)(state);
      setState(newState);
    },

    disableAutoFocus: (): void => {
      const newState = JTemplateEditState.createSetAutoFocus(false)(state);
      setState(newState);
    },

    updateTemplate: async () => {
      const template = state.buildTemplate();

      try {
        await ServerAdapter.updateJournalTemplate(template);
      } catch (e: any) {
        console.error(e);
      }
    },
  };

  return (
    <JTemplateEditContext.Provider value={{ state, ...providedMethods }}>
      {children}
    </JTemplateEditContext.Provider>
  );
};

export default JTemplateEditContextState;
