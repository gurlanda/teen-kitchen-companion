import * as Qtypes from '../../../model/survey/questionTypes';
import ShortAnswerInputState from './ShortAnswerInputState';
import NumberInputState from './NumberInputState';
import LongAnswerInputState from './LongAnswerInputState';
import MultChoiceInputState from './MultChoiceInputState';
import CheckboxInputState from './CheckboxInputState';
import CheckboxGridInputState from './CheckboxGridInputState';
import MultChoiceGridInputState from './MultChoiceGridInputState';
import * as InputTypes from './inputStateTypes';

// Use a Question object to create an InputState
export const createInputState = (ques, response = null) => {
  try {
    if (ques?.text === undefined) {
      ques.text = ques.questionText;
    }

    switch (ques.type) {
      case Qtypes.SHORT_ANSWER:
        return new ShortAnswerInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          response
        );
      case Qtypes.NUMBER:
        return new NumberInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          response
        );
      case Qtypes.LONG_ANSWER:
        return new LongAnswerInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          response
        );
      case Qtypes.MULT_CHOICE:
        return new MultChoiceInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          ques.options,
          response
        );
      case Qtypes.CHECKBOX:
        return new CheckboxInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          ques.options,
          response
        );
      case Qtypes.CHECKBOX_GRID:
        return new CheckboxGridInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          ques.options,
          ques.rowQuestions,
          response
        );
      case Qtypes.MULT_CHOICE_GRID:
        return new MultChoiceGridInputState(
          ques.isRequired,
          ques.isOneToOne,
          ques.text,
          ques.header,
          ques.id,
          ques.options,
          ques.rowQuestions,
          response
        );
      case Qtypes.DATE_TIME:
        return new InputTypes.DateTimeInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          response
        );
      case Qtypes.DATE:
        return new InputTypes.DateInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          response
        );
      case Qtypes.TIME:
        return new InputTypes.TimeInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          response
        );
      case Qtypes.LINEAR_SCALE:
        return new InputTypes.LinearScaleInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          ques.min,
          ques.max,
          ques.step,
          ques.minText,
          ques.maxText,
          response
        );
      case Qtypes.IMG_LINEAR_SCALE:
        return new InputTypes.ImgLinearScaleInputState(
          ques.isRequired,
          ques.text,
          ques.header,
          ques.id,
          ques.scaleType,
          ques.minText,
          ques.maxText,
          ques.imgOptions,
          response
        );
      default:
        throw new TypeError(
          'In createInputState(): Could not create InputState, unhandled Question type.'
        );
    } // switch
  } catch (error) {
    console.log(
      'In createInputState(): Could not create InputState. Passed-in data:'
    );
    console.log(ques);

    throw error;
  }
};
