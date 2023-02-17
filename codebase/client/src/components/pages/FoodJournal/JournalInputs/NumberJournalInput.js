import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Number from 'src/components/layout/Form/NumberInput';
import JournalContext from 'src/context/journal/journalContext';

const NumberJournalInput = ({ questionId }) => {
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError(
      'In NumberJournalInput: Passed-in questionId not found'
    );
  }

  const question = journalContext[questionId];
  const { text, min, max, step, isRequired } = question;

  const onBlur = () => {};
  const isDanger = () => false;
  const onChange = (event) => {
    let value = event.target.value;
    console.log(`New response: ${event.target.value}`);
    journalContext.applyQuestionReducer(
      question.createSetValue(value),
      questionId
    );
  };

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
      <Number
        min={min ? min.toString() : undefined}
        max={max ? max.toString() : undefined}
        step={step ? step.toString() : undefined}
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

NumberJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default NumberJournalInput;
