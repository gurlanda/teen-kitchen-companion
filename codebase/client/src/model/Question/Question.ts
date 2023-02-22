import Clonable from '../Interfaces/Clonable';
import Comparable from '../Interfaces/Comparable';
import Identifiable from '../Interfaces/Identifiable';
import * as IUtils from '../Interfaces/InterfaceUtils';
import QuestionType from './QuestionType';
import Option from './Option';
import RowQuestion from './RowQuestion';
import ImgScale from './ImgScale';
import createId from '../../utils/createId';
import StorableOption from '../Storables/StorableOption';
import StorableRowQuestion from '../Storables/StorableRowQuestion';
import StorableQuestion from '../Storables/StorableQuestion';

export default class Question
  implements Clonable<Question>, Identifiable, Comparable
{
  // Core values
  type: QuestionType.asUnion;
  text: string;
  header: string;
  id: string;
  isRequired: boolean;

  // Values for scale question types
  minText?: string;
  maxText?: string;

  // Values for number question types
  min?: number;
  max?: number;
  step?: number;

  // Values for ImgLinearScale
  scaleType?: ImgScale;

  // Values for LongAnswer
  numLines?: number;

  options?: Option[];
  rows?: RowQuestion[];

  constructor(
    questionType: QuestionType.asUnion,
    isRequired: boolean,
    questionText: string,
    questionHeader: string,
    id: string | null = null
  ) {
    this.isRequired = isRequired;
    this.text = questionText;
    this.header = questionHeader;
    this.type = questionType;

    // if (typeof questionType === 'string') {
    //   this.type = stringToQuestionType(questionType);
    // } else {
    //   this.type = questionType;
    // }

    if (id) {
      this.id = id;
    } else {
      this.id = createId();
    }
  }

  isEqualTo(other: Question): boolean {
    return (
      other.id === this.id &&
      other.type === this.type &&
      other.header === this.header &&
      other.id === this.id &&
      other.isRequired === this.isRequired &&
      other.minText === this.minText &&
      other.maxText === this.maxText &&
      other.min === this.min &&
      other.max === this.max &&
      other.step === this.step &&
      other.scaleType === this.scaleType &&
      other.numLines === this.numLines &&
      other.scaleType === this.scaleType &&
      IUtils.isEqual(other.options, this.options) &&
      IUtils.isEqual(other.rows, this.rows)
    );
  }

  clone(): Question {
    let output = new Question(
      this.type,
      this.isRequired,
      this.text,
      this.header,
      this.id
    );

    output.minText = this?.minText;
    output.maxText = this?.maxText;
    output.min = this?.min;
    output.max = this?.max;
    output.step = this?.step;
    output.scaleType = this?.scaleType;
    output.numLines = this?.numLines;
    output.options = this?.options?.map((opt: Option) => opt.clone());
    output.rows = this?.rows?.map((row: RowQuestion) => row.clone());

    return output;
  }

  toStorable(): StorableQuestion {
    const storable: StorableQuestion = {
      type: this.type,
      text: this.text,
      header: this.header,
      _id: this.id,
      isRequired: this.isRequired,
      minText: this.minText,
      maxText: this.maxText,
      min: this.min,
      max: this.max,
      step: this.step,
      scaleType: this.scaleType?.toString(),
      numLines: this.numLines,
      options: this.options?.map((opt) => opt.toStorable()),
      rows: this.rows?.map((row) => row.toStorable()),
    };

    let key: keyof typeof storable;
    for (key in storable) {
      if (storable[key] === undefined) {
        delete storable[key];
      }
    }

    return storable;
  }

  static fromStorable(data: StorableQuestion): Question {
    let output = new Question(
      data.type,
      data.isRequired,
      data.text,
      data.header,
      data._id
    );

    output.minText = data.minText;
    output.maxText = data.maxText;
    output.min = data.min;
    output.max = data.max;
    output.step = data.step;
    output.scaleType = ImgScale.fromStringMaybe(data.scaleType);
    output.numLines = data.numLines;
    output.options = data?.options?.map((opt) => Option.fromStorable(opt));
    output.rows = data?.rows?.map((row) => RowQuestion.fromStorable(row));

    return output;
  }
}
