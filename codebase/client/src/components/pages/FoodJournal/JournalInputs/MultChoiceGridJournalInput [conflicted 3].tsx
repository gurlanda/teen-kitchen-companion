import React, { useContext } from 'react';
import JournalInputContext from 'src/context/JournalInput/JournalInputContext';
import QuestionInputState from 'src/model/InputState/QuestionInputState';

const MultChoiceGridJournalInput: React.FC<{
  question: QuestionInputState;
}> = ({ question }) => {
  const journalContext = useContext(JournalInputContext);
  if (!journalContext) {
    return <></>;
  }

  const { id, text, isRequired, options, rowQuestions } = question;
  if (!options || !rowQuestions) {
    return <></>;
  }

  const isDanger = () => {
    return (
      isRequired &&
      !question.isAnswered() &&
      journalContext.state.didAttemptSubmit
    );
  };
  const onChange = (selectedRow: string, selectedOpt: string) => {
    journalContext.executeQuestionReducer(
      id,
      QuestionInputState.createSetMcGridOption(selectedRow, selectedOpt)
    );
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
                            type="radio"
                            name={row.id}
                            value={opt.id}
                            checked={opt.isSelected}
                            onChange={() => onChange(row.id, opt.id)}
                            className="w-7 h-7"
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

export default MultChoiceGridJournalInput;
