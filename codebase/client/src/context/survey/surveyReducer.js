import * as ops from '../types';

const SurveyReducer = (state, action) => {
  switch (action.type) {
    case ops.APPLY_QUESTION_REDUCER: {
      const { reducer, questionId } = action.payload;
      const newInputState = reducer(state[questionId]);

      return {
        ...state,
        [questionId]: newInputState,
      };
    }

    case ops.SET_IS_SUBMITTED: {
      // action.payload contains the new value of isSubmitted
      return {
        ...state,
        isSubmitted: action.payload,
      };
    }

    case ops.SET_DID_ATTEMPT_SUBMIT: {
      return {
        ...state,
        didAttemptSubmit: action.payload,
      };
    }

    case ops.CLEAR:
      // initialState from SurveyState was passed into action.payload
      return action.payload;

    default:
      return state;
  }
};

export default SurveyReducer;
