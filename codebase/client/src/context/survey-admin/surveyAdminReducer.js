import * as ops from '../types';

import { createEditState } from './state/utils';
import { moveElemUp, moveElemDown } from '../../utils/utils';

const SurveyAdminReducer = (state, action) => {
  switch (action.type) {
    case ops.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };

    case ops.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };

    case ops.SET_AUDIENCE:
      return {
        ...state,
        audience: action.payload,
      };

    case ops.TOGGLE_IS_ACTIVE:
      return {
        ...state,
        isActive: !state.isActive,
      };

    case ops.ACTIVATE_AUTOFOCUS:
      return {
        ...state,
        autoFocusIsActive: true,
      };

    case ops.DISABLE_AUTOFOCUS: {
      return {
        ...state,
        autoFocusIsActive: false,
      };
    }

    case ops.CREATE_QUESTION: {
      const currentQuestions = [...state.questions, createEditState()];

      return {
        ...state,
        questions: currentQuestions,
      };
    }

    case ops.DELETE_QUESTION: {
      const newQuestions = state.questions.filter(
        (ques) => ques.id !== action.payload
      );

      return {
        ...state,
        questions: newQuestions,
      };
    }

    case ops.APPLY_QUESTION_REDUCER: {
      const { reducer, questionId } = action.payload;
      const newQuestions = state.questions.map((ques) => {
        if (ques.id === questionId) {
          return reducer(ques);
        } else {
          return ques.clone();
        }
      });

      return {
        ...state,
        questions: newQuestions,
      };
    }

    case ops.MOVE_QUESTION_UP: {
      const targetId = action.payload;
      const targetIndex = state.questions.findIndex(
        (ques) => ques.id === targetId
      );

      const newQuestions = moveElemUp(state.questions, targetIndex);
      return {
        ...state,
        questions: newQuestions,
      };
    }

    case ops.MOVE_QUESTION_DOWN: {
      const targetId = action.payload;
      const targetIndex = state.questions.findIndex(
        (ques) => ques.id === targetId
      );

      const newQuestions = moveElemDown(state.questions, targetIndex);
      return {
        ...state,
        questions: newQuestions,
      };
    }
    case ops.DELETE_SURVEY:
    default:
      return state;
  }
};

export default SurveyAdminReducer;
