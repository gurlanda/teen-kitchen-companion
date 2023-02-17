import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import OptionGroup from '../../../layout/Form/OptionGroup';
import Checkbox from '../../../layout/Form/Checkbox';

import SurveyContext from '../../../../context/survey/surveyContext';

const CheckboxInput = ({ questionId }) => {
  const surveyContext = useContext(SurveyContext);
  const question = surveyContext[questionId];
  const { didAttemptSubmit } = surveyContext;
  const { text, options, isRequired } = question;

  const onChange = (event) => {
    const affectedOption = event.target.value;
    const newState = event.target.checked;

    surveyContext.applyQuestionReducer(
      question.createSetOption(affectedOption, newState),
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

CheckboxInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default CheckboxInput;
