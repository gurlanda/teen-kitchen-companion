import Question from './Question';
import { LONG_ANSWER } from '../questionTypes';

class LongAnswerQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    numLines,
    questionHeader,
    questionId = null
  ) {
    super(LONG_ANSWER, isRequired, questionText, questionHeader, questionId);
    this.numLines = numLines;
  }

  clone() {
    return new LongAnswerQuestion(
      this.isRequired,
      this.text,
      this.numLines,
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
      additionalData: {
        numLines: null, // Unsure if still needed
      },
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === LONG_ANSWER
    ) {
      return new LongAnswerQuestion(
        data.isRequired,
        data.questionText,
        data.additionalData.numLines,
        data.questionHeader,
        data.id
      );
    } else {
      throw new TypeError(
        `In LongAnswerQuestion.fromData(): LongAnswerQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default LongAnswerQuestion;
