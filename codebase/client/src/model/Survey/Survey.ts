import Clonable from '../Interfaces/Clonable';
import Identifiable from '../Interfaces/Identifiable';
import * as IUtils from '../Interfaces/InterfaceUtils';
import * as DateUtil from '../../utils/DateUtil';
import Question from '../Question/Question';
import UserType from '../User/UserType';
import StorableSurvey from '../Storables/StorableSurvey';

export default class Survey implements Clonable<Survey>, Identifiable {
  id: string;
  title: string;
  version: number;
  description: string;
  audience: UserType.asUnion[];
  deactivatedAt?: Date;
  updatedAt?: Date;
  questions: Question[];

  // Both deactivatedAtUtc and updatedAtUtc must be UTC timestamps
  // audience must be an array of UserTypes
  constructor(
    surveyId: string,
    title: string,
    description: string,
    audience: UserType.asUnion[],
    questions: Question[],
    surveyVersion: number,
    deactivatedAt?: Date | number,
    updatedAt?: Date | number
  ) {
    this.title = title;
    this.description = description;
    this.id = surveyId;
    this.version = surveyVersion;
    this.audience = [...audience];
    this.deactivatedAt = DateUtil.toDateMaybe(deactivatedAt);
    this.updatedAt = DateUtil.toDateMaybe(updatedAt);
    this.questions = questions.map((ques) => ques.clone());
  }

  isEqual(other: Survey): boolean {
    return (
      this.id === other.id &&
      this.title === other.title &&
      this.version === other.version &&
      this.description === other.description &&
      this.audience === other.audience &&
      this.deactivatedAt?.getTime() === other.deactivatedAt?.getTime() &&
      this.updatedAt?.getTime() === other.updatedAt?.getTime() &&
      IUtils.isEqual(this.questions, other.questions)
    );
  }

  clone(): Survey {
    // Use of optional chaining operator
    return new Survey(
      this.id,
      this.title,
      this.description,
      this.audience,
      this.questions,
      this.version,
      this.deactivatedAt?.getTime(),
      this.updatedAt?.getTime()
    );
  }

  toStorable(): StorableSurvey {
    return {
      title: this.title,
      description: this.description,
      audience: this.audience,
      _id: this.id,
      version: this.version,
      deactivatedAt: this.deactivatedAt?.getTime() ?? undefined,
      updatedAt: this.updatedAt?.getTime() ?? undefined,
      questions: this.questions.map((ques) => ques.toStorable()),
    };
  }

  static fromStorable(data: StorableSurvey): Survey {
    // The constructor produces a deep clone of the questions array, which is unnecessary. To bypass this, we pass an empty array into the constructor and manually overwrite the questions array with the array we just constructed.
    const quesArray = data.questions.map((ques) => Question.fromStorable(ques));
    const survey = new Survey(
      data._id,
      data.title,
      data.description,
      data.audience,
      [],
      data.version,
      data.deactivatedAt,
      data.updatedAt
    );

    survey.questions = quesArray;
    return survey;
  }
}
