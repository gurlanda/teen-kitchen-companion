import React, { useContext } from 'react';
import SurveyAdminContext from '../../../../context/survey-admin/surveyAdminContext';
import FullWidthButton from '../layout/FullWidthButton';
import FieldEdit from '../layout/FieldEdit';

const CheckboxGridEditor = ({ index }) => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  const { applyQuestionReducer, activateAutoFocus, disableAutoFocus } =
    surveyAdminContext;
  const question = surveyAdminContext.questions[index];

  /**
   * ------------ Option event handlers ------------
   */
  const onClickAddOpt = (e) => {
    e.preventDefault();
    activateAutoFocus();
    applyQuestionReducer(question.createAddOption(), question.id);
  };

  const onClickDeleteOpt = (e) => {
    e.preventDefault();
    const optId = e.target.dataset.id;
    applyQuestionReducer(question.createDeleteOption(optId), question.id);
  };

  const onClickMoveUpOpt = (e) => {
    e.preventDefault();
    const optId = e.target.dataset.id;
    applyQuestionReducer(question.createMoveUpOption(optId), question.id);
  };

  const onClickMoveDownOpt = (e) => {
    e.preventDefault();
    const optId = e.target.dataset.id;
    applyQuestionReducer(question.createMoveDownOption(optId), question.id);
  };

  const onChangeOptText = (e) => {
    e.preventDefault();

    const newOptText = e.target.value;
    const optId = e.target.dataset.id;
    applyQuestionReducer(
      question.createEditOptionText(newOptText, optId),
      question.id
    );
  };

  /**
   * ------------ Row question event handlers ------------
   */
  const onClickAddRow = (e) => {
    e.preventDefault();
    activateAutoFocus();
    applyQuestionReducer(question.createAddRow(), question.id);
  };

  const onClickDeleteRow = (e) => {
    e.preventDefault();
    const rowId = e.target.dataset.id;
    applyQuestionReducer(question.createDeleteRow(rowId), question.id);
  };

  const onClickMoveUpRow = (e) => {
    e.preventDefault();
    const rowId = e.target.dataset.id;
    applyQuestionReducer(question.createMoveUpRow(rowId), question.id);
  };

  const onClickMoveDownRow = (e) => {
    e.preventDefault();
    const rowId = e.target.dataset.id;
    applyQuestionReducer(question.createMoveDownRow(rowId), question.id);
  };

  const onChangeRowText = (e) => {
    e.preventDefault();

    const newRowText = e.target.value;
    const rowId = e.target.dataset.id;
    applyQuestionReducer(
      question.createEditRowText(newRowText, rowId),
      question.id
    );
  };

  return (
    <>
      <h1 className='font-bold text-xl mb-3'>Rows: Questions</h1>
      {question.rowQuestions.map((row) => (
        <FieldEdit
          key={row.id}
          dataId={row.id}
          placeholder='Row question text'
          value={row.text}
          onClickUp={onClickMoveUpRow}
          onClickDown={onClickMoveDownRow}
          onClickDelete={onClickDeleteRow}
          onTextChange={onChangeRowText}
        />
      ))}
      <FullWidthButton onClick={onClickAddRow}>Add row&#8230;</FullWidthButton>

      <h1 className='font-bold text-xl mb-3'>Columns: Options</h1>
      {question.options.map((opt) => (
        <FieldEdit
          key={opt.id}
          dataId={opt.id}
          placeholder='Option text'
          value={opt.text}
          onClickUp={onClickMoveUpOpt}
          onClickDown={onClickMoveDownOpt}
          onClickDelete={onClickDeleteOpt}
          onTextChange={onChangeOptText}
        />
      ))}
      <FullWidthButton onClick={onClickAddOpt}>
        Add option&#8230;
      </FullWidthButton>
    </>
  );
};

export default CheckboxGridEditor;
