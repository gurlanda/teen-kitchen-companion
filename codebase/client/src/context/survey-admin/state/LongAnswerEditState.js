import LongAnswerQuestion from '../../../model/survey/question/LongAnswerQuestion';
import { LONG_ANSWER } from '../../../model/survey/questionTypes';
import EditState from './EditState';

class LongAnswerEditState extends EditState {
  constructor(isRequired, questionText, id = null) {
    super(LONG_ANSWER, isRequired, questionText, id);
  }

  clone() {
    return new LongAnswerEditState(this.isRequired, this.text, this.id);
  }

  // Converts to a format that the server can accept
  toStorable() {
    return {
      isRequired: this.isRequired,
      questionText: this.text,
      type: this.type,
      id: this.id,
      additionalData: {
        numLines: null, // Unsure if still needed
      },
    };
  }

  // Converts the current state to a Question object
  toQuestion() {
    return new LongAnswerQuestion(this.isRequired, this.text, null, this.id);
  }

  createToggleIsRequired() {
    return (oldState) => {
      return new LongAnswerEditState(
        !oldState.isRequired,
        oldState.text,
        oldState.id
      );
    };
  }

  createSetQuestionText(newQuestionText) {
    return (oldState) => {
      return new LongAnswerEditState(
        oldState.isRequired,
        newQuestionText,
        oldState.id
      );
    };
  }
}

export default LongAnswerEditState;
