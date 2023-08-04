import React, { useState, useContext } from 'react';

import DynamicTextArea from './layout/DynamicTextArea';
import SingleCheckboxInput from '../../../layout/Form/SingleCheckboxInput';
import Dropdown, {
  DropdownItem,
  DropdownDivider,
  DropdownItemQT,
} from '../../../layout/Form/Dropdown';

import QuestionType from 'src/model/archive/Question/QuestionType';
import SurveyAdminContext from 'src/context/archive/SurveyAdmin/SurveyAdminContext';

import ShortAnswerEditor from './editors/ShortAnswerEditor';
import LongAnswerEditor from './editors/LongAnswerEditor';
import MultChoiceEditor from './editors/MultChoiceEditor';
import CheckboxEditor from './editors/CheckboxEditor';
import CheckboxGridEditor from './editors/CheckboxGridEditor';
import MultChoiceGridEditor from './editors/MultChoiceGridEditor';
import NumberEditor from './editors/NumberEditor';
import QuestionEditState from 'src/model/archive/EditState/QuestionEditState';
import SurveyEditState from 'src/model/archive/EditState/SurveyEditState';

const dropdownItems: (DropdownItem<QuestionType.asUnion> | DropdownDivider)[] =
  [
    new DropdownItem<QuestionType.asUnion>(
      'Short answer',
      QuestionType.SHORT_ANSWER
    ),
    new DropdownItem<QuestionType.asUnion>(
      'Paragraph',
      QuestionType.LONG_ANSWER
    ),
    new DropdownDivider(),
    new DropdownItem<QuestionType.asUnion>(
      'Multiple choice',
      QuestionType.MULT_CHOICE
    ),
    new DropdownItem<QuestionType.asUnion>('Checkbox', QuestionType.CHECKBOX),
    new DropdownItem<QuestionType.asUnion>('Number', QuestionType.NUMBER),
    new DropdownDivider(),
    new DropdownItem<QuestionType.asUnion>(
      'Checkbox grid',
      QuestionType.CHECKBOX_GRID
    ),
    new DropdownItem<QuestionType.asUnion>(
      'Multiple choice grid',
      QuestionType.MULT_CHOICE_GRID
    ),
  ];

const QuestionEditor: React.FC<{ question: QuestionEditState }> = ({
  question,
}) => {
  const [selectedQtype, setSelectedQtype] = useState<QuestionType.asUnion>(
    question.type
  );
  const surveyAdminContext = useContext(SurveyAdminContext);
  if (!surveyAdminContext) {
    return <></>;
  }

  const { executeQuestionReducer, executeStateReducer } = surveyAdminContext;
  const { id } = question;

  let defaultDropdownItem: DropdownItemQT;
  switch (question.type) {
    case QuestionType.CHECKBOX:
      defaultDropdownItem = dropdownItems[4] as DropdownItemQT;
      break;
    case QuestionType.MULT_CHOICE:
      defaultDropdownItem = dropdownItems[3] as DropdownItemQT;
      break;
    case QuestionType.NUMBER:
      defaultDropdownItem = dropdownItems[5] as DropdownItemQT;
      break;
    case QuestionType.SHORT_ANSWER:
      defaultDropdownItem = dropdownItems[0] as DropdownItemQT;
      break;
    case QuestionType.LONG_ANSWER:
      defaultDropdownItem = dropdownItems[1] as DropdownItemQT;
      break;
    case QuestionType.MULT_CHOICE_GRID:
      defaultDropdownItem = dropdownItems[8] as DropdownItemQT;
      break;
    case QuestionType.CHECKBOX_GRID:
      defaultDropdownItem = dropdownItems[7] as DropdownItemQT;
      break;
    default:
      throw TypeError(
        'In QuestionEditor.js > QuestionEditor > switch (question.type): Either the passed argument does not have an associated DropdownItem or is not a valid Qtype'
      );
  }

  const editor = () => {
    switch (selectedQtype) {
      case QuestionType.SHORT_ANSWER:
        return <ShortAnswerEditor question={question} />;
      case QuestionType.LONG_ANSWER:
        return <LongAnswerEditor question={question} />;
      case QuestionType.MULT_CHOICE:
        return <MultChoiceEditor question={question} />;
      case QuestionType.CHECKBOX:
        return <CheckboxEditor question={question} />;
      case QuestionType.CHECKBOX_GRID:
        return <CheckboxGridEditor question={question} />;
      case QuestionType.MULT_CHOICE_GRID:
        return <MultChoiceGridEditor question={question} />;
      case QuestionType.NUMBER:
        return <NumberEditor question={question} />;
      default:
        return <div>Other question type</div>;
    }
  };

  const onValueChanged = (value: QuestionType.asUnion) => {
    if (value === selectedQtype) {
      return;
    }

    setSelectedQtype(value);
    const reducer = QuestionEditState.createChangeQuestionType(value);
    const qid = question.id;
    surveyAdminContext.disableAutoFocus();
    executeQuestionReducer(qid, reducer);
  };

  const onClickDelete = () => {
    executeStateReducer(SurveyEditState.createDeleteQuestion(id));
  };

  const onClickMoveUp = () => {
    executeStateReducer(SurveyEditState.createMoveQuestionUp(id));
  };

  const onClickMoveDown = () => {
    executeStateReducer(SurveyEditState.createMoveQuestionDown(id));
  };

  const onQuestionTextChanged = (newText: string) => {
    executeQuestionReducer(
      id,
      QuestionEditState.createSetQuestionText(newText)
    );
  };

  const onIsRequiredChanged = (newVal: boolean) => {
    executeQuestionReducer(id, QuestionEditState.createSetIsRequired(newVal));
  };

  return (
    <>
      {/* <hr className='bg-slate-300 h-[2px] border-0' /> */}
      <div className="flex flex-col w-full pt-7 px-3 bg-white xs:px-5 shadow-sm sm:rounded-t-xl sm:border-x-[1px] sm:border-t-[1px] sm:border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-baseline">
          <label htmlFor="" className="flex flex-row items-baseline sm:grow">
            <span className="font-bold">Q: </span>
            <DynamicTextArea
              id={id}
              classNames="grow mb-4 mr-4"
              placeholder="Question text"
              value={question.text}
              onChange={onQuestionTextChanged}
            />
          </label>
          <div className="flex justify-end mb-5">
            <Dropdown
              defaultItem={defaultDropdownItem}
              items={dropdownItems}
              onValueChanged={onValueChanged}
              isFullWidth={true}
              menuClassNames="right-0 min-w-[200px]"
            />
          </div>
        </div>
        {editor()}
        <SingleCheckboxInput
          label="Required"
          value={question.isRequired}
          id={question.id}
          onStateChange={onIsRequiredChanged}
          isOnEnd={true}
        />
      </div>

      {/* Bottom button group */}
      <div className="flex w-full h-16 shadow-md mb-7 text-gray-700  bg-white xs:text-xl sm:rounded-b-lg sm:border-x-[1px] sm:border-b-[1px] sm:border-gray-100">
        <button
          className="grow border-t-[1px] border-r-[1px] border-gray-300 hover:bg-slate-50"
          onClick={onClickMoveUp}
        >
          Move up
        </button>
        <button
          className="grow border-t-[1px] border-r-[1px] border-gray-300 hover:bg-slate-50"
          onClick={onClickMoveDown}
        >
          Move down
        </button>
        <button
          className="grow border-t-[1px] border-gray-300 hover:bg-slate-50"
          onClick={onClickDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default QuestionEditor;
