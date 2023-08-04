import React, { useContext } from 'react';
import SurveyInputContext from 'src/context/archive/SurveyInput/SurveyInputContext';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';
import OptionGroup from 'src/components/layout/Form/OptionGroup';
import Radio from 'src/components/layout/Form/Radio';

const MultChoiceInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const surveyContext = useContext(SurveyInputContext);
  if (!surveyContext) {
    return <></>;
  }

  const { didAttemptSubmit } = surveyContext.state;
  const { id, text, options, isRequired } = question;
  if (!options) {
    return <></>;
  }

  const onChange = (selectedOpt: string) => {
    surveyContext.useQuestionReducer(
      id,
      QuestionInputState.createSetMultChoiceOption(selectedOpt)
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
      id={id}
    >
      <OptionGroup>
        <label className="block font-bold mb-1 text-gray-800">
          {text}
          <span className="text-red-600">{`${isRequired ? ' *' : ''}`}</span>
        </label>
        {options
          ? options.map((opt) => (
              <Radio
                key={opt.id}
                text={opt.text}
                id={opt.id}
                name={id}
                value={opt.id}
                state={opt.isSelected}
                onStateChange={onChange}
              />
            ))
          : null}
      </OptionGroup>
      <div className={`${isDanger() ? 'block' : 'hidden'} text-red-600`}>
        <i className="fa-solid fa-circle-info inline-block mr-1"></i>
        This is a required question.
      </div>
    </div>
  );
};

export default MultChoiceInput;
