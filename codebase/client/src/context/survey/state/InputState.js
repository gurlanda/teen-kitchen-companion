import * as Qtypes from '../../../model/survey/questionTypes';

class InputState {
  constructor(
    questionType,
    isRequired,
    questionText,
    questionHeader,
    questionId
  ) {
    if (!Qtypes.asArray.includes(questionType)) {
      throw new Qtypes.QuestionTypeError(
        `In constructor InputState(): ${questionType} passed into parameter questionType is not a QuestionType`
      );
    }

    this.type = questionType;
    this.text = questionText;
    this.header = questionHeader;
    this.id = questionId;
    this.isRequired = isRequired;
    this.isDanger = false;
  }

  clone() {
    return new InputState(
      this.type,
      this.isRequired,
      this.text,
      this.header,
      this.id
    );
  }
}

export default InputState;
