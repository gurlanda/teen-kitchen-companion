import Question from './Question';
import { DATE } from '../questionTypes';

class DateQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    questionHeader = null,
    questionId = null
  ) {
    super(DATE, isRequired, questionText, questionHeader, questionId);
  }

  clone() {
    return new DateQuestion(this.isRequired, this.text, this.header, this.id);
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('text') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === DATE
    ) {
      return new DateQuestion(
        data.isRequired,
        data.text,
        data.questionHeader,
        data.id
      );
    } else {
      throw new TypeError(
        `In DateQuestion.fromData(): DateQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default DateQuestion;
