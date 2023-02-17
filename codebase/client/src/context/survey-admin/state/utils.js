import * as Qtypes from '../../../model/survey/questionTypes';
import MultChoiceQuestion from '../../../model/survey/question/MultChoiceQuestion';
import Option from '../../../model/survey/question/Option';

import ShortAnswerEditState from './ShortAnswerEditState';
import LongAnswerEditState from './LongAnswerEditState';
import MultChoiceEditState from './MultChoiceEditState';
import CheckboxEditState from './CheckboxEditState';
import CheckboxGridEditState from './CheckboxGridEditState';
import MultChoiceGridEditState from './MultChoiceGridEditState';
import NumberEditState from './NumberEditState';

// Use a Question object to create an EditState
// The default question type is Multiple Choice
export const createEditState = (
  ques = new MultChoiceQuestion(false, 'Question text', [
    new Option('Option 1'),
  ])
) => {
  let newState = null;

  switch (ques.type) {
    case Qtypes.SHORT_ANSWER:
      newState = new ShortAnswerEditState(ques.isRequired, ques.text, ques.id);
      break;
    case Qtypes.NUMBER:
      newState = new NumberEditState(ques.isRequired, ques.text, ques.id);
      break;
    case Qtypes.LONG_ANSWER:
      newState = new LongAnswerEditState(ques.isRequired, ques.text, ques.id);
      break;
    case Qtypes.MULT_CHOICE:
      newState = new MultChoiceEditState(
        ques.isRequired,
        ques.text,
        ques.options,
        ques.id
      );
      break;
    case Qtypes.CHECKBOX:
      newState = new CheckboxEditState(
        ques.isRequired,
        ques.text,
        ques.options,
        ques.id
      );
      break;
    case Qtypes.CHECKBOX_GRID:
      newState = new CheckboxGridEditState(
        ques.isRequired,
        ques.isAllRequired,
        ques.text,
        ques.rowQuestions,
        ques.options,
        ques.id
      );
      break;
    case Qtypes.MULT_CHOICE_GRID:
      newState = new MultChoiceGridEditState(
        ques.isRequired,
        ques.isAllRequired,
        ques.text,
        ques.isOneToOne,
        ques.rowQuestions,
        ques.options,
        ques.id
      );
      break;
    default:
      return null;
  } // switch

  // We save the contents of these properties if the user changes question types because it may save the user from frustration. Imagine if a user is editing a multiple choice question and wants to change the question to a checkbox, but accidentally clicks the short answer option. All their progress on their list of options would be lost if we didn't save the contents of these properties.
  if (ques.hasOwnProperty('options')) {
    newState.options = ques.options.map((opt) => opt.clone());
  }
  if (ques.hasOwnProperty('rowQuestions')) {
    newState.rowQuestions = ques.rowQuestions.map((row) => row.clone());
  }
  if (ques.hasOwnProperty('isOneToOne')) {
    newState.isOneToOne = ques.isOneToOne;
  }

  return newState;
};
