import React, { useContext, useState } from 'react';
import TextInput, {
  StateChangeHandler,
} from 'src/components/layout/Form/TextInput';
import JournalInputContext from 'src/context/JournalInput/JournalInputContext';
import QuestionInputState from 'src/model/InputState/QuestionInputState';

const ShortAnswerJournalInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const [didAttemptAnswer, setDidAttemptAnswer] = useState<boolean>(false);
  const journalContext = useContext(JournalInputContext);
  if (!journalContext) {
    return <></>;
  }

  const { state } = journalContext;
  const { id, text, isRequired } = question;

  const onChange: StateChangeHandler = (newVal: string) => {
    journalContext.state.applyQuestionReducer(
      id,
      QuestionInputState.createSetOpenResponse(newVal)
    );
  };

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
      <TextInput
        id={id}
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

export default ShortAnswerJournalInput;
