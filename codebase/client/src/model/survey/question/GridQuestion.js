import createId from '../../../utils/createId';
import Question from './Question';
import Option from './Option';
import * as Qtypes from '../questionTypes';

export class RowQuestion {
  constructor(questionText, id = null) {
    this.text = questionText;
    if (id) {
      this.id = id;
    } else {
      this.id = createId();
    }
  }

  clone() {
    return new RowQuestion(this.text, this.id);
  }

  // Converts a RowQuestion object to a data format that's acceptable by the server
  toStorable() {
    return {
      id: this.id,
      questionText: this.text,
    };
  }

  static fromData(data) {
    if (data.hasOwnProperty('questionText') && data.hasOwnProperty('id')) {
      return new RowQuestion(data.questionText, data.id);
    } else {
      throw new TypeError(
        `In RowQuestion.fromData(): RowQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default class GridQuestion extends Question {
  constructor(
    questionType,
    isRequired,
    mainQuestionText,
    rowQuestions,
    options,
    questionHeader,
    id
  ) {
    if (!Qtypes.asArray.includes(questionType)) {
      throw new Qtypes.QuestionTypeError(
        `In constructor GridQuestion(): ${questionType} passed into parameter questionType is not a QuestionType`
      );
    }

    super(questionType, isRequired, mainQuestionText, questionHeader, id);
    this.rowQuestions = rowQuestions.map((row) => row.clone());
    this.options = options.map((opt) => opt.clone());
  }

  clone() {
    const rowQuesClone = this.rowQuestions.map((ques) => ques.clone());
    const optsClone = this.options.map((opt) => opt.clone());

    const ques = new GridQuestion(
      this.type,
      this.isRequired,
      this.text,
      [],
      [],
      this.header,
      this.id
    );

    ques.options = optsClone;
    ques.rowQuestions = rowQuesClone;

    return ques;
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('text') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('type') &&
      data.hasOwnProperty('rowQuestions') &&
      data.hasOwnProperty('options')
    ) {
      const optsArray = data.options.map((opt) => Option.fromData(opt));
      const rowsArray = data.rowQuestions.map((row) =>
        RowQuestion.fromData(row)
      );

      // The constructor produces a deep clone of the options and rowQuestions arrays, which is unnecessary. To bypass this, we pass an empty array into the constructor and manually overwrite the options & rowQuestions with the arrays we just constructed.
      const question = new GridQuestion(
        data.type,
        data.isRequired,
        data.text,
        [],
        [],
        data.questionHeader,
        data.id
      );

      question.options = optsArray;
      question.rowQuestions = rowsArray;
      return question;
    } else {
      throw new TypeError(
        `In GridQuestion.fromData(): GridQuestion object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}
