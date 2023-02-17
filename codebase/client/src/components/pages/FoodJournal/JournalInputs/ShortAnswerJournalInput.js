import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'src/components/layout/Form/TextInput';
import JournalContext from 'src/context/journal/journalContext';

const ShortAnswerJournalInput = ({ questionId }) => {
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit, applyQuestionReducer } =
    journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError(
      'In ShortAnswerJournalInput: Passed-in questionId not found'
    );
  }

  const { isRequired, text, questionHeader, response, createSetResponse } =
    journalContext[questionId];

  const onChange = (e) => {
    const newResponse = e.target.value;
    console.log(`New response: ${e.target.value}`);
    applyQuestionReducer(createSetResponse(newResponse), questionId);
  };

  const onBlur = () => {};

  const isDanger = () => false;

  return (
    <div
      className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
        isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
      } md:shadow-lg`}
      id={questionId}
    >
      <label className='block font-bold mb-1 text-gray-800'>
        {text}
        <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span>
      </label>
      <TextInput
        value={response ?? ''}
        placeholder='Enter your answer here'
        onStateChange={onChange}
        onBlur={onBlur}
      />
      <div className={`${isDanger() ? 'block' : 'hidden'} text-red-600`}>
        <i className='fa-solid fa-circle-info inline-block mr-1'></i>
        This is a required question.
      </div>
    </div>
  );
};

ShortAnswerJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default ShortAnswerJournalInput;
