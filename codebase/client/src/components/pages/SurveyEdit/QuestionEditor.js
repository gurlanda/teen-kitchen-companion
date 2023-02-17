import React, { useState, useContext } from 'react';

import DynamicTextArea from './layout/DynamicTextArea';
import SingleCheckboxInput from '../../layout/Form/SingleCheckboxInput';
import Dropdown, {
  DropdownItem,
  DropdownDivider,
} from '../../layout/Form/Dropdown';

import * as Qtypes from '../../../model/survey/questionTypes';
import SurveyAdminContext from '../../../context/survey-admin/surveyAdminContext';

import ShortAnswerEditor from './editors/ShortAnswerEditor';
import LongAnswerEditor from './editors/LongAnswerEditor';
import MultChoiceEditor from './editors/MultChoiceEditor';
import CheckboxEditor from './editors/CheckboxEditor';
import CheckboxGridEditor from './editors/CheckboxGridEditor';
import MultChoiceGridEditor from './editors/MultChoiceGridEditor';
import NumberEditor from './editors/NumberEditor';

const QuestionEditor = ({ index }) => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  const {
    applyQuestionReducer,
    moveQuestionUp,
    moveQuestionDown,
    deleteQuestion,
  } = surveyAdminContext;
  const question = surveyAdminContext.questions[index];
  const dropdownItems = [
    new DropdownItem('Short answer', Qtypes.SHORT_ANSWER),
    new DropdownItem('Paragraph', Qtypes.LONG_ANSWER),
    new DropdownDivider(),
    new DropdownItem('Multiple choice', Qtypes.MULT_CHOICE),
    new DropdownItem('Checkbox', Qtypes.CHECKBOX),
    new DropdownItem('Number', Qtypes.NUMBER),
    new DropdownDivider(),
    new DropdownItem('Checkbox grid', Qtypes.CHECKBOX_GRID),
    new DropdownItem('Multiple choice grid', Qtypes.MULT_CHOICE_GRID),
  ];

  let defaultDropdownItem;
  switch (question.type) {
    case Qtypes.CHECKBOX:
      defaultDropdownItem = dropdownItems[4];
      break;
    case Qtypes.MULT_CHOICE:
      defaultDropdownItem = dropdownItems[3];
      break;
    case Qtypes.NUMBER:
      defaultDropdownItem = dropdownItems[5];
      break;
    case Qtypes.SHORT_ANSWER:
      defaultDropdownItem = dropdownItems[0];
      break;
    case Qtypes.LONG_ANSWER:
      defaultDropdownItem = dropdownItems[1];
      break;
    case Qtypes.MULT_CHOICE_GRID:
      defaultDropdownItem = dropdownItems[8];
      break;
    case Qtypes.CHECKBOX_GRID:
      defaultDropdownItem = dropdownItems[7];
      break;
    default:
      throw TypeError(
        'In QuestionEditor.js > QuestionEditor > switch (question.type): Either the passed argument does not have an associated DropdownItem or is not a valid Qtype'
      );
  }

  const [selectedQtype, setSelectedQtype] = useState(question.type);

  const editor = () => {
    switch (selectedQtype) {
      case Qtypes.SHORT_ANSWER:
        return <ShortAnswerEditor index={index} />;
      case Qtypes.LONG_ANSWER:
        return <LongAnswerEditor index={index} />;
      case Qtypes.MULT_CHOICE:
        return <MultChoiceEditor index={index} />;
      case Qtypes.CHECKBOX:
        return <CheckboxEditor index={index} />;
      case Qtypes.CHECKBOX_GRID:
        return <CheckboxGridEditor index={index} />;
      case Qtypes.MULT_CHOICE_GRID:
        return <MultChoiceGridEditor index={index} />;
      case Qtypes.NUMBER:
        return <NumberEditor index={index} />;
      default:
        return <div>Other question type</div>;
    }
  };

  const onValueChanged = (value) => {
    if (value === selectedQtype) {
      return;
    }

    setSelectedQtype(value);
    const reducer = question.createChangeQType(value);
    const qid = question.id;
    surveyAdminContext.disableAutoFocus();
    applyQuestionReducer(reducer, qid);
  };

  const onClickDelete = () => {
    deleteQuestion(question.id);
  };

  const onClickMoveUp = (e) => {
    e.preventDefault();
    moveQuestionUp(question.id);
  };

  const onClickMoveDown = (e) => {
    e.preventDefault();
    moveQuestionDown(question.id);
  };

  const onQuestionTextChanged = (e) => {
    const reducer = question.createSetQuestionText(e.target.value);
    applyQuestionReducer(reducer, question.id);
  };

  const onIsRequiredChanged = (e) => {
    const reducer = question.createToggleIsRequired();
    applyQuestionReducer(reducer, question.id);
  };

  return (
    <>
      {/* <hr className='bg-slate-300 h-[2px] border-0' /> */}
      <div className='flex flex-col w-full pt-7 px-3 bg-white xs:px-5 shadow-sm sm:rounded-t-xl sm:border-x-[1px] sm:border-t-[1px] sm:border-gray-100'>
        <div className='flex flex-col sm:flex-row sm:items-baseline'>
          <label htmlFor='' className='flex flex-row items-baseline sm:grow'>
            <span className='font-bold'>Q: </span>
            <DynamicTextArea
              classNames='grow mb-4 mr-4'
              placeholder='Question text'
              value={question.text}
              onChange={onQuestionTextChanged}
            />
          </label>
          <div className='flex justify-end mb-5'>
            <Dropdown
              defaultItem={defaultDropdownItem}
              items={dropdownItems}
              onValueChanged={onValueChanged}
              isFullWidth={true}
              menuClassNames='right-0 min-w-[200px]'
            />
          </div>
        </div>
        {editor()}
        <SingleCheckboxInput
          label='Required'
          value={question.isRequired}
          id={question.id}
          onStateChange={onIsRequiredChanged}
          isOnEnd={true}
        />
      </div>

      {/* Bottom button group */}
      <div className='flex w-full h-16 shadow-md mb-7 text-gray-700  bg-white xs:text-xl sm:rounded-b-lg sm:border-x-[1px] sm:border-b-[1px] sm:border-gray-100'>
        <button
          className='grow border-t-[1px] border-r-[1px] border-gray-300 hover:bg-slate-50'
          onClick={onClickMoveUp}
        >
          Move up
        </button>
        <button
          className='grow border-t-[1px] border-r-[1px] border-gray-300 hover:bg-slate-50'
          onClick={onClickMoveDown}
        >
          Move down
        </button>
        <button
          className='grow border-t-[1px] border-gray-300 hover:bg-slate-50'
          onClick={onClickDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default QuestionEditor;
