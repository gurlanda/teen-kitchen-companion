import OptionInputState from './OptionInputState';

export default class RowQuestionInputState {
  constructor(questionText, rowId, options) {
    this.text = questionText;
    this.id = rowId;
    this.options = options.map((opt) => {
      if (opt instanceof OptionInputState) {
        return opt.clone();
      } else if (opt instanceof Option) {
        return new OptionInputState(opt.text, opt.id, false);
      } else {
        throw new TypeError(
          `In constructor RowQuestionInputState(): ${options} passed into parameter options is not an array of Options or OptionInputStates`
        );
      }
    });
  }

  // Returns the index of the first checked option. If no options are checked, returns -1
  getCheckedIndex() {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options.isSelected === true) return i;
    }
    return -1;
  }

  // Returns true if and only if there is at least one option checked
  isAnswered() {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].isSelected) return true;
    }

    return false;
  }

  cloneOptions() {
    return this.options.map((opt) => opt.clone());
  }

  clone() {
    return new RowQuestionInputState(this.text, this.id, this.options);
  }

  toResponseVal() {
    return {
      questionText: this.text,
      id: this.id,
      response: this.options
        .filter((opt) => opt.isSelected)
        .map((opt) => opt.toStorable()),
    };
  }

  static cloneVal = (val) => {
    return {
      questionText: val.text,
      id: val.id,
      response: val.response.map((opt) => OptionInputState.cloneVal(opt)),
    };
  };
}
