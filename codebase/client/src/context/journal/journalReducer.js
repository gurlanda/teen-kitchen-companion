import InputState from '../survey/state/InputState';
import * as ops from '../types';

const JournalReducer = (state, action) => {
  switch (action.type) {
    case ops.APPLY_QUESTION_REDUCER: {
      console.log('In JournalReducer: Attempting to update question state...');
      const { reducer, questionId } = action.payload;

      if (!(reducer instanceof Function)) {
        throw new TypeError(
          'In JournalReducer > case ops.APPLY_QUESTION_REDUCER: Given reducer is not a function.'
        );
      }

      if (!state.questionIds.includes(questionId)) {
        throw new TypeError(
          'In JournalReducer > case ops.APPLY_QUESTION_REDUCER: Given questionId is not valid.'
        );
      }

      const newInputState = reducer(state[questionId]);

      if (!(newInputState instanceof InputState)) {
        throw new TypeError(
          'In JournalReducer > case ops.APPLY_QUESTION_REDUCER: Output produced by reducer is not an InputState.'
        );
      }

      console.log('In JournalReducer: State change successful.');
      return {
        ...state,
        [questionId]: newInputState,
      };
    }

    case ops.CLEAR: {
      return action.payload;
    }

    case ops.SET_DID_ATTEMPT_SUBMIT: {
      return {
        ...state,
        didAttemptSubmit: action.payload,
      };
    }

    default:
      return state;
  }
};

export default JournalReducer;
