import {
  CHECKBOX,
  MULT_CHOICE,
  SHORT_ANSWER,
  LONG_ANSWER,
  NUMBER,
  CHECKBOX_GRID,
  MULT_CHOICE_GRID,
} from '../../../model/survey/questionTypes';
import CheckboxInput from './inputs/CheckboxInput';
import MultChoiceInput from './inputs/MultChoiceInput';
import ShortAnswerInput from './inputs/ShortAnswerInput';
import LongAnswerInput from './inputs/LongAnswerInput';
import NumberInput from './inputs/NumberInput';
import CheckboxGridInput from './inputs/CheckboxGridInput';
import MultChoiceGridInput from './inputs/MultChoiceGridInput';

const questionStateToInput = (questionType, questionId) => {
  switch (questionType) {
    case CHECKBOX:
      return <CheckboxInput questionId={questionId} />;
    case MULT_CHOICE:
      return <MultChoiceInput questionId={questionId} />;
    case SHORT_ANSWER:
      return <ShortAnswerInput questionId={questionId} />;
    case LONG_ANSWER:
      return <LongAnswerInput questionId={questionId} />;
    case NUMBER:
      return <NumberInput questionId={questionId} />;
    case CHECKBOX_GRID:
      return <CheckboxGridInput questionId={questionId} />;
    case MULT_CHOICE_GRID:
      return <MultChoiceGridInput questionId={questionId} />;
    default:
      return null;
  }
};

export { questionStateToInput };
