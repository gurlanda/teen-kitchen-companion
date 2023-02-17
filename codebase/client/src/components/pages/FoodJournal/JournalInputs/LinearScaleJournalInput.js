import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import JournalContext from 'src/context/journal/journalContext';
import createId from 'src/utils/createId';

const LinearScaleJournalInput = ({ questionId }) => {
  const [currentOptIndex, setCurrentOptIndex] = useState(-1);
  const journalContext = useContext(JournalContext);
  const { questionIds, didAttemptSubmit } = journalContext;

  if (!questionIds.includes(questionId)) {
    throw new TypeError(
      'In ImgLinearScaleJournalInput: Passed-in questionId not found'
    );
  }

  const question = journalContext[questionId];
  // console.log(question);
  const { text, minText, maxText, linScaleOpts, isRequired, header } = question;

  const isDanger = () => false;

  const barWidth = (value, total) => {
    const ratio = 1.0 * (value / (total - 1));
    const percentage = Math.floor(ratio * 100);
    const style = { width: `${percentage}%` };
    return style;
  };

  const onChange = (e) => {
    console.log(`Value: ${e.target.value}`);
    console.log(`Index: ${e.target.dataset.index}`);
    setCurrentOptIndex(e.target.dataset.index);

    const selectedOptId = e.target.value;

    journalContext.applyQuestionReducer(
      question.createSetOption(selectedOptId),
      questionId
    );
  };

  return (
    <div
      className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
        isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
      } md:shadow-lg`}
      id={questionId}
    >
      <label className='block font-bold mb-1 text-gray-800'>
        {text}
        {/* <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span> */}
      </label>
      <div className='flex items-center space-x-4'>
        <label className='shrink' htmlFor={linScaleOpts[0].id}>
          {minText}
        </label>

        {/* Input */}
        <div className='flex justify-between relative w-96 max-w-full'>
          {/* Progress bar */}
          <div
            className={`bg-blue-500 absolute top-1/2 left-0 h-1 -translate-y-1/2 z-20 transition-all ease-linear`}
            style={barWidth(currentOptIndex, linScaleOpts.length)}
          ></div>
          <div className='bg-gray-200 absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 z-10 '></div>

          {/* Options */}
          {linScaleOpts.map((opt, index) => {
            const checked = currentOptIndex == index;
            // console.log(`Index ${index}. checked: ${checked}`);
            const isActive = index <= currentOptIndex;
            return (
              <label
                className='flex flex-col justify-center items-center'
                htmlFor={opt.id}
                key={opt.id}
              >
                <div>&nbsp;</div>
                <div
                  className={`z-30 bg-white border-4 rounded-[50%] h-8 w-8 flex justify-center items-center transition-all ease-in-out ${
                    isActive ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  id='progress'
                >
                  <input
                    className='h-4 w-4 self-center'
                    type='radio'
                    data-index={index}
                    name={questionId}
                    value={index}
                    checked={checked}
                    id={opt.id}
                    onChange={onChange}
                  />
                </div>
                <span>{opt.value}</span>
              </label>
            );
          })}
        </div>

        <label
          className='shrink'
          htmlFor={linScaleOpts[linScaleOpts.length - 1].id}
        >
          {maxText}
        </label>
      </div>
    </div>
  );
};

LinearScaleJournalInput.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default LinearScaleJournalInput;
