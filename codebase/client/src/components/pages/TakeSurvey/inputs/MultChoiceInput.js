import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import OptionGroup from '../../../layout/Form/OptionGroup';
import Radio from '../../../layout/Form/Radio';

import SurveyContext from '../../../../context/survey/surveyContext';

const MultChoiceInput = ({ questionId }) => {
  const surveyContext = useContext(SurveyContext);
  const { didAttemptSubmit } = surveyContext;
  const question = surveyContext[questionId];
  const { text, options, isRequired } = question;

  const onChange = (event) => {
    const selectedOptId = event.target.value;
    surveyContext.applyQuestionReducer(
      question.createSetOption(selectedOptId),
      questionId
    );
  };

  // Returns true when we want this component to be danger-styled.
  // This is true when this question is required and a submission was attempted, but the question wasn't answered.
  const isDanger = () => {
    return question.isRequired && !question.isAnswered() && didAttemptSubmit;
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

MultChoiceInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default MultChoiceInput;
