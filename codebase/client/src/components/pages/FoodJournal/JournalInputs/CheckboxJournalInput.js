import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OptionGroup from 'src/components/layout/Form/OptionGroup';
import Checkbox from 'src/components/layout/Form/Checkbox';
import JournalContext from 'src/context/journal/journalContext';

const CheckboxJournalInput = ({ questionId }) => {
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError(
      'In CheckboxJournalInput: Passed-in questionId not found'
    );
  }

  const question = journalContext[questionId];
  const { text, isRequired, header, options } = question;

  const isDanger = () => false;
  const onChange = (event) => {
    const affectedOption = event.target.value;
    const newState = event.target.checked;

    console.log(
      `Option: ${event.target.text}. ID: ${affectedOption}. New state: ${newState}`
    );

    journalContext.applyQuestionReducer(
      question.createSetOption(affectedOption, newState),
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
      <OptionGroup>
        <label className='block font-bold mb-1 text-gray-800'>
          {text}
          <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span>
        </label>

        {options
          ? options.map(({ text, isSelected, id }) => (
              <Checkbox
                key={id}
                text={text}
                name={questionId}
                value={id}
                id={id}
                checked={isSelected}
                onStateChange={onChange}
              />
            ))
          : null}
      </OptionGroup>
      <div className={`${isDanger() ? 'block' : 'hidden'} text-red-600`}>
        <i className='fa-solid fa-circle-info inline-block mr-1'></i>
        This is a required question.
      </div>
    </div>
  );
};

CheckboxJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default CheckboxJournalInput;
