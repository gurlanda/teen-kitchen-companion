import Question from './Question';
import * as Qtypes from '../questionTypes';

export default class LinearScaleQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    min,
    max,
    step,
    minText,
    maxText,
    questionHeader,
    questionId = null
  ) {
    super(
      Qtypes.LINEAR_SCALE,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    if (
      !(min instanceof String || typeof min === 'number') ||
      !(max instanceof String || typeof max === 'number') ||
      !(step instanceof String || typeof step === 'number') ||
      !(minText instanceof String || typeof minText === 'string') ||
      !(maxText instanceof String || typeof maxText === 'string')
    ) {
      throw new TypeError(
        'In constructor LinearScaleQuestion(): One or more passed arguments are of invalid type.'
      );
    }

    if (min >= max) {
      throw new TypeError(
        'In constructor LinearScaleQuestion(): min must be strictly less than max'
      );
    }

    if (step <= 0) {
      throw new TypeError(
        'In constructor LinearScaleQuestion(): step must be strictly positive'
      );
    }

    this.min = min;
    this.max = max;
    this.step = step;
    this.minText = minText;
    this.maxText = maxText;
  }

  clone() {
    return new LinearScaleQuestion(
      this.isRequired,
      this.text,
      this.min,
      this.max,
      this.step,
      this.minText,
      this.maxText,
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
        min: this.min,
        max: this.max,
        step: this.step,
        minText: this.minText,
        maxText: this.maxText,
      },
    };
  }

  static fromData(data) {
    try {
      const ques = new LinearScaleQuestion(
        data?.isRequired,
        data?.questionText,
        data?.additionalData?.min,
        data?.additionalData?.max,
        data?.additionalData?.step,
        data?.additionalData?.minText,
        data?.additionalData?.maxText,
        data?.questionHeader,
        data?.id
      );

      return ques;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          `In LinearScaleQuestion.fromData(): LinearScaleQuestion object cannot be created from passed-in data`
        );
      } else {
        throw error;
      }
    }
  }
}
