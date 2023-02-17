import InputState from './InputState';
import OptionInputState from './OptionInputState';
import Option from '../../../model/survey/question/Option';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';

class CheckboxInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    options,
    response = null
  ) {
    super(
      Qtypes.CHECKBOX,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    this.options = options.map((opt) => {
      if (opt instanceof OptionInputState) {
        return opt.clone();
      } else if (opt instanceof Option) {
        return new OptionInputState(opt.text, opt.id, false);
      } else if (opt.hasOwnProperty('text') && opt.hasOwnProperty('id')) {
        return new OptionInputState(opt.text, opt.id, false);
      } else {
        throw new TypeError(
          `In constructor CheckboxInputState(): ${options} passed into parameter options is not an array of Options or OptionInputStates`
        );
      }
    });
  }

  // Returns true if there is at least one option checked
  isAnswered() {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].isSelected) return true;
    }

    return false;
  }

  clone() {
    let newState = new CheckboxInputState(
      this.isRequired,
      this.text,
      this.header,
      this.id,
      this.options
    );

    newState.isDanger = this.isDanger;
    return newState;
  }

  cloneOptions() {
    return this.options.map((opt) => opt.clone());
  }

  createSetDanger(isDanger) {
    return (oldState) => {
      let newState = oldState.clone();
      newState.isDanger = isDanger;
      return newState;
    };
  }

  createSetOption(selectedOptId, newOptState) {
    return (oldState) => {
      const newOptions = oldState.options.map((opt) => {
        if (opt.id === selectedOptId) {
          return new OptionInputState(opt.text, opt.id, newOptState);
        } else {
          return opt.clone();
        }
      });

      return new CheckboxInputState(
        this.isRequired,
        this.text,
        this.header,
        this.id,
        newOptions
      );
    };
  }

  toResponse() {
    const value = this.options
      .filter((opt) => opt.isSelected)
      .map((opt) => opt.toResponseVal());

    return new Response(
      this.type,
      this.text,
      this.id,
      value,
      CheckboxInputState.cloneVal
    );
  }

  static cloneVal = (val) =>
    val.map((opt) => {
      return OptionInputState.cloneVal(opt);
    });
}

export default CheckboxInputState;
