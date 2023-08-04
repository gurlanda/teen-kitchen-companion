import React, { useContext } from 'react';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';
import JournalInputContext from 'src/context/archive/JournalInput/JournalInputContext';

/**
 * Converts a date to a string that can be inputted into the value parameter of an HTML date input. This format is YYYY-MM-DD, where MM is a 1-indexed month
 * @param {Date} date The input date.
 * @returns {string}
 */
const dateToInputValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // The output of getMonth() is in the range 0-11, so we add one to get the usual month number
  const day = date.getDate();

  const getTwoDigitString = (num: number) => {
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

const DateTimeJournalInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const journalContext = useContext(JournalInputContext);
  if (!journalContext) {
    return <></>;
  }

  const { state } = journalContext;
  const { id, text, isRequired } = question;

  const isDanger = () => {
    return isRequired && !question.isAnswered() && state.didAttemptSubmit;
  };

  const onChange = (date: Date) => {
    console.log('Value: ');
    console.log(date);
    journalContext.executeQuestionReducer(
      id,
      QuestionInputState.createSetValueManual(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
  };

  return (
    <div
      className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
        isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
      } md:shadow-lg`}
      id={id}
    >
      <label className="block font-bold mb-1 text-gray-800">
        {text}
        {/* <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span> */}
      </label>

      <input
        type="datetime-local"
        className="px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400"
        name=""
        id=""
        onChange={(e) => onChange(new Date(e.target.value))}
      />
    </div>
  );
};

export default DateTimeJournalInput;
