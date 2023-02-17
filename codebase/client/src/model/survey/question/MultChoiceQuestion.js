import Question from './Question';
import Option from './Option';
import { MULT_CHOICE } from '../questionTypes';

class MultChoiceQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    options,
    questionHeader,
    questionId = null
  ) {
    if (!(options instanceof Array)) {
      console.log(options);
      throw new TypeError(
        'In constructor MultChoiceQuestion(): options is not an Array object.'
      );
    }

    super(MULT_CHOICE, isRequired, questionText, questionHeader, questionId);
    this.options = options.map((opt) => opt.clone());
  }

  clone() {
    return new MultChoiceQuestion(
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
      data.type === MULT_CHOICE
    ) {
      const optsArray = data.additionalData.options.map((opt) =>
        Option.fromData(opt)
      );

      // The constructor produces a deep clone of the options array, which is unnecessary. To bypass this, we pass an empty array into the constructor and manually overwrite the options array with the array we just constructed.
      const question = new MultChoiceQuestion(
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
        `In MultChoiceQuestion.fromData(): MultChoiceQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default MultChoiceQuestion;
