import React, { useContext } from 'react';
import OptionGroup from 'src/components/layout/Form/OptionGroup';
import Checkbox from 'src/components/layout/Form/Checkbox';
import SurveyInputContext from 'src/context/archive/SurveyInput/SurveyInputContext';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';

const CheckboxInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const surveyContext = useContext(SurveyInputContext);
  if (!surveyContext) {
    return <></>;
  }

  const { didAttemptSubmit } = surveyContext.state;
  const { id, text, options, isRequired } = question;

  const onChange = (affectedOption: string, newState: boolean) => {
    surveyContext.useQuestionReducer(
      id,
      QuestionInputState.createSetCheckboxOption(affectedOption, newState)
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
          ? options.map(({ text, isSelected, id }) => (
              <Checkbox
                key={id}
                text={text}
                name={id}
                value={id}
                id={id}
                state={isSelected}
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

export default CheckboxInput;
