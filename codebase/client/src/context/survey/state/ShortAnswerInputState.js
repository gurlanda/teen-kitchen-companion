import InputState from './InputState';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';
const DEFAULT_RESPONSE = '';

class ShortAnswerInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    response = DEFAULT_RESPONSE
  ) {
    super(
      Qtypes.SHORT_ANSWER,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    if (
      !(
        response instanceof String ||
        typeof response === 'string' ||
        response === null
      )
    ) {
      throw new TypeError(
        'In constructor ShortAnswerInputState(): Argument passed into parameter response is not a valid type.'
      );
    }

    this.response = response;
  }

  isAnswered() {
    return this.response !== DEFAULT_RESPONSE;
  }

  clone() {
    let newState = new ShortAnswerInputState(
      this.isRequired,
      this.text,
      this.header,
      this.id,
      this.response
    );

    newState.isDanger = this.isDanger;
    return newState;
  }

  createSetDanger(isDanger) {
    return (oldState) => {
      let newState = oldState.clone();
      newState.isDanger = isDanger;
      return newState;
    };
  }

  createSetResponse(newResponse) {
    return (oldState) => {
      return new ShortAnswerInputState(
        oldState.isRequired,
        oldState.text,
        oldState.header,
        oldState.id,
        newResponse
      );
    };
  }

  toResponse() {
    return new Response(
      this.type,
      this.text,
      this.id,
      this.response,
      ShortAnswerInputState.cloneVal
    );
  }

  static cloneVal = (val) => val;
}

export default ShortAnswerInputState;
