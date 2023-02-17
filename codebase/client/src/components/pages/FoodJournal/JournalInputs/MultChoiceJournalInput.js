import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OptionGroup from 'src/components/layout/Form/OptionGroup';
import Radio from 'src/components/layout/Form/Radio';
import JournalContext from 'src/context/journal/journalContext';

const MultChoiceJournalInput = ({ questionId }) => {
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError(
      'In MultChoiceJournalInput: Passed-in questionId not found'
    );
  }

  const question = journalContext[questionId];
  console.log(question);
  const { text, isRequired, header, options } = question;

  const isDanger = () => false;

  const onChange = (event) => {
    const selectedOptId = event.target.value;

    console.log(`ID: ${selectedOptId}`);

    journalContext.applyQuestionReducer(
      question.createSetOption(selectedOptId),
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
          {/* <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span> */}
        </label>
        {options
          ? options.map((opt) => (
              <Radio
                key={opt.id}
                text={opt.text}
                id={opt.id}
                name={questionId}
                value={opt.id}
                checked={opt.isSelected}
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

MultChoiceJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default MultChoiceJournalInput;
