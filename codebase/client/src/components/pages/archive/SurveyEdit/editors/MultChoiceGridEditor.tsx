import React, { useContext } from 'react';
import SurveyAdminContext from 'src/context/archive/SurveyAdmin/SurveyAdminContext';
import FieldEdit from '../layout/FieldEdit';
import FullWidthButton from '../layout/FullWidthButton';
import QuestionEditState from 'src/model/archive/EditState/QuestionEditState';

const MultChoiceGridEditor: React.FC<{ question: QuestionEditState }> = ({
  question,
}) => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  if (!surveyAdminContext) {
    return <></>;
  }
  const { executeQuestionReducer, activateAutoFocus } = surveyAdminContext;
  const { id, options, rows } = question;
  if (!rows || !options) {
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
      {/* <SingleCheckboxInput
        label="Allow at most one response per column"
        value={question.isOneToOne}
        onStateChange={onIsOneToOneChanged}
      /> */}

      <div className="flex flex-col">
        <h1 className="font-bold text-xl mb-3">Rows: Questions</h1>
        {/* <div className='ml-auto'>
          <Button classNames='border-gray-400 mb-2' onClick={onClickAddRow}>
            Add row
          </Button>
        </div> */}
      </div>
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

export default MultChoiceGridEditor;
