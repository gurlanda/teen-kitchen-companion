import React, { useContext } from 'react';
import JTemplateEditContext from 'src/context/JournalTemplateEdit/JTemplateEditContext';
import JTemplateEditState from 'src/model/EditState/JTemplateEditState';
import QuestionEditor from '../SurveyEdit/QuestionEditor';

const JTemplateEditor: React.FC<{}> = () => {
  const jtemplateEditContext = useContext(JTemplateEditContext);
  if (!jtemplateEditContext) {
    return <></>;
  }

  const { executeStateReducer, updateTemplate } = jtemplateEditContext;
  const { questions } = jtemplateEditContext.state;

  return (
    <div className="w-full tk-acumin-pro bg-slate-50 pt-5">
      <form
        action=""
        className="pb-9 bg-slate-50 min-h-screen sm:w-screen-4/5 sm:mx-auto sm:max-w-[560px] sm:pb-12"
      >
        {/* <Prompt
          when={isDirty()}
          message='It looks like there are unsubmitted changes. Are you sure you want to leave?'
        /> */}
        <div className="flex flex-col group shadow-md px-3 mb-7 pt-4 bg-white xs:px-5 sm:rounded-b-lg sm:rounded-t-xl sm:border-[1px] sm:border-gray-100">
          <h1 className="text-center font-bold text-2xl text-gray-800">
            Editing Journal Template
          </h1>
        </div>

        {questions.map((question) => (
          <QuestionEditor key={question.id} question={question} />
        ))}
      </form>
      <div className="fixed flex bottom-0 z-10 w-full h-14 bg-white text-gray-700 sm:h-14 sm:text-xl md:h-16 md:w-[700px] md:left-1/2 md:ml-[-350px] md:shadow-lg">
        <button
          className="grow basis-0 h-full border-t-[1px] border-x-[1px] border-gray-300 md:rounded-tl-lg px-2 hover:bg-slate-50"
          onClick={() => {
            executeStateReducer(JTemplateEditState.createAddQuestion());
          }}
        >
          Add new question
        </button>
        <button
          className="grow basis-0 h-full border-t-[1px] border-r-[1px] border-gray-300 px-2 hover:bg-slate-50"
          onClick={() => updateTemplate()}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default JTemplateEditor;
