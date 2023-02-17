import ShortAnswerQuestion from '../../../model/survey/question/ShortAnswerQuestion';
import { SHORT_ANSWER } from '../../../model/survey/questionTypes';
import EditState from './EditState';

class ShortAnswerEditState extends EditState {
  constructor(isRequired, questionText, id = null) {
    super(SHORT_ANSWER, isRequired, questionText, id);
  }

  clone() {
    return new ShortAnswerEditState(this.isRequired, this.text, this.id);
  }

  // Converts to a format that the server can accept
  toStorable() {
    return {
      isRequired: this.isRequired,
      questionText: this.text,
      type: this.type,
      id: this.id,
      additionalData: null,
    };
  }

  // Converts the current state to a Question object
  toQuestion() {
    return new ShortAnswerQuestion(this.isRequired, this.text, this.id);
  }

  createToggleIsRequired() {
    return (oldState) => {
      return new ShortAnswerEditState(
        !oldState.isRequired,
        oldState.text,
        oldState.id
      );
    };
  }

  createSetQuestionText(newQuestionText) {
    return (oldState) => {
      return new ShortAnswerEditState(
        oldState.isRequired,
        newQuestionText,
        oldState.id
      );
    };
  }
}

export default ShortAnswerEditState;
