import Clonable from '../../Interfaces/Clonable';
import { ScaleValue } from '../Question/ImgScale';
import Selectable from '../../Interfaces/Selectable';
import Identifiable from '../../Interfaces/Identifiable';

export default class ImgOptInputState
  implements Clonable<ImgOptInputState>, Selectable, Identifiable
{
  readonly scaleVal: ScaleValue;
  isSelected: boolean;
  get id(): string {
    return this.scaleVal.path;
  }
  get value(): number {
    return this.scaleVal.value;
  }
  get imgPath(): string {
    return this.scaleVal.path;
  }

  constructor(scaleValue: ScaleValue, isSelected: boolean = false) {
    this.scaleVal = scaleValue;
    this.isSelected = isSelected;
  }

  clone(): ImgOptInputState {
    return new ImgOptInputState(this.scaleVal, this.isSelected);
  }
}
