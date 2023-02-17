import React, { useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import { useHistory } from 'react-router-dom';
import Survey from '../../model/survey/Survey';
import * as UserTypes from '../../model/user/userTypes';
import SurveyAdminContext from './surveyAdminContext';
import SurveyAdminReducer from './surveyAdminReducer';
import ServerAdapter from '../../model/database/ServerAdapter';
import db from '../../model/database/LocalStorage';

import * as ops from '../types';

import { createEditState } from './state/utils';

const SurveyAdminState = ({ surveyData, children }) => {
  const history = useHistory(); // Used in deleteSurvey() to redirect to AdminSelect
  const { id } = surveyData;

  const createInitialState = (survey) => {
    const {
      id,
      version,
      deactivatedAt,
      description,
      audience,
      title,
      questions,
    } = survey;

    let initialState = {
      id,
      version,
      isActive: deactivatedAt ? false : true, // True if and only if deactivatedAt contains a valid Date
      description,
      audience,
      title,
      questions: [],
      autoFocusIsActive: false,
    };

    // Map Questions to States
    if (!questions || questions.length === 0) {
      initialState.questions = [];
    } else {
      initialState.questions = questions.map((ques) => createEditState(ques));
    }

    return initialState;
  };

  let initialState = createInitialState(surveyData);

  const [state, dispatch] = useReducer(SurveyAdminReducer, initialState);

  const providedMethods = {
    // To change a State object, we pass in a reducer function and the
    // questionId of the State the reducer will be applied to
    applyQuestionReducer: (reducer, questionId) => {
      dispatch({
        type: ops.APPLY_QUESTION_REDUCER,
        payload: {
          questionId: questionId,
          reducer: reducer,
        },
      });
    },

    // Activate auto-focus
    activateAutoFocus: () => {
      dispatch({
        type: ops.ACTIVATE_AUTOFOCUS,
      });
    },

    // Disable auto-focus
    disableAutoFocus: () => {
      dispatch({
        type: ops.DISABLE_AUTOFOCUS,
      });
    },

    // Add a question
    addQuestion: () => {
      dispatch({
        type: ops.CREATE_QUESTION,
      });
    },

    moveQuestionUp: (questionId) => {
      dispatch({
        type: ops.MOVE_QUESTION_UP,
        payload: questionId,
      });
    },

    moveQuestionDown: (questionId) => {
      dispatch({
        type: ops.MOVE_QUESTION_DOWN,
        payload: questionId,
      });
    },

    // Delete a question
    deleteQuestion: (questionId) => {
      dispatch({
        type: ops.DELETE_QUESTION,
        payload: questionId,
      });
    },

    // Edit the Survey title
    setTitle: (newTitle) => {
      dispatch({
        type: ops.SET_TITLE,
        payload: newTitle,
      });
    },

    // Edit the Survey description
    setDescription: (newDescription) => {
      dispatch({
        type: ops.SET_DESCRIPTION,
        payload: newDescription,
      });
    },

    // Edit the Survey's target audience
    setAudience: (newAudience) => {
      if (!(newAudience instanceof Array)) {
        throw new TypeError(
          "In SurveyAdminState > setAudience(): Argument passed into parameter 'newAudience' is not of type Array."
        );
      }

      for (const elem of newAudience) {
        if (!UserTypes.asArray.includes(elem)) {
          throw new TypeError(
            'In SurveyAdminState > setAudience(): At least one element of the passed-in array is not a valid UserType.'
          );
        }
      }

      dispatch({
        type: ops.SET_AUDIENCE,
        payload: newAudience,
      });
    },

    // Deactivate or reactivate the survey
    toggleIsActive: () => {
      dispatch({
        type: ops.TOGGLE_IS_ACTIVE,
      });
    },

    // Save changes to Survey
    updateSurvey: async () => {
      const deactivatedAt = state.isActive ? null : Date.now();
      const updatedSurvey = await ServerAdapter.updateSurvey(
        new Survey(
          state.title,
          state.description,
          state.audience,
          deactivatedAt,
          null,
          state.questions.map((quesState) => quesState.toQuestion()),
          state.id
        )
      );
      initialState = createInitialState(updatedSurvey);
    },

    // Delete the Survey
    deleteSurvey: async () => {
      await ServerAdapter.deleteSurvey(id);
      await db.surveys.where('id').equals(id).delete();
      history.push('/survey/admin');
    },

    // Returns true if the current state is different from the initial state
    isDirty: () => {
      return !isEqual(
        omit(state, ['autoFocusIsActive']),
        omit(initialState, ['autoFocusIsActive'])
      );
    },
  };

  return (
    <SurveyAdminContext.Provider
      value={{ ...state, ...providedMethods, state, initialState }}
    >
      {children}
    </SurveyAdminContext.Provider>
  );
};

export default SurveyAdminState;
