import React, { useContext } from 'react';
import SurveyAdminContext from 'src/context/SurveyAdmin/SurveyAdminContext';
import FullWidthButton from '../layout/FullWidthButton';
import FieldEdit from '../layout/FieldEdit';
import QuestionEditState from 'src/model/EditState/QuestionEditState';

const CheckboxGridEditor: React.FC<{ question: QuestionEditState }> = ({
  question,
}) => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  if (!surveyAdminContext) {
    return <></>;
  }

  const { executeQuestionReducer, activateAutoFocus } = surveyAdminContext;
  const { id, options, rows } = question;
  if (!options || !rows) {
    return <></>;
  }

  /**
   * ------------ Option event handlers ------------
   */
  const onClickAddOpt = () => {
    activateAutoFocus();
    executeQuestionReducer(id, QuestionEditState.createAddOption());
  };

  const onClickDeleteOpt = (optId: string) => {
    executeQuestionReducer(id, QuestionEditState.createDeleteOption(optId));
  };

  const onClickMoveUpOpt = (optId: string) => {
    executeQuestionReducer(id, QuestionEditState.createMoveUpOption(optId));
  };

  const onClickMoveDownOpt = (optId: string) => {
    executeQuestionReducer(id, QuestionEditState.createMoveDownOption(optId));
  };

  const onChangeOptText = (newOptText: string, optId: string) => {
    executeQuestionReducer(
      id,
      QuestionEditState.createSetOptionText(newOptText, optId)
    );
  };

  /**
   * ------------ Row question event handlers ------------
   */
  const onClickAddRow = () => {
    activateAutoFocus();
    executeQuestionReducer(id, QuestionEditState.createAddRow());
  };

  const onClickDeleteRow = (rowId: string) => {
    executeQuestionReducer(id, QuestionEditState.createDeleteRow(rowId));
  };

  const onClickMoveUpRow = (rowId: string) => {
    executeQuestionReducer(id, QuestionEditState.createMoveUpRow(rowId));
  };

  const onClickMoveDownRow = (rowId: string) => {
    executeQuestionReducer(id, QuestionEditState.createMoveDownRow(rowId));
  };

  const onChangeRowText = (newRowText: string, rowId: string) => {
    executeQuestionReducer(
      id,
      QuestionEditState.createSetRowText(newRowText, rowId)
    );
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-3">Rows: Questions</h1>
      {rows.map((row) => (
        <FieldEdit
          key={row.id}
          id={row.id}
          placeholder="Row question text"
          value={row.text}
          onClickUp={onClickMoveUpRow}
          onClickDown={onClickMoveDownRow}
          onClickDelete={onClickDeleteRow}
          onTextChange={onChangeRowText}
        />
      ))}
      <FullWidthButton onClick={onClickAddRow}>Add row&#8230;</FullWidthButton>

      <h1 className="font-bold text-xl mb-3">Columns: Options</h1>
      {options.map((opt) => (
        <FieldEdit
          key={opt.id}
          id={opt.id}
          placeholder="Option text"
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
