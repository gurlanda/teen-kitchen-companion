import NumberQuestion from '../../../model/survey/question/NumberQuestion';
import { NUMBER } from '../../../model/survey/questionTypes';
import EditState from './EditState';

class NumberEditState extends EditState {
  constructor(isRequired, questionText, id = null) {
    super(NUMBER, isRequired, questionText, id);
  }

  clone() {
    return new NumberEditState(this.isRequired, this.text, this.id);
  }

  // Converts to a format that the server can accept
  toStorable() {
    return {
      isRequired: this.isRequired,
      questionText: this.text,
      type: this.type,
      id: this.id,
      additionalData: {
        // Unsure if still needed
        min: null,
        max: null,
        step: null,
      },
    };
  }

  // Converts the current state to a Question object
  toQuestion() {
    return new NumberQuestion(
      this.isRequired,
      this.text,
      null,
      null,
      null,
      this.id
    );
  }

  createToggleIsRequired() {
    return (oldState) => {
      return new NumberEditState(
        !oldState.isRequired,
        oldState.text,
        oldState.id
      );
    };
  }

  createSetQuestionText(newQuestionText) {
    return (oldState) => {
      return new NumberEditState(
        oldState.isRequired,
        newQuestionText,
        oldState.id
      );
    };
  }
}

export default NumberEditState;
