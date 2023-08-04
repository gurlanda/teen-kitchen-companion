import StorableOption from '../Storables/StorableOption';
import Clonable from '../../Interfaces/Clonable';
import Comparable from '../../Interfaces/Comparable';
import Identifiable from '../../Interfaces/Identifiable';
import createId from '../../../utils/createId';

export default class Option
  implements Clonable<Option>, Identifiable, Comparable
{
  id: string;
  text: string;

  constructor(optionText: string = '', optionId: string | null = null) {
    if (optionId) {
      this.id = optionId;
    } else {
      this.id = createId();
    }

    this.text = optionText;
  }

  isEqualTo(other: this): boolean {
    return other.id === this.id && other.text === this.text;
  }

  clone(): Option {
    return new Option(this.text, this.id);
  }

  // Package Option data in a format that's acceptable by the server
  toStorable(): StorableOption {
    return {
      _id: this.id,
      text: this.text,
    };
  }

  static fromStorable(data: StorableOption): Option {
    return new Option(data.text, data._id);
  }
}
