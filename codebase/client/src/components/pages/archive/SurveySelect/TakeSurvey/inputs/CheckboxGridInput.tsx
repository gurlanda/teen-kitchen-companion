import React, { ChangeEvent, useContext } from 'react';
import SurveyInputContext from 'src/context/archive/SurveyInput/SurveyInputContext';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';

const CheckboxGridInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const surveyContext = useContext(SurveyInputContext);
  if (!surveyContext) {
    return <></>;
  }

  const { didAttemptSubmit } = surveyContext.state;
  const { id, text, rowQuestions, options, isRequired } = question;
  if (!rowQuestions || !options) {
    return <></>;
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const affectedOption = event.target.value;
    const newState = event.target.checked;
    const rowQuestionId = event.target.name;

    surveyContext.useQuestionReducer(
      id,
      QuestionInputState.createSetCbGridOption(
        rowQuestionId,
        affectedOption,
        newState
      )
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
      <div className="mb-10 pt-2">
        <h3 className="text-gray-800 font-bold mb-5">
          {text}
          <span className="text-red-600">{`${isRequired ? ' *' : ''}`}</span>
        </h3>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th></th>
                {options.map((opt) => {
                  return (
                    <th className="px-2 pb-3 pt-1 xs:pt-3" key={opt.id}>
                      {opt.text}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {rowQuestions.map((row, index) => {
                const isEven = index % 2 === 0 ? true : false;
                return (
                  <tr
                    className={`border-t-[1px] ${isEven ? 'bg-[#fafafa]' : ''}`}
                    key={row.id}
                  >
                    <th className="px-3 pb-3">
                      <p className="w-28 lg:w-44 text-left font-medium">
                        {row.text}
                      </p>
                    </th>
                    {row.options.map((opt) => {
                      return (
                        <td
                          className="px-2 py-3 text-center align-middle"
                          key={opt.id}
                        >
                          <input
                            type="checkbox"
                            name={row.id}
                            value={opt.id}
                            checked={opt.isSelected}
                            onChange={onChange}
                            className="w-6 h-6"
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${isDanger() ? 'block' : 'hidden'} text-red-600`}>
        <i className="fa-solid fa-circle-info inline-block mr-1"></i>
        This is a required question.
      </div>
    </div>
  );
};

export default CheckboxGridInput;
