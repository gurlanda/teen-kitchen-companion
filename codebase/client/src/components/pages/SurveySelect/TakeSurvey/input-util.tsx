import QuestionType from 'src/model/Question/QuestionType';
import CheckboxInput from './inputs/CheckboxInput';
import MultChoiceInput from './inputs/MultChoiceInput';
import ShortAnswerInput from './inputs/ShortAnswerInput';
import LongAnswerInput from './inputs/LongAnswerInput';
import NumberInput from './inputs/NumberInput';
import CheckboxGridInput from './inputs/CheckboxGridInput';
import MultChoiceGridInput from './inputs/MultChoiceGridInput';
import QuestionInputState from 'src/model/InputState/QuestionInputState';

const questionStateToInput = (
  questionType: QuestionType.asUnion,
  question: QuestionInputState
): any => {
  switch (questionType) {
    case QuestionType.CHECKBOX:
      return <CheckboxInput question={question} />;
    case QuestionType.MULT_CHOICE:
      return <MultChoiceInput question={question} />;
    case QuestionType.SHORT_ANSWER:
      return <ShortAnswerInput question={question} />;
    case QuestionType.LONG_ANSWER:
      return <LongAnswerInput question={question} />;
    case QuestionType.NUMBER:
      return <NumberInput question={question} />;
    case QuestionType.CHECKBOX_GRID:
      return <CheckboxGridInput question={question} />;
    case QuestionType.MULT_CHOICE_GRID:
      return <MultChoiceGridInput question={question} />;
    default:
      return null;
  }
};

export { questionStateToInput };
