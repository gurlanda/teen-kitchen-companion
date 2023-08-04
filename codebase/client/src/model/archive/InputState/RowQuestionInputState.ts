import Clonable from '../../Interfaces/Clonable';
import RowQuestion from '../Question/RowQuestion';
import OptionInputState from './OptionInputState';
import Option from '../Question/Option';
import Response from '../Question/Response';
import Identifiable from '../../Interfaces/Identifiable';

export default class RowQuestionInputState
  implements Clonable<RowQuestionInputState>, Identifiable
{
  private rowQuestion: RowQuestion;
  options: OptionInputState[];
  get text(): string {
    return this.rowQuestion.text;
  }
  get id(): string {
    return this.rowQuestion.id;
  }
  get question(): RowQuestion {
    return this.rowQuestion.clone();
  }

  constructor(
    rowQuestion: RowQuestion,
    options: OptionInputState[] | Option[]
  ) {
    this.rowQuestion = rowQuestion.clone();
    this.options = options.map((opt: OptionInputState | Option) => {
      if (opt instanceof OptionInputState) {
        return opt.clone();
      } else {
        return new OptionInputState(opt);
      }
    });
  }

  // Returns true if and only if there is at least one option checked
  isAnswered(): boolean {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].isSelected) return true;
    }

    return false;
  }

  clone(): RowQuestionInputState {
    return new RowQuestionInputState(this.rowQuestion, this.options);
  }

  toResponse(): Response {
    let output = new Response(this.rowQuestion.id);
    output.selcOptions = this.options
      .filter((opt) => opt.isSelected)
      .map((opt) => opt.option);

    return output;
  }

  static fromResponse(
    rowQuestion: RowQuestion,
    options: OptionInputState[] | Option[],
    resp: Response
  ): RowQuestionInputState {
    let output = new RowQuestionInputState(rowQuestion, options);

    // Set isSelected = true for any stored options
    const storedOpts = resp.selcOptions?.map((opt) => opt.clone());
    if (!storedOpts) {
      return output;
    }

    output.options = output.options.map((opt) => {
      for (const storedOpt of storedOpts) {
        if (storedOpt.id === opt.id) {
          return new OptionInputState(storedOpt, true);
        }
      }
      return new OptionInputState(opt.option, false);
    });

    return output;
  }
}
