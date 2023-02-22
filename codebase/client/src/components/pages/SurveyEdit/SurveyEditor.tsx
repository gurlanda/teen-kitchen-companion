import React, { useContext } from 'react';
import SingleCheckboxInput from 'src/components/layout/Form/SingleCheckboxInput';
import SurveyAdminContext from 'src/context/SurveyAdmin/SurveyAdminContext';
import SurveyEditState from 'src/model/EditState/SurveyEditState';
import DynamicTextArea from './layout/DynamicTextArea';
import QuestionEditor from './QuestionEditor';

const SurveyEditor: React.FC<{}> = () => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  if (!surveyAdminContext) {
    return <></>;
  }

  const { executeStateReducer, updateSurvey, deleteSurvey } =
    surveyAdminContext;
  const { id, title, description, questions, isActive } =
    surveyAdminContext.state;

  // Add a listener for the beforeunload event. If the user wants to navigate away from the page and has unsaved changes, the listener will ask the user to confirm losing the changes before navigating away.

  // useEffect(() => {
  //   const confirmUnload = (e) => {
  // const dirty = !isEqual(
  //   omit(state, ['autoFocusIsActive']),
  //   omit(initialState, ['autoFocusIsActive'])
  // );

  //     console.log(state);
  //     console.log(initialState);
  //     debugger;

  //     if (dirty) {
  //       console.log('Dirty!');
  //       let confirmationMessage =
  //         'It looks like there is unsubmitted info.' +
  //         'If you leave before submitting, your info will be lost. Confirm leaving?';

  //       (e || window.event).returnValue = confirmationMessage; // Gecko + IE
  //       return confirmationMessage; // All other browsers
  //     } else {
  //       test();
  //       return undefined;
  //     }
  //   };

  //   window.addEventListener('beforeunload', confirmUnload);

  //   return () => window.removeEventListener('beforeunload', confirmUnload);
  // }, []);

  const changeTitle = (newTitle: string, id: string) => {
    executeStateReducer(SurveyEditState.createSetTitle(newTitle));
  };

  const changeDescription = (newDescription: string, id: string) => {
    executeStateReducer(SurveyEditState.createSetDescription(newDescription));
  };

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
        {/* Survey editing header */}
        <div className="flex flex-col group shadow-md px-3 mb-7 pt-4 bg-white xs:px-5 sm:rounded-b-lg sm:rounded-t-xl sm:border-[1px] sm:border-gray-100">
          <h1 className="text-center font-bold text-2xl text-gray-800">
            Editing: {title ? title : 'Untitled survey'}
          </h1>
          <h1 className="text-center text-gray-600 mb-5 px-1">
            {isActive
              ? 'Survey is taking responses'
              : 'Survey is currently not taking responses'}
          </h1>
          <DynamicTextArea
            id={id}
            classNames="mb-3 font-bold text-xl"
            placeholder="Enter survey title..."
            value={title}
            onChange={changeTitle}
          />
          <DynamicTextArea
            id={id}
            classNames="mb-5"
            placeholder="Enter survey description..."
            value={description ? description : ''}
            onChange={changeDescription}
          />
          {/* <div className='flex justify-end'>
            <Button onClick={addQuestion} classNames='border-gray-400'>
              Add question
            </Button>
          </div> */}
          <SingleCheckboxInput
            label="Survey active?"
            id="active"
            isOnEnd={true}
            onStateChange={() => {
              executeStateReducer(SurveyEditState.createToggleIsActive());
            }}
            value={isActive}
          />
        </div>

        {questions.map((question) => (
          <QuestionEditor key={question.id} question={question} />
        ))}
      </form>
      <div className="fixed flex bottom-0 z-10 w-full h-14 bg-white text-gray-700 sm:h-14 sm:text-xl md:h-16 md:w-[700px] md:left-1/2 md:ml-[-350px] md:shadow-lg">
        <button
          className="grow basis-0 h-full border-t-[1px] border-x-[1px] border-gray-300 md:rounded-tl-lg px-2 hover:bg-slate-50"
          onClick={() => {
            executeStateReducer(SurveyEditState.createAddQuestion());
          }}
        >
          Add new question
        </button>
        <button
          className="grow basis-0 h-full border-t-[1px] border-r-[1px] border-gray-300 px-2 hover:bg-slate-50"
          onClick={updateSurvey}
        >
          Save changes
        </button>
        <button
          className="grow basis-0 h-full border-t-[1px] border-r-[1px] border-gray-300 md:rounded-tr-lg px-2 hover:bg-slate-50"
          onClick={deleteSurvey}
        >
          Delete survey
        </button>
      </div>
    </div>
  );
};

export default SurveyEditor;
