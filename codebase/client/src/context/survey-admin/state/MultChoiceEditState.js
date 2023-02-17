import { MULT_CHOICE } from '../../../model/survey/questionTypes';
import EditState from './EditState';
import Option from '../../../model/survey/question/Option';
import { moveElemUp, moveElemDown } from '../../../utils/utils';
import MultChoiceQuestion from '../../../model/survey/question/MultChoiceQuestion';

class MultChoiceEditState extends EditState {
  constructor(isRequired, questionText, options = null, id = null) {
    super(MULT_CHOICE, isRequired, questionText, id);

    if (options) {
      this.options = options.map((opt) => opt.clone());
    } else {
      this.options = [new Option('Option 1')];
    }
  }

  clone() {
    return new MultChoiceEditState(
      this.isRequired,
      this.text,
      this.options,
      this.id
    );
  }

  // Converts to a format that the server can accept
  toStorable() {
    const opts = this.options.map((opt) => opt.toStorable());

    return {
      isRequired: this.isRequired,
      questionText: this.text,
      type: this.type,
      id: this.id,
      additionalData: { options: opts },
    };
  }

  // Converts the current state to a Question object
  toQuestion() {
    return new MultChoiceQuestion(
      this.isRequired,
      this.text,
      this.options,
      this.id
    );
  }

  createToggleIsRequired() {
    return (oldState) => {
      return new MultChoiceEditState(
        !oldState.isRequired,
        oldState.text,
        oldState.options,
        oldState.id
      );
    };
  }

  createSetQuestionText(newQuestionText) {
    return (oldState) => {
      return new MultChoiceEditState(
        oldState.isRequired,
        newQuestionText,
        oldState.options,
        oldState.id
      );
    };
  }

  createAddOption() {
    return (oldState) => {
      // Deep copy the array
      const opts = oldState.options.map((opt) => opt.clone());
      opts.push(new Option('Option text'));

      return new MultChoiceEditState(
        oldState.isRequired,
        oldState.text,
        opts,
        oldState.id
      );
    };
  }

  createEditOptionText(optText, optId) {
    return (oldState) => {
      const opts = oldState.options.map((opt) => {
        if (opt.id === optId) {
          return new Option(optText, false, optId);
        } else {
          return opt.clone();
        }
      });

      return new MultChoiceEditState(
        oldState.isRequired,
        oldState.text,
        opts,
        oldState.id
      );
    };
  }

  createMoveUpOption(optId) {
    return (oldState) => {
      const targetIndex = oldState.options.findIndex((opt) => opt.id === optId);

      // Do nothing if there is no Option with the given ID
      if (targetIndex <= 0) {
        return oldState;
      }

      const optsCopy = oldState.options.map((opt) => opt.clone());
      const newOpts = moveElemUp(optsCopy, targetIndex);

      return new MultChoiceEditState(
        oldState.isRequired,
        oldState.text,
        newOpts,
        oldState.id
      );
    };
  }

  createMoveDownOption(optId) {
    return (oldState) => {
      const targetIndex = oldState.options.findIndex((opt) => opt.id === optId);

      const optsCopy = oldState.options.map((opt) => opt.clone());
      const newOpts = moveElemDown(optsCopy, targetIndex);

      return new MultChoiceEditState(
        oldState.isRequired,
        oldState.text,
        newOpts,
        oldState.id
      );
    };
  }

  createDeleteOption(optId) {
    return (oldState) => {
      const opts = oldState.options.filter((opt) => opt.id !== optId);

      return new MultChoiceEditState(
        oldState.isRequired,
        oldState.text,
        opts,
        oldState.id
      );
    };
  }
}

export default MultChoiceEditState;
