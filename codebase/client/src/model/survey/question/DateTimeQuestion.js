import Question from './Question';
import * as Qtypes from '../questionTypes';

export default class DateTimeQuestion extends Question {
  constructor(isRequired, questionText, questionHeader, questionId = null) {
    super(
      Qtypes.DATE_TIME,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    if (
      !(questionHeader instanceof String || typeof questionHeader === 'string')
    ) {
      throw new TypeError(
        "In constructor DateTimeQuestion(): Argument passed into parameter 'questionHeader' is not of type String"
      );
    }
  }

  clone() {
    return new DateTimeQuestion(
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
      id: this.id,
      type: this.type,
    };
  }

  static fromData(data) {
    try {
      const ques = new DateTimeQuestion(
        data?.isRequired,
        data?.questionText,
        data?.questionHeader,
        data?.id
      );
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          'In DateTimeQuestion.fromData(): New DateTimeQuestion cannot be created from the passed-in data.'
        );
      } else {
        throw error;
      }
    }
  }
}
