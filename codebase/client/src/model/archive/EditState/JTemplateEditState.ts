import Clonable from '../../Interfaces/Clonable';
import Reducer from '../../Interfaces/Reducer';
import QuestionEditState from './QuestionEditState';
import {
  cloneTransformArray,
  deleteElementIC,
  moveElemDownIC,
  moveElemUpIC,
} from '../../Interfaces/InterfaceUtils';
import JournalTemplate from '../Journal/JournalTemplate';

export default class JTemplateEditState
  implements Clonable<JTemplateEditState>
{
  private originalTemplate: JournalTemplate;
  questions: QuestionEditState[];
  autoFocusIsActive: boolean;

  static emptyJournalTemplate = new JournalTemplate([]);

  constructor(
    journalTemplate: JournalTemplate = JTemplateEditState.emptyJournalTemplate
  ) {
    this.originalTemplate = journalTemplate.clone();
    this.questions = journalTemplate.questions.map(
      (elem) => new QuestionEditState(elem)
    );
    this.autoFocusIsActive = false;
  }

  buildTemplate(): JournalTemplate {
    return new JournalTemplate(
      this.questions.map((elem) => elem.buildQuestion())
    );
  }

  clone(): JTemplateEditState {
    const clone = new JTemplateEditState(this.originalTemplate);
    clone.questions = this.questions.map((elem) => elem.clone());
    clone.autoFocusIsActive = this.autoFocusIsActive;
    return clone;
  }

  applyQuestionReducer(
    targetId: string,
    reducer: Reducer<QuestionEditState>
  ): Reducer<JTemplateEditState> {
    return (oldState: JTemplateEditState): JTemplateEditState => {
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
  static createSetAutoFocus(autoFocus: boolean): Reducer<JTemplateEditState> {
    return (oldState: JTemplateEditState): JTemplateEditState => {
      const newState = oldState.clone();
      newState.autoFocusIsActive = autoFocus;
      return newState;
    };
  }

  static createMoveQuestionUp(targetId: string): Reducer<JTemplateEditState> {
    return (oldState: JTemplateEditState): JTemplateEditState => {
      const newState = oldState.clone();
      newState.questions = moveElemUpIC(newState.questions, targetId);
      return newState;
    };
  }

  static createMoveQuestionDown(targetId: string): Reducer<JTemplateEditState> {
    return (oldState: JTemplateEditState): JTemplateEditState => {
      const newState = oldState.clone();
      newState.questions = moveElemDownIC(newState.questions, targetId);
      return newState;
    };
  }

  static createAddQuestion(): Reducer<JTemplateEditState> {
    return (oldState: JTemplateEditState): JTemplateEditState => {
      const newState = oldState.clone();
      newState.questions.push(new QuestionEditState());
      return newState;
    };
  }

  static createDeleteQuestion(targetId: string): Reducer<JTemplateEditState> {
    return (oldState: JTemplateEditState): JTemplateEditState => {
      const newState = oldState.clone();
      newState.questions = deleteElementIC(newState.questions, targetId);
      return newState;
    };
  }
}
