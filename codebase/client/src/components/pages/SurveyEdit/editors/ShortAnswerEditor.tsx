import React from 'react';
import QuestionEditState from 'src/model/EditState/QuestionEditState';

const ShortAnswerEditor: React.FC<{ question: QuestionEditState }> = ({
  question,
}) => {
  return (
    <input
      type="text"
      className="px-1 py-1 mb-5 grow border-b-[1px] border-b-gray-300 text-gray-400 disabled:bg-inherit"
      disabled
      placeholder="Short answer text"
    ></input>
  );
};

export default ShortAnswerEditor;
