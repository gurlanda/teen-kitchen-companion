import Question from './Question';
import Option from './Option';
import { CHECKBOX } from '../questionTypes';

class CheckboxQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    options,
    questionHeader = null,
    questionId = null
  ) {
    super(CHECKBOX, isRequired, questionText, questionHeader, questionId);
    this.options = options.map((opt) => opt.clone());
  }

  clone() {
    return new CheckboxQuestion(
      this.isRequired,
      this.text,
      this.options,
      this.header,
      this.id
    );
  }

  // Converts this object to a format that the server can accept
  toStorable() {
    return {
      isRequired: this.isRequired,
      questionText: this.text,
      questionHeader: this.header,
      type: this.type,
      id: this.id,
      additionalData: {
        options: this.options.map((opt) => opt.toStorable()),
      },
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === CHECKBOX
    ) {
      const optsArray = data.additionalData.options.map((opt) =>
        Option.fromData(opt)
      );

      // The constructor produces a deep clone of the options array, which is unnecessary. To bypass this, we pass an empty array into the constructor and manually overwrite the options array with the array we just constructed.
      const question = new CheckboxQuestion(
        data.isRequired,
        data.questionText,
        [],
        data?.questionHeader,
        data.id
      );

      question.options = optsArray;
      return question;
    } else {
      throw new TypeError(
        `In CheckboxQuestion.fromData(): CheckboxQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default CheckboxQuestion;
