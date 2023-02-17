import React, { useContext } from 'react';
import SurveyAdminContext from '../../../../context/survey-admin/surveyAdminContext';
import FullWidthButton from '../layout/FullWidthButton';
import FieldEdit from '../layout/FieldEdit';

const CheckboxEditor = ({ index }) => {
  const surveyAdminContext = useContext(SurveyAdminContext);
  const { applyQuestionReducer, activateAutoFocus, disableAutoFocus } =
    surveyAdminContext;
  const question = surveyAdminContext.questions[index];

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

  const onClickMoveUp = (e) => {
    e.preventDefault();
    const optId = e.target.dataset.id;
    applyQuestionReducer(question.createMoveUpOption(optId), question.id);
  };

  const onClickMoveDown = (e) => {
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

  return (
    <>
      {question.options.map((opt) => (
        <FieldEdit
          key={opt.id}
          dataId={opt.id}
          placeholder='Option text'
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

export default CheckboxEditor;
