import InputState from './InputState';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';
const DEFAULT_RESPONSE = null;

class NumberInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    value = DEFAULT_RESPONSE
  ) {
    super(Qtypes.NUMBER, isRequired, questionText, questionHeader, questionId);
    this.value = value;
  }

  isAnswered() {
    return this.value !== DEFAULT_RESPONSE;
  }

  clone() {
    let newState = new NumberInputState(
      this.isRequired,
      this.text,
      this.id,
      this.value
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

  createSetValue(newValue) {
    return (oldState) => {
      return new NumberInputState(
        oldState.isRequired,
        oldState.text,
        oldState.id,
        newValue
      );
    };
  }

  toResponse() {
    return new Response(
      this.type,
      this.text,
      this.id,
      this.value,
      NumberInputState.cloneVal
    );
  }

  static cloneVal = (val) => val;
}

export default NumberInputState;
