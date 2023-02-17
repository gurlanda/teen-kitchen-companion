import CheckboxGridQuestion from './question/CheckboxGridQuestion';
import CheckboxQuestion from './question/CheckboxQuestion';
import DateQuestion from './question/DateQuestion';
import LongAnswerQuestion from './question/LongAnswerQuestion';
import MultChoiceGridQuestion from './question/MultChoiceGridQuestion';
import MultChoiceQuestion from './question/MultChoiceQuestion';
import NumberQuestion from './question/NumberQuestion';
import ShortAnswerQuestion from './question/ShortAnswerQuestion';
import * as Qtypes from './questionTypes';

export const questionFromData = (ques) => {
  if (!ques.hasOwnProperty('type')) {
    throw new TypeError(
      `In questionFromData(): Question object cannot be created from ${ques} passed into parameter ques`
    );
  }

  switch (ques.type) {
    case Qtypes.SHORT_ANSWER:
      return ShortAnswerQuestion.fromData(ques);
    case Qtypes.LONG_ANSWER:
      return LongAnswerQuestion.fromData(ques);
    case Qtypes.NUMBER:
      return NumberQuestion.fromData(ques);
    case Qtypes.DATE:
      return DateQuestion.fromData(ques);
    case Qtypes.CHECKBOX:
      return CheckboxQuestion.fromData(ques);
    case Qtypes.MULT_CHOICE:
      return MultChoiceQuestion.fromData(ques);
    case Qtypes.CHECKBOX_GRID:
      return CheckboxGridQuestion.fromData(ques);
    case Qtypes.MULT_CHOICE_GRID:
      return MultChoiceGridQuestion.fromData(ques);
    default:
      // Code should NEVER reach here unless a new question type was created
      throw new TypeError(
        `In questionFromData(): ${ques} passed into parameter ques is of unknown QuestionType`
      );
  }
};
