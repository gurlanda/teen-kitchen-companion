import React, { useContext, useState } from 'react';
import TextAreaInput, {
  StateChangeHandler,
} from 'src/components/layout/Form/TextAreaInput';
import JournalInputContext from 'src/context/archive/JournalInput/JournalInputContext';
import QuestionInputState from 'src/model/archive/InputState/QuestionInputState';

const LongAnswerJournalInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const [didAttemptAnswer, setDidAttemptAnswer] = useState<boolean>(false);
  const journalContext = useContext(JournalInputContext);
  if (!journalContext) {
    return <></>;
  }

  const { state } = journalContext;
  const { id, text, isRequired } = question;
  const { numLines } = question.question;

  const isDanger = () => {
    return (
      isRequired &&
      !question.isAnswered() &&
      (state.didAttemptSubmit || didAttemptAnswer)
    );
  };

  const onBlur = () => {
    if (isRequired && !question.isAnswered()) {
      setDidAttemptAnswer(true);
    } else {
      setDidAttemptAnswer(false);
    }
  };

  const onChange: StateChangeHandler = (newVal: string) => {
    journalContext.executeQuestionReducer(
      id,
      QuestionInputState.createSetOpenResponse(newVal)
    );
  };

  return (
    <div
      className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
        isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
      } md:shadow-lg`}
      id={id}
    >
      <label className="block font-bold mb-3 text-gray-800">
        {text}
        <span className="text-red-600">{`${isRequired ? ' *' : ''}`}</span>
      </label>
      <TextAreaInput
        rows={numLines ?? 5}
        value={question.openResponse ?? ''}
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

export default LongAnswerJournalInput;
