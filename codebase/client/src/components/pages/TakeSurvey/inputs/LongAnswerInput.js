import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import TextAreaInput from '../../../layout/Form/TextAreaInput';

import SurveyContext from '../../../../context/survey/surveyContext';

const LongAnswerInput = ({ questionId }) => {
  const [didAttemptAnswer, setDidAttemptAnswer] = useState(false);

  const surveyContext = useContext(SurveyContext);
  const { didAttemptSubmit } = surveyContext;
  const question = surveyContext[questionId];
  const { text, numLines, isRequired } = question;

  const onChange = (event) => {
    const response = event.target.value;
    surveyContext.applyQuestionReducer(
      question.createSetResponse(response),
      questionId
    );
  };

  const onBlur = () => {
    if (isRequired && !question.isAnswered()) {
      setDidAttemptAnswer(true);
    } else {
      setDidAttemptAnswer(false);
    }
  };

  // Returns true when we want this component to be danger-styled.
  // This is true when this question is required and either a submission or answer was attempted, but the question wasn't answered.
  const isDanger = () => {
    return (
      question.isRequired &&
      !question.isAnswered() &&
      (didAttemptSubmit || didAttemptAnswer)
    );
  };

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
        value={surveyContext[questionId].response}
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

LongAnswerInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default LongAnswerInput;
