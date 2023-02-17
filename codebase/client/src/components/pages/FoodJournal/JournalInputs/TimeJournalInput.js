import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import JournalContext from 'src/context/journal/journalContext';

const TimeJournalInput = ({ questionId }) => {
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError('In TimeJournalInput: Passed-in questionId not found');
  }

  const question = journalContext[questionId];
  const { text, isRequired, header } = question;

  const isDanger = () => false;
  const onChange = (e) => {
    console.log('Value: ');
    console.log(e.target.value);
    const date = new Date(e.target.value);
    console.log(date);
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
        {/* <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span> */}
      </label>

      <input
        type='time'
        className='px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400'
        name=''
        id=''
        onChange={onChange}
      />
    </div>
  );
};

TimeJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default TimeJournalInput;
