import React, { useContext } from 'react';
import SurveyAdminContext from 'src/context/SurveyAdmin/SurveyAdminContext';
import FullWidthButton from '../layout/FullWidthButton';
import FieldEdit from '../layout/FieldEdit';
import QuestionEditState from 'src/model/EditState/QuestionEditState';

const MultChoiceEditor: React.FC<{ question: QuestionEditState }> = ({
  question,
}) => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  if (!surveyAdminContext) {
    return <></>;
  }
  const { executeQuestionReducer, activateAutoFocus, disableAutoFocus } =
    surveyAdminContext;
  const { id, options } = question;
  if (!options) {
    return <></>;
  }

  const onClickAddOpt = () => {
    activateAutoFocus();
    executeQuestionReducer(id, QuestionEditState.createAddOption());
  };

  const onClickDeleteOpt = (optId: string) => {
    executeQuestionReducer(id, QuestionEditState.createDeleteOption(optId));
  };

  const onClickMoveUp = (optId: string) => {
    executeQuestionReducer(id, QuestionEditState.createMoveUpOption(optId));
  };

  const onClickMoveDown = (optId: string) => {
    executeQuestionReducer(id, QuestionEditState.createMoveDownOption(optId));
  };

  const onChangeOptText = (newOptText: string, optId: string) => {
    executeQuestionReducer(
      id,
      QuestionEditState.createSetOptionText(newOptText, optId)
    );
  };

  return (
    <>
      {options.map((opt) => (
        <FieldEdit
          key={opt.id}
          id={opt.id}
          placeholder="Option text"
          value={opt.text}
          onClickUp={onClickMoveUp}
          onClickDown={onClickMoveDown}
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

export default MultChoiceEditor;
