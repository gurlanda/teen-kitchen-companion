import React, { useRef, useEffect, useContext } from 'react';
import autosize from 'autosize';

import SurveyAdminContext from '../../../../context/survey-admin/surveyAdminContext';

const DynamicTextArea = ({
  classNames,
  placeholder,
  value,
  dataId,
  onChange,
}) => {
  const textArea = useRef(null); // This is needed so that autosize can hook onto the textarea
  const surveyAdminContext = useContext(SurveyAdminContext);

  useEffect(() => {
    // Defining the following const allows us to access the textarea node during cleanup
    const textAreaNode = textArea.current;
    autosize(textAreaNode);

    return () => {
      autosize.destroy(textAreaNode);
    };
  }, []);

  const selectAllText = (e) => {
    e.target.select();
  };

  return (
    <textarea
      type='text'
      rows='1'
      className={`px-1 py-1 border-b-[1px] border-b-gray-300 focus:outline-none focus:border-b-cyan-500 focus:border-b-2 ${classNames}`}
      placeholder={placeholder}
      data-id={dataId ? dataId : undefined}
      value={value}
      onChange={onChange}
      onFocus={selectAllText}
      autoFocus={surveyAdminContext.autoFocusIsActive}
      ref={textArea}
    />
  );
};

export default DynamicTextArea;
