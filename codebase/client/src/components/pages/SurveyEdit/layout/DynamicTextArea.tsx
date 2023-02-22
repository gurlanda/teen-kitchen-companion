import React, { useRef, useEffect, useContext } from 'react';
import autosize from 'autosize';
import SurveyAdminContext from 'src/context/SurveyAdmin/SurveyAdminContext';

export type ChangeHandler = { (newText: string, id: string): void };
const DynamicTextArea: React.FC<{
  classNames: string;
  placeholder: string;
  value: string;
  id: string;
  onChange: ChangeHandler;
}> = ({ classNames, placeholder, value, id, onChange }) => {
  const textArea = useRef<HTMLTextAreaElement>(null); // This is needed so that autosize can hook onto the textarea
  const surveyAdminContext = useContext(SurveyAdminContext);
  useEffect(() => {
    // Defining the following const allows us to access the textarea node during cleanup
    const textAreaNode = textArea.current;
    if (textAreaNode) {
      autosize(textAreaNode);
    }

    return () => {
      if (textAreaNode) {
        autosize.destroy(textAreaNode);
      }
    };
  }, []);

  if (!surveyAdminContext) {
    return <></>;
  }

  const selectAllText = (target: HTMLTextAreaElement) => {
    target.select();
  };

  return (
    <textarea
      rows={1}
      className={`px-1 py-1 border-b-[1px] border-b-gray-300 focus:outline-none focus:border-b-cyan-500 focus:border-b-2 ${classNames}`}
      placeholder={placeholder}
      data-id={id ? id : undefined}
      value={value}
      onChange={(e) => onChange(e.target.value, id)}
      onFocus={(e) => selectAllText(e.target)}
      autoFocus={surveyAdminContext.state.autoFocusIsActive}
      ref={textArea}
    />
  );
};

export default DynamicTextArea;
