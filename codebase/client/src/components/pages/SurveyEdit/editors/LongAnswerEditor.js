import React from 'react';

const LongAnswerEditor = ({ index }) => {
  return (
    <textarea
      className='px-4 py-3 mb-5 grow rounded border-[1px] border-gray-300 text-gray-400 disabled:bg-inherit'
      rows={2}
      value={'Paragraph text'}
      disabled
    ></textarea>
  );
};

export default LongAnswerEditor;
