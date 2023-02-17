import createId from '../../../utils/createId';
import * as Qtypes from '../questionTypes';

class Question {
  constructor(questionType, isRequired, questionText, questionHeader, id) {
    if (!Qtypes.asArray.includes(questionType)) {
      throw new Qtypes.QuestionTypeError(
        `In constructor Question(): ${questionType} passed into parameter questionType is not a QuestionType`
      );
    }

    this.type = questionType;
    this.isRequired = isRequired;
    this.text = questionText;
    this.header = questionHeader;

    if (id) {
      this.id = id;
    } else {
      this.id = createId();
    }
  }

  clone() {
    return new Question(
      this.type,
      this.isRequired,
      this.text,
      this.header,
      this.id
    );
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type')
    ) {
      return new Question(
        data.type,
        data.isRequired,
        data.questionText,
        data.id
      );
    } else {
      throw new TypeError(
        `In Question.fromData(): Question object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default Question;
