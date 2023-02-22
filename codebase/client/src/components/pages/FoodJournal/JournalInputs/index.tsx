import CheckboxGridJournalInput from './CheckboxGridJournalInput';
import CheckboxJournalInput from './CheckboxJournalInput';
import DateTimeJournalInput from './DateTimeJournalInput';
// import TimeJournalInput from './TimeJournalInput';
import DateJournalInput from './DateJournalInput';
// import ImgLinearScaleJournalInput from './ImgLinearScaleJournalInput';
// import LinearScaleJournalInput from './LinearScaleJournalInput';
import LongAnswerJournalInput from './LongAnswerJournalInput';
// import MultChoiceGridJournalInput from './MultChoiceGridJournalInput';
import MultChoiceJournalInput from './MultChoiceJournalInput';
import NumberJournalInput from './NumberJournalInput';
import ShortAnswerJournalInput from './ShortAnswerJournalInput';
import QuestionType from 'src/model/Question/QuestionType';
import QuestionInputState from 'src/model/InputState/QuestionInputState';

export { default as CheckboxGridJournalInput } from './CheckboxGridJournalInput';
export { default as CheckboxJournalInput } from './CheckboxJournalInput';
export { default as DateTimeJournalInput } from './DateTimeJournalInput';
// export { default as TimeJournalInput } from './TimeJournalInput';
export { default as DateJournalInput } from './DateJournalInput';
// export { default as ImgLinearScaleJournalInput } from './ImgLinearScaleJournalInput';
// export { default as LinearScaleJournalInput } from './LinearScaleJournalInput';
export { default as LongAnswerJournalInput } from './LongAnswerJournalInput';
// export { default as MultChoiceGridJournalInput } from './MultChoiceGridJournalInput';
export { default as MultChoiceJournalInput } from './MultChoiceJournalInput';
export { default as NumberJournalInput } from './NumberJournalInput';
export { default as ShortAnswerJournalInput } from './ShortAnswerJournalInput';

export const asArray = [
  CheckboxGridJournalInput,
  CheckboxJournalInput,
  DateTimeJournalInput,
  // TimeJournalInput,
  DateJournalInput,
  // ImgLinearScaleJournalInput,
  // LinearScaleJournalInput,
  LongAnswerJournalInput,
  // MultChoiceGridJournalInput,
  MultChoiceJournalInput,
  NumberJournalInput,
  ShortAnswerJournalInput,
];

export const stateToJournalInput = (
  questionType: QuestionType.asUnion,
  question: QuestionInputState
) => {
  switch (questionType) {
    case QuestionType.CHECKBOX:
      return <CheckboxJournalInput question={question} />;
    case QuestionType.CHECKBOX_GRID:
      return <CheckboxGridJournalInput question={question} />;
    case QuestionType.DATE_TIME:
      return <DateTimeJournalInput question={question} />;
    // case QuestionType.TIME:
    //   return <TimeJournalInput question={question} />;
    case QuestionType.DATE:
      return <DateJournalInput question={question} />;
      // case QuestionType.IMG_LINEAR_SCALE:
      //   return <ImgLinearScaleJournalInput question={question} />;
      // case QuestionType.LINEAR_SCALE:
      //   return <LinearScaleJournalInput question={question} />;
      // case QuestionType.LONG_ANSWER:
      return <LongAnswerJournalInput question={question} />;
    // case QuestionType.MULT_CHOICE_GRID:
    //   return <MultChoiceGridJournalInput question={question} />;
    case QuestionType.MULT_CHOICE:
      return <MultChoiceJournalInput question={question} />;
    case QuestionType.NUMBER:
      return <NumberJournalInput question={question} />;
    case QuestionType.SHORT_ANSWER:
      return <ShortAnswerJournalInput question={question} />;
    default:
      throw new TypeError(
        `In JournalInputs > stateToJournalInput(): Given argument ${questionType} does not have an associated JournalInput`
      );
  }
};
