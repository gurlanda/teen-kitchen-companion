import GridQuestion, { RowQuestion } from './GridQuestion';
import Option from './Option';
import { MULT_CHOICE_GRID } from '../questionTypes';

class MultChoiceGridQuestion extends GridQuestion {
  constructor(
    isRequired,
    mainQuestionText,
    rowQuestions,
    options,
    isOneToOne,
    questionHeader,
    id = null
  ) {
    super(
      MULT_CHOICE_GRID,
      isRequired,
      mainQuestionText,
      rowQuestions,
      options,
      questionHeader,
      id
    );

    this.isOneToOne = isOneToOne ?? null;
  }

  clone() {
    return new MultChoiceGridQuestion(
      this.isRequired,
      this.text,
      this.rowQuestions,
      this.options,
      this.isOneToOne,
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
        isOneToOne: this.isOneToOne,
      },
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('questionText') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.type === MULT_CHOICE_GRID
    ) {
      const optsArray = data.additionalData.options.map((opt) =>
        Option.fromData(opt)
      );
      const rowsArray = data.additionalData.rowQuestions.map((row) =>
        RowQuestion.fromData(row)
      );

      // The constructor produces a deep clone of the options and rowQuestions arrays, which is unnecessary. To bypass this, we pass an empty array into the constructor and manually overwrite the options & rowQuestions with the arrays we just constructed.
      const question = new MultChoiceGridQuestion(
        data.isRequired,
        data.questionText,
        [],
        [],
        data.isOneToOne,
        data.questionHeader,
        data.id
      );

      question.options = optsArray;
      question.rowQuestions = rowsArray;
      return question;
    } else {
      throw new TypeError(
        `In MultChoiceGridQuestion.fromData(): MultChoiceGridQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default MultChoiceGridQuestion;
