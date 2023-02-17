import Question from './Question';
import { SHORT_ANSWER } from '../questionTypes';

class ShortAnswerQuestion extends Question {
  constructor(isRequired, questionText, questionHeader, questionId = null) {
    super(SHORT_ANSWER, isRequired, questionText, questionHeader, questionId);
  }

  clone() {
    return new ShortAnswerQuestion(
      this.isRequired,
      this.text,
      this.header,
      this.id
    );
  }

  toStorable() {
    return {
      isRequired: this.isRequired,
      questionText: this.text,
      questionHeader: this.header,
      type: this.type,
      id: this.id,
      additionalData: null,
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === SHORT_ANSWER
    ) {
      return new ShortAnswerQuestion(
        data.isRequired,
        data.questionText,
        data.questionHeader,
        data.id
      );
    } else {
      throw new TypeError(
        `In ShortAnswerQuestion.fromData(): ShortAnswerQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default ShortAnswerQuestion;
