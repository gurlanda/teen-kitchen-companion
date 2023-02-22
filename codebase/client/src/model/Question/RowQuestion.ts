import StorableRowQuestion from '../Storables/StorableRowQuestion';
import Clonable from '../Interfaces/Clonable';
import Identifiable from '../Interfaces/Identifiable';
import Comparable from '../Interfaces/Comparable';
import createId from '../../utils/createId';

export default class RowQuestion
  implements Clonable<RowQuestion>, Identifiable, Comparable
{
  id: string;
  text: string;

  constructor(questionText: string = '', id: string | null = null) {
    this.text = questionText;
    if (id) {
      this.id = id;
    } else {
      this.id = createId();
    }
  }

  isEqualTo(other: RowQuestion): boolean {
    return other.id === this.id && other.text === this.text;
  }

  clone(): RowQuestion {
    return new RowQuestion(this.text, this.id);
  }

  // Converts a RowQuestion object to a data format that's acceptable by the server
  toStorable(): StorableRowQuestion {
    return {
      _id: this.id,
      text: this.text,
    };
  }

  static fromStorable(data: StorableRowQuestion): RowQuestion {
    return new RowQuestion(data.text, data._id);
  }
}
