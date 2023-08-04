import Clonable from '../../Interfaces/Clonable';
import Selectable from '../../Interfaces/Selectable';
import createId from '../../../utils/createId';
import Identifiable from '../../Interfaces/Identifiable';

export default class LinScaleOptInputState
  implements Clonable<LinScaleOptInputState>, Selectable, Identifiable
{
  value: number;
  isSelected: boolean;
  id: string;

  constructor(
    value: number,
    isSelected: boolean = false,
    id: string | null = null
  ) {
    this.value = value;
    this.isSelected = isSelected;

    if (id) {
      this.id = id;
    } else {
      this.id = createId();
    }
  }

  clone() {
    return new LinScaleOptInputState(this.value, this.isSelected, this.id);
  }
}
