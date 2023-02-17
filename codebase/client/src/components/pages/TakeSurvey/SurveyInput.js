import React, { Fragment, useContext, useEffect } from 'react';
import { Prompt } from 'react-router-dom/cjs/react-router-dom.min';

import Form from '../../layout/Form/Form';
import SurveySubmitted from './SurveySubmitted';
import RouterLinkButton from '../../layout/Form/RouterLinkButton';
import Button from '../../layout/Form/Button';

import { questionStateToInput } from './input-util';
import confirmUnloadEffect from '../../../utils/confirmUnloadEffect';
import SurveyContext from '../../../context/survey/surveyContext';

const SurveyInput = () => {
  const surveyContext = useContext(SurveyContext);

  // Get array of questionIds
  const {
    title,
    description,
    questionIds,
    hasRequiredQuestions,
    isSubmitted,
    isDirty,
  } = surveyContext;

  // Add a listener for the beforeunload event. If the user wants to navigate away from the page and has unsaved changes, the listener will ask the user to confirm losing the changes before navigating away.
  useEffect(() => {
    const confirmUnload = (e) => {
      let confirmationMessage =
        'It looks like there is unsubmitted info.' +
        'If you leave before submitting, your info will be lost. Confirm leaving?';

      (e || window.event).returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage; // All other browsers
    };

    window.addEventListener('beforeunload', confirmUnload);

    return () => window.removeEventListener('beforeunload', confirmUnload);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    if (hasRequiredQuestions) {
      let isReadyForSubmit = true;
      let firstDangerQuestion = null; // This will point to the first QuestionInput that requires a response but is still unanswered

      // Check if all required questions have been answered
      for (const qid of questionIds) {
        let questionState = surveyContext[qid];
        if (questionState.isRequired && !questionState.isAnswered()) {
          // Set a danger state to that question
          surveyContext.applyQuestionReducer(
            questionState.createSetDanger(true),
            qid
          );

          if (!firstDangerQuestion) {
            firstDangerQuestion = qid;
          }

          isReadyForSubmit = false;
        }
      }

      if (!isReadyForSubmit) {
        // Scroll to first required question that is unanswered
        document.getElementById(firstDangerQuestion).scrollIntoView();
        return;
      }
    }

    surveyContext.submit();
  };

  return (
    <div className='mx-auto pt-1 w-full bg-slate-50'>
      {isSubmitted ? (
        <SurveySubmitted />
      ) : (
        <Form
          onSubmit={onSubmit}
          classNames={
            'pb-9 min-h-screen px-0 sm:w-screen-4/5 sm:mx-auto sm:max-w-[650px] sm:pb-12'
          }
        >
          <Prompt
            when={isDirty()}
            message='It looks like there are unsubmitted changes. Are you sure you want to leave?'
          />

          {/* A hidden & disabled submit button prevents a form's default behavior of submitting when a user presses the enter key. See https://stackoverflow.com/a/51507806 for more info. */}
          <button
            type='submit'
            disabled
            style={{ display: 'none' }}
            aria-hidden='true'
          ></button>

          {/* Survey header */}
          <div className='flex flex-col group shadow-md px-3 mb-7 pt-6 bg-white xs:px-5 xs:rounded-xl sm:border-[1px] sm:border-gray-100'>
            <h1 className='text-center font-bold text-3xl mb-3 text-gray-800'>
              {title}
            </h1>
            <p className='text-gray-600 px-1 text-lg'>{description}</p>
            <p className='text-red-600 mb-5 px-1'>
              {hasRequiredQuestions ? '* Required questions' : false}
            </p>
          </div>

          {/* Question groups */}
          {questionIds.map((questionId) => (
            <Fragment key={questionId}>
              {questionStateToInput(surveyContext[questionId].type, questionId)}
            </Fragment>
          ))}

          {/* Bottom button group */}
          <div className='flex justify-end mb-3 mr-3'>
            <Button
              classNames='bg-cyan-600 hover:bg-cyan-700 text-white'
              type='submit'
              value='Submit'
            >
              Submit
            </Button>
            <RouterLinkButton
              classNames='bg-sky-100 hover:bg-sky-200 text-blue-600'
              to='/survey'
            >
              Cancel
            </RouterLinkButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default SurveyInput;
