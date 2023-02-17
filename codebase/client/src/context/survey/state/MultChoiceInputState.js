import InputState from './InputState';
import OptionInputState from './OptionInputState';
import Option from '../../../model/survey/question/Option';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';

const fromResponse = (response, options) => {
  const optId = response.id;
  const isSelected = response.isSelected;
  const optText = response.text;

  return options.map((opt) => {
    if (opt.id === optId) {
      return new OptionInputState(optText, optId, isSelected);
    } else {
      return new OptionInputState(opt.text, opt.id, opt.isSelected);
    }
  });
};

class MultChoiceInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    options,
    response = null
  ) {
    super(
      Qtypes.MULT_CHOICE,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    // console.log('In constructor MultChoiceInputState():');
    // console.log(options);

    for (const opt of options) {
      if (!(opt instanceof OptionInputState || opt instanceof Option)) {
        throw new TypeError(
          'In constructor MultChoiceInputState(): At least one element of options is not an Option or OptionInputState.'
        );
      }
    }

    if (response) {
      this.options = fromResponse(response, options);
    } else {
      this.options = options.map((opt) => {
        if (opt instanceof OptionInputState) {
          return opt.clone();
        } else if (opt instanceof Option) {
          return new OptionInputState(opt.text, opt.id, false);
        } else if (opt.hasOwnProperty('text') && opt.hasOwnProperty('id')) {
          return new OptionInputState(opt.text, opt.id, false);
        } else {
          throw new TypeError(
            `In constructor MultChoiceInputState(): ${options} passed into parameter options is not an array of Options or OptionInputStates`
          );
        }
      });
    }
  }

  // Returns true if there is at least one option checked
  isAnswered() {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].isSelected) return true;
    }

    return false;
  }

  clone() {
    let newState = new MultChoiceInputState(
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

  createSetOption(selectedOptId) {
    return (oldState) => {
      const newOpts = oldState.options.map((opt) => {
        if (opt.id === selectedOptId) {
          return new OptionInputState(opt.text, opt.id, true);
        } else {
          return new OptionInputState(opt.text, opt.id, false);
        }
      });

      // console.log(newOpts);

      return new MultChoiceInputState(
        oldState.isRequired,
        oldState.text,
        oldState.header,
        oldState.id,
        newOpts
      );
    };
  }

  toResponse() {
    let value = [];
    for (let opt of this.options) {
      if (opt.isSelected) {
        value = [opt.toResponseVal()];
        break;
      }
    }

    const res = new Response(
      this.type,
      this.text,
      this.id,
      value,
      MultChoiceInputState.cloneVal
    );
    return res;
  }

  static cloneVal = (val) =>
    val.map((opt) => {
      return OptionInputState.cloneVal(opt);
    });
}

export default MultChoiceInputState;
