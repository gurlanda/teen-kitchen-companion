import InputState from './InputState';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';
const DEFAULT_RESPONSE = '';

class LongAnswerInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    response = DEFAULT_RESPONSE
  ) {
    super(
      Qtypes.LONG_ANSWER,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );
    this.response = response;
  }

  isAnswered() {
    return this.response !== DEFAULT_RESPONSE;
  }

  clone() {
    let newState = new LongAnswerInputState(
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
      return new LongAnswerInputState(
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
      LongAnswerInputState.cloneVal
    );
  }

  static cloneVal = (val) => val;
}

export default LongAnswerInputState;
