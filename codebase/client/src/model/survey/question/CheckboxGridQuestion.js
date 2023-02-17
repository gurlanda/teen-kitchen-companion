import GridQuestion, { RowQuestion } from './GridQuestion';
import Option from './Option';
import { CHECKBOX_GRID } from '../questionTypes';

class CheckboxGridQuestion extends GridQuestion {
  constructor(
    isRequired,
    mainQuestionText,
    rowQuestions,
    options,
    questionHeader,
    id = null
  ) {
    super(
      CHECKBOX_GRID,
      isRequired,
      mainQuestionText,
      rowQuestions,
      options,
      questionHeader,
      id
    );
  }

  clone() {
    return new CheckboxGridQuestion(
      this.isRequired,
      this.text,
      this.rowQuestions,
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
        rowQuestions: this.rowQuestions.map((row) => row.toStorable()),
        options: this.options.map((opt) => opt.toStorable()),
      },
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === CHECKBOX_GRID
    ) {
      const optsArray = data.additionalData.options.map((opt) =>
        Option.fromData(opt)
      );
      const rowsArray = data.additionalData.rowQuestions.map((row) =>
        RowQuestion.fromData(row)
      );

      // The constructor produces a deep clone of the options and rowQuestions arrays, which is unnecessary in this case. To bypass this, we pass an empty array into the constructor and manually overwrite the options & rowQuestions with the arrays we just constructed.
      const question = new CheckboxGridQuestion(
        data.isRequired,
        data.questionText,
        [],
        [],
        data?.questionHeader,
        data.id
      );

      question.options = optsArray;
      question.rowQuestions = rowsArray;
      return question;
    } else {
      throw new TypeError(
        `In CheckboxGridQuestion.fromData(): CheckboxGridQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default CheckboxGridQuestion;
