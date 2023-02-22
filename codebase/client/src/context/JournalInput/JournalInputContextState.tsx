import React, { ReactNode, useContext, useState } from 'react';
import JournalInputContext from './JournalInputContext';
import JournalInputState from 'src/model/InputState/JournalInputState';
import QuestionInputState from 'src/model/InputState/QuestionInputState';
import Reducer from 'src/model/Interfaces/Reducer';
import Entry from 'src/model/Journal/Entry';
import Journal from 'src/model/Journal/Journal';
import LocalDb from 'src/model/LocalDatabase/LocalDatabase';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import isOnline from 'src/utils/isOnline';
import AuthContext from '../Auth/AuthContext';

const JournalInputContextState: React.FC<{
  journal: Journal;
  entry?: Entry;
  children: ReactNode;
}> = ({ journal, entry, children }) => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<JournalInputState>(
    entry
      ? JournalInputState.fromEntry(journal, entry)
      : new JournalInputState(journal)
  );
  if (!authContext || !authContext.state.isAuthenticated) {
    return <></>;
  }

  const { user } = authContext.state;

  const executeQuestionReducer = (
    questionId: string,
    reducer: Reducer<QuestionInputState>
  ) => {
    const newState = state.applyQuestionReducer(questionId, reducer);
    setState(newState);
  };

  // Sets the isSubmitted flag
  // If isSubmitted === true, then the SurveySubmitted page will be shown
  const setIsSubmitted = (newValue: boolean) => {
    const newState = state.clone();
    newState.isSubmitted = newValue;
    setState(newState);
  };

  const setDidAttemptSubmit = (newValue: boolean) => {
    const newState = state.clone();
    newState.didAttemptSubmit = newValue;
    setState(newState);
  };

  const clear = () => {
    setState(state.clearedClone());
  };

  const submit = async () => {
    // user! because JournalInput should not be available if a user isn't logged in
    const entry: Entry = state.toEntry(user!);

    try {
      if (await isOnline()) {
        await ServerAdapter.postEntry(entry);
        await ServerAdapter.postStoredEntries();
      } else {
        console.log('Offline!');
        await LocalDb.storeEntry(entry);
      }
    } catch (err: any) {
      console.error(err);
      console.error(err.message);
    }

    // Clear the submission data and show the SurveySubmitted page
    setState(state.clearedClone());
  };

  const isDirty = () => {
    return state.isDirty();
  };

  const providedMethods = {
    executeQuestionReducer,
    setIsSubmitted,
    setDidAttemptSubmit,
    submit,
    clear,
    isDirty,
  };

  return (
    <JournalInputContext.Provider value={{ state, ...providedMethods }}>
      {children}
    </JournalInputContext.Provider>
  );
};

export default JournalInputContextState;
