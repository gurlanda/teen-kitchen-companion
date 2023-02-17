import React, { useContext, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import SurveyContext from './surveyContext';
import SurveyReducer from './surveyReducer';
import * as ops from '../types';
import db, { storeSubmission } from '../../model/database/LocalStorage';
import { createInputState } from './state/utils';
import isOnline from '../../utils/isOnline';
import Submission from '../../model/survey/Submission';
import ServerAdapter from '../../model/database/ServerAdapter';
import AuthContext from '../auth/authContext';

const SurveyState = ({ surveyData, children }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { id, version, description, title, questions } = surveyData;
  const questionIds = questions.map((question) => question.id);

  // Determine if there are any required questions
  let hasRequiredQuestions = false;
  for (const ques of questions) {
    if (ques.isRequired === true) {
      hasRequiredQuestions = true;
      break;
    }
  }

  let initialState = {
    version,
    id,
    questionIds,
    description,
    title,
    hasRequiredQuestions,
    didAttemptSubmit: false,
    isSubmitted: false,
  };

  questions.forEach((question) => {
    initialState = {
      ...initialState,
      [question.id]: createInputState(question),
    };
  }); // questions.forEach()

  const [state, dispatch] = useReducer(SurveyReducer, initialState);

  const providedMethods = {
    // To change an InputState object, we pass in a reducer function and the
    // questionId of the InputState the reducer will be applied to
    applyQuestionReducer: (reducer, questionId) => {
      dispatch({
        type: ops.APPLY_QUESTION_REDUCER,
        payload: {
          questionId,
          reducer,
        },
      });
    },

    // Sets the isSubmitted flag
    // If isSubmitted === true, then the SurveySubmitted page will be shown
    setIsSubmitted: (newValue) => {
      dispatch({
        type: ops.SET_IS_SUBMITTED,
        payload: newValue,
      });
    },

    // Sets the didAttemptSubmit flag
    setDidAttemptSubmit: (newValue) => {
      dispatch({
        type: ops.SET_DID_ATTEMPT_SUBMIT,
        payload: newValue,
      });
    },

    // Submit
    submit: async () => {
      // Convert the state object to an array of Responses
      const responses = questionIds.map((id) => state[id].toResponse());

      const submission = new Submission(
        state.id,
        user,
        Date.now(),
        responses,
        state.version
      );

      try {
        if (await isOnline()) {
          await ServerAdapter.postSubmission(submission);
          await ServerAdapter.postStoredSubmissions();
        } else {
          console.log('Offline!');
          await storeSubmission(submission);
        }
      } catch (err) {
        console.error(err);
        console.error(err.message);
      }

      // Clear the submission data and show the SurveySubmitted page
      const submittedState = {
        ...initialState,
        isSubmitted: true,
      };

      dispatch({
        type: ops.CLEAR,
        payload: submittedState,
      });
    },

    deleteItem: async (id) => {
      await db.submissions.delete(id);
    },

    // Clear the state
    clear: () => {
      dispatch({
        type: ops.CLEAR,
        payload: initialState,
      });
    },

    // Returns true if the current state is different from the initial state
    isDirty: () => {
      return !isEqual(
        omit(state, ['didAttemptSubmit']),
        omit(initialState, ['didAttemptSubmit'])
      );
    },
  };

  const staticValues = {
    ...providedMethods,
    version,
    id,
    questionIds,
    description,
    title,
  };

  return (
    <SurveyContext.Provider value={{ ...state, ...staticValues }}>
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyState;
