import React, { useContext, useState } from 'react';

import SurveyInputContext from 'src/context/archive/SurveyInput/SurveyInputContext';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';
import Number from 'src/components/layout/Form/NumberInput';

const NumberInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const [didAttemptAnswer, setDidAttemptAnswer] = useState(false);
  const surveyContext = useContext(SurveyInputContext);
  if (!surveyContext) {
    return <></>;
  }
  const { didAttemptSubmit } = surveyContext.state;
  const { id, text, isRequired, numResponse } = question;
  const { min, max, step } = question.question;

  const onChange = (newValue: number) => {
    surveyContext.useQuestionReducer(
      id,
      QuestionInputState.createSetNumResponse(newValue)
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
      id={id}
    >
      <label className="block font-bold mb-1 text-gray-800">
        {text}
        <span className="text-red-600">{`${isRequired ? ' *' : ''}`}</span>
      </label>
      <Number
        min={min}
        max={max}
        step={step}
        value={numResponse}
        placeholder="Enter your answer here"
        onStateChange={onChange}
        onBlur={onBlur}
      />
      <div className={`${isDanger() ? 'block' : 'hidden'} text-red-600`}>
        <i className="fa-solid fa-circle-info inline-block mr-1"></i>
        This is a required question.
      </div>
    </div>
  );
};

export default NumberInput;
