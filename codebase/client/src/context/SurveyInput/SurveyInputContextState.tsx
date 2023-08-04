import { FC, ReactNode, useContext, useState } from 'react';
import AuthContext from '../Auth/AuthContext';
import SurveyInputContext from './SurveyInputContext';
import SurveyInputState from 'src/model/InputState/SurveyInputState';
import Survey from 'src/model/Survey/Survey';
import Submission from 'src/model/Survey/Submission';
import Reducer from 'src/model/Interfaces/Reducer';
import QuestionInputState from 'src/model/InputState/QuestionInputState';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import LocalDb from 'src/model/LocalDatabase/LocalDatabase';
import isOnline from 'src/utils/isOnline';

const SurveyInputContextState: FC<{ survey: Survey; children: ReactNode }> = ({
  survey,
  children,
}) => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<SurveyInputState>(
    new SurveyInputState(survey)
  );

  // if (!authContext || !authContext.state.isAuthenticated) {
  //   return <></>;
  // }

  // const { user, isAuthenticated } = authContext.state;

  const providedMethods = {
    useQuestionReducer: (
      questionId: string,
      reducer: Reducer<QuestionInputState>
    ) => {
      const newState = state.applyQuestionReducer(questionId, reducer);
      setState(newState);
    },

    // Sets the isSubmitted flag
    // If isSubmitted === true, then the SurveySubmitted page will be shown
    setIsSubmitted: (newValue: boolean) => {
      const newState = state.clone();
      newState.isSubmitted = newValue;
      setState(newState);
    },

    // Sets the didAttemptSubmit flag
    setDidAttemptSubmit: (newValue: boolean) => {
      const newState = state.clone();
      newState.didAttemptSubmit = newValue;
      setState(newState);
    },

    // Submit
    submit: async () => {
      // user! because this component should not be available if a user isn't logged in
      // const submission: Submission = state.toSubmission(user!);
      // try {
      //   if (await isOnline()) {
      //     await ServerAdapter.postSubmission(submission);
      //     await ServerAdapter.postStoredSubmissions();
      //   } else {
      //     console.log('Offline!');
      //     await LocalDb.storeSubmission(submission);
      //   }
      // } catch (err: any) {
      //   console.error(err);
      //   console.error(err.message);
      // }
      // // Clear the submission data and show the SurveySubmitted page
      // setState(state.getClearedClone());
    },

    // Clear the state
    clear: () => {
      setState(state.getClearedClone());
    },

    // Returns true if the current state is different from the initial state
    isDirty: (): boolean => {
      return state.isDirty();
    },
  };

  const staticValues = {
    ...providedMethods,
  };

  return (
    <SurveyInputContext.Provider value={{ state, ...staticValues }}>
      {children}
    </SurveyInputContext.Provider>
  );
};

export default SurveyInputContextState;
