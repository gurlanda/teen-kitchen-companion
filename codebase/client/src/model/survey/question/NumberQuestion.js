import Question from './Question';
import { NUMBER } from '../questionTypes';

class NumberQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    min,
    max,
    step,
    questionHeader,
    questionId = null
  ) {
    super(NUMBER, isRequired, questionText, questionHeader, questionId);
    this.min = min;
    this.max = max;
    this.step = step;
  }

  clone() {
    return new NumberQuestion(
      this.isRequired,
      this.text,
      this.min,
      this.max,
      this.step,
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
        // Unsure if still needed
        min: this.min,
        max: this.max,
        step: this.step,
      },
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === NUMBER
    ) {
      return new NumberQuestion(
        data.isRequired,
        data.questionText,
        data.additionalData.min,
        data.additionalData.max,
        data.additionalData.step,
        data?.questionHeader,
        data.id
      );
    } else {
      throw new TypeError(
        `In NumberQuestion.fromData(): NumberQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default NumberQuestion;
