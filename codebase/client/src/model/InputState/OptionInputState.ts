import Option from "../Question/Option";
import Clonable from "../Interfaces/Clonable";
import Selectable from "../Interfaces/Selectable";
import Identifiable from "../Interfaces/Identifiable";

class OptionInputState implements Clonable<OptionInputState>, Selectable, Identifiable {
  isSelected: boolean;
  private opt: Option;
  get id(): string { return this.opt.id; }
  get text(): string { return this.opt.text; }
  get option(): Option { return this.option.clone(); }

  constructor(option: Option | OptionInputState, isSelected: boolean = false) {
    this.isSelected = isSelected;

    if (option instanceof Option) {
      this.opt = option.clone();
    } else {
      this.opt = option.option;
    }
  }

  clone(): OptionInputState {
    return new OptionInputState(this.opt, this.isSelected);
  }
}

export default OptionInputState;