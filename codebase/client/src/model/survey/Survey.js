import { isQuestionType, QuestionTypeError } from './questionTypes';
import * as UserTypes from '../user/userTypes';
import { questionFromData } from './utils';

export default class Survey {
  // Both deactivatedAtUtc and updatedAtUtc must be UTC timestamps
  // audience must be an array of UserTypes
  constructor(
    title,
    description,
    audience,
    deactivatedAtUtc,
    updatedAtUtc,
    questions,
    surveyId = null,
    surveyVersion = null
  ) {
    if (!(audience instanceof Array)) {
      throw new TypeError(
        "In constructor Survey(): Argument passed into parameter 'audience' is not an array."
      );
    }

    for (const elem of audience) {
      if (!UserTypes.asArray.includes(elem)) {
        throw new TypeError(
          "In constructor Survey(): At least one element in 'audience' is not a UserType."
        );
      }
    }

    this.title = title;
    this.description = description;
    this.id = surveyId;
    this.version = surveyVersion;
    this.audience = [...audience];

    this.deactivatedAt = deactivatedAtUtc ? new Date(deactivatedAtUtc) : null;
    this.updatedAt = updatedAtUtc ? new Date(updatedAtUtc) : null;

    // Check if the questions are all proper question objects
    for (const elem of questions) {
      if ('type' in elem !== true) {
        throw new TypeError(
          `In constructor Survey(): At least one element of the array passed into the parameter questions is not of type Question`
        );
      }
      if (!isQuestionType(elem.type)) {
        throw new QuestionTypeError(
          `In constructor Survey(): At least one element of the array passed into the parameter questions has invalid type`
        );
      }
    }

    this.questions = questions.map((ques) => ques.clone());
  }

  clone() {
    // Use of optional chaining operator
    return new Survey(
      this.title,
      this.description,
      this.audience,
      this.deactivatedAt?.getTime(),
      this.updatedAt?.getTime(),
      this.questions,
      this.id,
      this.version
    );
  }

  toStorable() {
    return {
      title: this.title,
      description: this.description,
      audience: this.audience,
      id: this.id,
      version: this.version,
      deactivatedAt: this.deactivatedAt?.getTime() ?? null,
      updatedAt: this.updatedAt?.getTime() ?? null,
      questions: this.questions.map((ques) => ques.toStorable()),
    };
  }

  static fromData(data) {
    if (
      data.hasOwnProperty('title') &&
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('questions')
    ) {
      const quesArray = data.questions.map((ques) => questionFromData(ques));

      // The constructor produces a deep clone of the questions array, which is unnecessary. To bypass this, we pass an empty array into the constructor and manually overwrite the questions array with the array we just constructed.
      const survey = new Survey(
        data.title,
        data.description,
        data.audience,
        parseInt(data.deactivatedAt),
        parseInt(data.updatedAt),
        [],
        data.id,
        data.version
      );

      survey.questions = quesArray;
      return survey;
    } else {
      throw new TypeError(
        `In Survey.fromData(): Survey object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}
