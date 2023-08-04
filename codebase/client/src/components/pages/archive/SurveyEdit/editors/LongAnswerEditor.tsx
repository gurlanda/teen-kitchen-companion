import React from 'react';
import QuestionEditState from 'src/model/archive/EditState/QuestionEditState';

const LongAnswerEditor: React.FC<{ question: QuestionEditState }> = ({
  question,
}) => {
  return (
    <textarea
      className="px-4 py-3 mb-5 grow rounded border-[1px] border-gray-300 text-gray-400 disabled:bg-inherit"
      rows={2}
      value={'Paragraph text'}
      disabled
    ></textarea>
  );
};

export default LongAnswerEditor;
