import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from 'src/components/layout/Form/TextAreaInput';
import JournalContext from 'src/context/journal/journalContext';

const LongAnswerJournalInput = ({ questionId }) => {
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError(
      'In LongAnswerJournalInput: Passed-in questionId not found'
    );
  }

  const question = journalContext[questionId];
  const { text, isRequired, numLines } = question;

  const isDanger = () => false;
  const onBlur = () => {};
  const onChange = () => {};

  return (
    <div
      className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
        isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
      } md:shadow-lg`}
      id={questionId}
    >
      <label className='block font-bold mb-3 text-gray-800'>
        {text}
        <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span>
      </label>
      <TextAreaInput
        rows={numLines ? numLines.toString() : undefined}
        value={question.response}
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

LongAnswerJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default LongAnswerJournalInput;
