import Option from '../../../model/survey/question/Option';

export default class OptionInputState {
  constructor(optionText, optionId, isSelected = false) {
    this.text = optionText;
    this.id = optionId;
    this.isSelected = isSelected;
  }

  clone() {
    return new OptionInputState(this.text, this.id, this.isSelected);
  }

  toResponseVal() {
    return {
      text: this.text,
      id: this.id,
      isSelected: this.isSelected,
    };
  }

  static cloneVal = ({ text, id, isSelected }) => {
    return { text, id, isSelected };
  };
}

export const getSelectedOpts = (optsArray) => {
  return optsArray
    .filter((opt) => opt.isSelected === true)
    .map((opt) => new Option(opt.text, true, opt.id));
};
