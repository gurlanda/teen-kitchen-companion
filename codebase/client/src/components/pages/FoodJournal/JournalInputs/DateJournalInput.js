import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import JournalContext from 'src/context/journal/journalContext';

const dateToString = (date) => {
  if (!(date instanceof Date)) {
    throw new TypeError(
      'In DateJournalInput > dateToString(): The given input is not of type Date'
    );
  }

  console.log(date);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // The output of getMonth() is in the range 0-11, so we add one to get the usual month number
  const day = date.getDate();

  const getTwoDigitString = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const monthString = getTwoDigitString(month);
  const dateString = getTwoDigitString(day);

  return `${year}-${monthString}-${dateString}`;
};

const DateJournalInput = ({ questionId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;
  const state = journalContext[questionId];

  if (!questionIds.includes(questionId)) {
    throw new TypeError('In DateJournalInput: Passed-in questionId not found');
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
        type='date'
        className='px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400'
        name=''
        id=''
        value={dateToString(question.value)}
        onChange={onChange}
      />
    </div>
  );
};

DateJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default DateJournalInput;
