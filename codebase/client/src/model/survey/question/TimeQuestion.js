import Question from './Question';
import { TIME } from '../questionTypes';

class TimeQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    questionHeader = null,
    questionId = null
  ) {
    super(TIME, isRequired, questionText, questionHeader, questionId);
  }

  clone() {
    return new TimeQuestion(this.isRequired, this.text, this.header, this.id);
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('text') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === TIME
    ) {
      return new TimeQuestion(
        data.isRequired,
        data.text,
        data.questionHeader,
        data.id
      );
    } else {
      throw new TypeError(
        `In TimeQuestion.fromData(): TimeQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default TimeQuestion;
