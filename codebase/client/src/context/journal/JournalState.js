import React, { useContext, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import JournalContext from './journalContext';
import JournalReducer from './journalReducer';
import * as ops from '../types';
import db, { storeSubmission } from '../../model/database/LocalStorage';
import { createInputState } from '../survey/state/utils';
import isOnline from '../../utils/isOnline';
import ServerAdapter from '../../model/database/ServerAdapter';
import AuthContext from '../auth/authContext';
import Journal from 'src/model/journal/Journal';
import JournalEntry from 'src/model/journal/JournalEntry';

const JournalState = ({ journal, journalEntry, children }) => {
  console.log('Initializing JournalState...');
  if (!(journal instanceof Journal)) {
    throw new TypeError(
      'In JournalState: Given argument to journal is not of type Journal'
    );
  }

  if (journalEntry && !(journalEntry instanceof JournalEntry)) {
    throw new TypeError(
      'In JournalState: Given argument to journalEntry is of an invalid type'
    );
  }

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { weekStart, weekEnd, questions } = journal;
  const journalId = journal.id;
  const entryId = journalEntry?.id ?? null;
  const submittedAt = journalEntry?.submittedAt ?? null;
  const userId = journalEntry?.userId ?? null;
  const responses = journalEntry?.responses ?? null;
  const questionIds = questions.map((ques) => ques.id);

  let initialState = {
    journalId,
    entryId,
    weekStart,
    weekEnd,
    submittedAt,
    questionIds,
    didAttemptSubmit: false,
  };

  for (const question of questions) {
    const questionId = question.id;
    let resValue = null;
    if (responses) {
      for (const res of responses) {
        if (res.questionId === questionId) {
          resValue = res.value;
          break;
        }
      }
    }

    initialState = {
      ...initialState,
      [questionId]: createInputState(question, resValue),
    };
  }

  const [state, dispatch] = useReducer(JournalReducer, initialState);

  console.log('JournalState initialized!');

  const applyQuestionReducer = (reducer, questionId) => {
    // To change an InputState object, we pass in a reducer function and the
    // questionId of the InputState the reducer will be applied to
    dispatch({
      type: ops.APPLY_QUESTION_REDUCER,
      payload: {
        questionId,
        reducer,
      },
    });
  };

  const setDidAttemptSubmit = (newValue) => {
    dispatch({
      type: ops.SET_DID_ATTEMPT_SUBMIT,
      payload: newValue,
    });
  };

  const clear = () => {
    dispatch({
      type: ops.CLEAR,
      payload: initialState,
    });
  };

  const submit = () => {
    // Convert state to a journal entry
    // LATER: Store the entry if offline
    // Submit the entry
    clear();
  };

  const isDirty = () => {
    return !isEqual(
      omit(state, ['didAttemptSubmit']),
      omit(initialState, ['didAttemptSubmit'])
    );
  };

  const providedMethods = {
    applyQuestionReducer,
    setDidAttemptSubmit,
    submit,
    clear,
    isDirty,
  };

  return (
    <JournalContext.Provider value={{ ...state, ...providedMethods }}>
      {children}
    </JournalContext.Provider>
  );
};

export default JournalState;
