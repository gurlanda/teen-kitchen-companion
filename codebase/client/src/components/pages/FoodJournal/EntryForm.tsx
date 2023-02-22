import React, { FormEvent, Fragment, useContext } from 'react';
import Form from 'src/components/layout/Form/Form';
import RouterLinkButton from 'src/components/layout/Form/RouterLinkButton';
import Button from 'src/components/layout/Form/Button';
import JournalInputContext from 'src/context/JournalInput/JournalInputContext';
import { stateToJournalInput } from './JournalInputs';
import dateString from './dateString';

const EntryForm: React.FC = () => {
  const journalContext = useContext(JournalInputContext);
  if (!journalContext) {
    return <></>;
  }

  const { inputStates, weekStart, weekEnd } = journalContext.state;

  return (
    <Form
      onSubmit={() => journalContext.submit()}
      classNames={
        'pb-9 min-h-screen px-0 sm:w-screen-4/5 sm:mx-auto sm:max-w-[650px] sm:pb-12'
      }
    >
      {/* A hidden & disabled submit button prevents a form's default behavior of submitting when a user presses the enter key. See https://stackoverflow.com/a/51507806 for more info. */}
      <button
        type="submit"
        disabled
        style={{ display: 'none' }}
        aria-hidden="true"
      ></button>

      {/* Journal header */}
      <div className="flex flex-col group shadow-md text-center px-3 mb-7 py-6 bg-white xs:px-5 xs:rounded-xl sm:border-[1px] sm:border-gray-100">
        <h1 className="text-center font-bold text-3xl mb-3 text-gray-800">
          My Journal
        </h1>
        {/* Description */}
        <p className="text-gray-600 px-1 text-lg">{`Journal entry for the week of ${dateString(
          weekStart
        )} to ${dateString(weekEnd)}`}</p>
        {/* <p className='text-red-600 mb-5 px-1'>
          {hasRequiredQuestions ? '* Required questions' : false}
        </p> */}
      </div>

      {/* Question groups */}
      {inputStates.map((state) => (
        <Fragment key={state.id}>
          {stateToJournalInput(state.type, state) ?? (
            <div>No InputState for this type.</div>
          )}
        </Fragment>
      ))}

      {/* Bottom button group */}
      <div className="flex justify-end mb-3 mr-3">
        <Button
          classNames="bg-cyan-600 hover:bg-cyan-700 text-white"
          type="submit"
          value="Submit"
        >
          Submit
        </Button>
        <RouterLinkButton
          classNames="bg-sky-100 hover:bg-sky-200 text-blue-600"
          to="/journal-select"
        >
          Cancel
        </RouterLinkButton>
      </div>
    </Form>
  );
};

export default EntryForm;
