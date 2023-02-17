import CheckboxGridJournalInput from './CheckboxGridJournalInput';
import CheckboxJournalInput from './CheckboxJournalInput';
import DateTimeJournalInput from './DateTimeJournalInput';
import TimeJournalInput from './TimeJournalInput';
import DateJournalInput from './DateJournalInput';
import ImgLinearScaleJournalInput from './ImgLinearScaleJournalInput';
import LinearScaleJournalInput from './LinearScaleJournalInput';
import LongAnswerJournalInput from './LongAnswerJournalInput';
import MultChoiceGridJournalInput from './MultChoiceGridJournalInput';
import MultChoiceJournalInput from './MultChoiceJournalInput';
import NumberJournalInput from './NumberJournalInput';
import ShortAnswerJournalInput from './ShortAnswerJournalInput';
import * as Qtypes from 'src/model/survey/questionTypes';

export { default as CheckboxGridJournalInput } from './CheckboxGridJournalInput';
export { default as CheckboxJournalInput } from './CheckboxJournalInput';
export { default as DateTimeJournalInput } from './DateTimeJournalInput';
export { default as TimeJournalInput } from './TimeJournalInput';
export { default as DateJournalInput } from './DateJournalInput';
export { default as ImgLinearScaleJournalInput } from './ImgLinearScaleJournalInput';
export { default as LinearScaleJournalInput } from './LinearScaleJournalInput';
export { default as LongAnswerJournalInput } from './LongAnswerJournalInput';
export { default as MultChoiceGridJournalInput } from './MultChoiceGridJournalInput';
export { default as MultChoiceJournalInput } from './MultChoiceJournalInput';
export { default as NumberJournalInput } from './NumberJournalInput';
export { default as ShortAnswerJournalInput } from './ShortAnswerJournalInput';

export const asArray = [
  CheckboxGridJournalInput,
  CheckboxJournalInput,
  DateTimeJournalInput,
  TimeJournalInput,
  DateJournalInput,
  ImgLinearScaleJournalInput,
  LinearScaleJournalInput,
  LongAnswerJournalInput,
  MultChoiceGridJournalInput,
  MultChoiceJournalInput,
  NumberJournalInput,
  ShortAnswerJournalInput,
];

export const stateToJournalInput = (questionType, questionId) => {
  switch (questionType) {
    case Qtypes.CHECKBOX:
      return <CheckboxJournalInput questionId={questionId} />;
    case Qtypes.CHECKBOX_GRID:
      return <CheckboxGridJournalInput questionId={questionId} />;
    case Qtypes.DATE_TIME:
      return <DateTimeJournalInput questionId={questionId} />;
    case Qtypes.TIME:
      return <TimeJournalInput questionId={questionId} />;
    case Qtypes.DATE:
      return <DateJournalInput questionId={questionId} />;
    case Qtypes.IMG_LINEAR_SCALE:
      return <ImgLinearScaleJournalInput questionId={questionId} />;
    case Qtypes.LINEAR_SCALE:
      return <LinearScaleJournalInput questionId={questionId} />;
    case Qtypes.LONG_ANSWER:
      return <LongAnswerJournalInput questionId={questionId} />;
    case Qtypes.MULT_CHOICE_GRID:
      return <MultChoiceGridJournalInput questionId={questionId} />;
    case Qtypes.MULT_CHOICE:
      return <MultChoiceJournalInput questionId={questionId} />;
    case Qtypes.NUMBER:
      return <NumberJournalInput questionId={questionId} />;
    case Qtypes.SHORT_ANSWER:
      return <ShortAnswerJournalInput questionId={questionId} />;
    default:
      throw new TypeError(
        `In JournalInputs > stateToJournalInput(): Given argument ${questionType} does not have an associated JournalInput`
      );
  }
};
