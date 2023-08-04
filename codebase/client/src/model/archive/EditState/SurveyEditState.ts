import Clonable from '../../Interfaces/Clonable';
import Identifiable from '../../Interfaces/Identifiable';
import Reducer from '../../Interfaces/Reducer';
import Survey from '../Survey/Survey';
import UserType from '../../User/UserType';
import QuestionEditState from './QuestionEditState';
import createId from '../../../utils/createId';
import {
  cloneTransformArray,
  deleteElementIC,
  moveElemDownIC,
  moveElemUpIC,
} from '../../Interfaces/InterfaceUtils';

export default class SurveyEditState
  implements Clonable<SurveyEditState>, Identifiable
{
  private originalSurvey: Survey;
  id: string;
  title: string;
  description: string;
  audience: UserType.asUnion[];
  questions: QuestionEditState[];
  surveyVersion: number;
  isActive: boolean;
  autoFocusIsActive: boolean;

  static emptySurvey = new Survey(createId(), '', '', [], [], 0);

  constructor(survey: Survey = SurveyEditState.emptySurvey) {
    this.originalSurvey = survey;
    this.id = survey.id;
    this.title = survey.title;
    this.description = survey.description;
    this.audience = [...survey.audience];
    this.questions = survey.questions.map(
      (ques) => new QuestionEditState(ques)
    );
    this.surveyVersion = survey.version;
    this.isActive = survey.deactivatedAt ? false : true;
    this.autoFocusIsActive = false;
  }

  buildSurvey(): Survey {
    const origDeactivDate = this.originalSurvey.deactivatedAt;
    let deactivationDate: Date | undefined;
    if (this.isActive) {
      deactivationDate = undefined;
    } else if (origDeactivDate) {
      deactivationDate = origDeactivDate;
    } else {
      deactivationDate = new Date();
    }

    const output = new Survey(
      this.id,
      this.title,
      this.description,
      this.audience,
      this.questions.map((ques) => ques.buildQuestion()),
      this.surveyVersion,
      deactivationDate,
      this.originalSurvey.updatedAt
    );

    if (!this.originalSurvey.isEqual(output)) {
      output.version += 1;
      output.updatedAt = new Date();
    }

    return output;
  }

  clone(): SurveyEditState {
    const clone = new SurveyEditState(this.originalSurvey);
    clone.title = this.title;
    clone.description = this.description;
    clone.surveyVersion = this.surveyVersion;
    clone.audience = [...this.audience];
    clone.isActive = this.isActive;
    clone.questions = this.questions.map((ques) => ques.clone());
    clone.autoFocusIsActive = this.autoFocusIsActive;

    return clone;
  }

  applyQuestionReducer(
    targetId: string,
    reducer: Reducer<QuestionEditState>
  ): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.questions = cloneTransformArray(
        newState.questions,
        targetId,
        reducer
      );
      return newState;
    };
  }

  // --------------------- Reducer creators ---------------------
  static createSetTitle(newTitle: string): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.title = newTitle;
      return newState;
    };
  }

  static createSetDescription(
    newDescription: string
  ): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.description = newDescription;
      return newState;
    };
  }

  static createToggleIsActive(): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.isActive = !oldState.isActive;
      return newState;
    };
  }

  static createSetAutoFocus(autoFocus: boolean): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.autoFocusIsActive = autoFocus;
      return newState;
    };
  }

  static createMoveQuestionUp(targetId: string): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.questions = moveElemUpIC(newState.questions, targetId);
      return newState;
    };
  }

  static createMoveQuestionDown(targetId: string): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.questions = moveElemDownIC(newState.questions, targetId);
      return newState;
    };
  }

  static createAddQuestion(): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.questions.push(new QuestionEditState());
      return newState;
    };
  }

  static createDeleteQuestion(targetId: string): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.questions = deleteElementIC(newState.questions, targetId);
      return newState;
    };
  }

  static createAddUserType(
    userType: UserType.asUnion
  ): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      const audience = newState.audience;
      if (!audience.includes(userType)) {
        newState.audience = [...audience, userType];
      }

      return newState;
    };
  }

  static createDeleteUserType(
    userType: UserType.asUnion
  ): Reducer<SurveyEditState> {
    return (oldState: SurveyEditState): SurveyEditState => {
      const newState = oldState.clone();
      newState.audience = newState.audience.filter((type) => type !== userType);
      return newState;
    };
  }
}
