import createId from '../../../utils/createId';
import Question from '../../../model/survey/question/Question';
import { createEditState } from './utils';
import { isQuestionType } from '../../../model/survey/questionTypes';

class EditState {
  constructor(questionType, isRequired, questionText, id = null) {
    if (!isQuestionType(questionType)) {
      throw new TypeError('Argument is invalid QuestionType');
    }

    this.type = questionType;
    this.isRequired = isRequired;
    this.text = questionText;

    if (id) {
      this.id = id;
    } else {
      this.id = createId();
    }
  }

  clone() {
    return new EditState(this.type, this.isRequired, this.text, this.id);
  }

  createChangeQType(newQuestionType) {
    if (!isQuestionType(newQuestionType)) {
      throw new TypeError('Argument is invalid QuestionType');
    }

    return (oldState) => {
      const newState = new Question(
        newQuestionType,
        oldState.isRequired,
        oldState.text,
        oldState.id
      );

      if (oldState.hasOwnProperty('options')) {
        newState.options = oldState.options;
      }
      if (oldState.hasOwnProperty('rowQuestions')) {
        newState.rowQuestions = oldState.rowQuestions;
      }
      if (oldState.hasOwnProperty('isOneToOne')) {
        newState.isOneToOne = oldState.isOneToOne;
      }

      return createEditState(newState);
    };
  }
}

export default EditState;
