import createId from '../../../utils/createId';
import * as Qtypes from '../questionTypes';
import * as InputStateTypes from '../../../context/survey/state/inputStateTypes.js';

// To create a Response object, we have to pass in a function that properly clones the stored value. This function depends on the question type. getCloneVal() returns the proper cloning function based off the question type.
const getCloneVal = (qtype) => {
  switch (qtype) {
    case Qtypes.NUMBER:
      return InputStateTypes.NumberInputState.cloneVal;
    case Qtypes.CHECKBOX:
      return InputStateTypes.CheckboxInputState.cloneVal;
    case Qtypes.MULT_CHOICE:
      return InputStateTypes.MultChoiceInputState.cloneVal;
    case Qtypes.SHORT_ANSWER:
      return InputStateTypes.ShortAnswerInputState.cloneVal;
    case Qtypes.LONG_ANSWER:
      return InputStateTypes.LongAnswerInputState.cloneVal;
    case Qtypes.CHECKBOX_GRID:
      return InputStateTypes.CheckboxGridInputState.cloneVal;
    case Qtypes.MULT_CHOICE_GRID:
      return InputStateTypes.MultChoiceGridInputState.cloneVal;
    case Qtypes.DATE_TIME:
      return InputStateTypes.DateTimeInputState.cloneVal;
    case Qtypes.LINEAR_SCALE:
      return InputStateTypes.LinearScaleInputState.cloneVal;
    case Qtypes.IMG_LINEAR_SCALE:
      return InputStateTypes.ImgLinearScaleInputState.cloneVal;
    default:
      throw new Qtypes.QuestionTypeError(
        `In getCloneVal(): Value-cloning function not implemented for question type ${qtype}`
      );
  }
};

class Response {
  constructor(
    questionType,
    questionText,
    questionId,
    value,
    cloneVal,
    responseId = null
  ) {
    if (!Qtypes.asArray.includes(questionType)) {
      throw new Qtypes.QuestionTypeError(
        `In constructor Response(): ${questionType} passed into parameter questionType is not a QuestionType`
      );
    }

    this.questionType = questionType;
    this.questionText = questionText;
    this.questionId = questionId;

    this.cloneVal = cloneVal ?? getCloneVal(questionType);
    this.value = this.cloneVal(value);

    if (responseId) {
      this.id = responseId;
    } else {
      this.id = createId();
    }
  }

  clone() {
    return Response.from(this);
  }

  toStorable() {
    return {
      questionType: this.questionType,
      questionText: this.questionText,
      questionId: this.questionId,
      id: this.id,
      value: this.value,
    };
  }

  static from(otherResponse) {
    if (!(otherResponse instanceof Response)) {
      throw new TypeError(
        'In static Response.from(): Given argument is not of type Response'
      );
    }

    return new Response(
      otherResponse.questionType,
      otherResponse.questionText,
      otherResponse.questionId,
      otherResponse.cloneVal(otherResponse.value),
      otherResponse.cloneVal,
      otherResponse.id
    );
  }

  static fromData(data) {
    try {
      return new Response(
        data?.questionType,
        data?.questionText,
        data?.questionId,
        data?.value,
        getCloneVal(data?.questionType),
        data?.id ?? data?._id
      );
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          'In Response.fromData(): A new Response cannot be created from the given data.'
        );
      }
    }
  }
}

export default Response;
