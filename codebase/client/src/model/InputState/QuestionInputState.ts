import Question from '../Question/Question';
import OptionInputState from './OptionInputState';
import ImgOptInputState from './ImgOptInputState';
import LinScaleOptInputState from './LinScaleOptInputState';
import RowQuestionInputState from './RowQuestionInputState';
import Response from '../Question/Response';
import Clonable from '../Interfaces/Clonable';
import QuestionType from '../Question/QuestionType';
import * as DateUtil from '../../utils/DateUtil';
import Identifiable from '../Interfaces/Identifiable';
import { multiSelectMaybe } from '../Interfaces/InterfaceUtils';

type QuestionInputStateReducer = {
  (oldState: QuestionInputState): QuestionInputState;
};
class QuestionInputState implements Clonable<QuestionInputState>, Identifiable {
  private ques: Question;
  isDanger: boolean;
  get id(): string {
    return this.ques.id;
  }
  get type(): QuestionType.asUnion {
    return this.ques.type;
  }
  get isRequired(): boolean {
    return this.ques.isRequired;
  }
  get text(): string {
    return this.ques.text;
  }
  get header(): string {
    return this.ques.header;
  }
  get question(): Question {
    return this.ques.clone();
  }

  // Choice questions
  options?: OptionInputState[];

  // Temporal questions
  dateVal?: Date;

  // ImgLinearScale
  imgOptions?: ImgOptInputState[];

  // LinearScale
  linScaleOptions?: LinScaleOptInputState[];

  // Open answer questions
  openResponse?: string;

  // Grid questions
  rowQuestions?: RowQuestionInputState[];

  // Number
  numResponse?: number;

  constructor(
    question: Question | QuestionInputState,
    isDanger: boolean = false
  ) {
    if (question instanceof Question) {
      this.ques = question.clone();
    } else {
      this.ques = question.question;
    }
    Object.freeze(this.ques);

    this.isDanger = isDanger;
    this.options = question?.options?.map((opt) => new OptionInputState(opt));

    if (question instanceof QuestionInputState) {
      this.isDanger = question.isDanger;
      this.openResponse = question.openResponse;
      this.numResponse = question.numResponse;
      this.dateVal = DateUtil.cloneMaybeDate(question.dateVal);
      this.imgOptions = question.imgOptions?.map((opt) => opt.clone());
    } else {
      this.imgOptions = question.scaleType?.options.map(
        (opt) => new ImgOptInputState(opt)
      );
    }

    // LinearScale
    let linScaleOptions: LinScaleOptInputState[] | undefined;
    if (question instanceof QuestionInputState) {
      linScaleOptions = question.linScaleOptions?.map((opt) => opt.clone());
    } else if (question.type === QuestionType.LINEAR_SCALE) {
      // Here, typeof question === Question and it should have min, max, step
      const { min, max, step } = question;
      if (min === undefined || max === undefined || step === undefined) {
        throw new TypeError(
          'In constructor QuestionInputState() > LinearScale: Passed-in question argument is ill-formed'
        );
      }

      linScaleOptions = [];
      for (let i = min; i <= max; i += step) {
        linScaleOptions.push(new LinScaleOptInputState(i));
      }
    }
    this.linScaleOptions = linScaleOptions;

    // Grid questions
    if (
      question.type === QuestionType.CHECKBOX_GRID ||
      question.type === QuestionType.MULT_CHOICE_GRID
    ) {
      if (question instanceof QuestionInputState) {
        this.rowQuestions = question?.rowQuestions?.map((row) => row.clone());
      } else {
        // question should have defined values in question.rows and question.options
        if (question.rows === undefined || question.options === undefined) {
          throw new TypeError(
            'In constructor QuestionInputState() > GridQuestion: Passed-in question argument is ill-formed'
          );
        }

        this.rowQuestions = question?.rows?.map(
          (row) => new RowQuestionInputState(row, question.options!)
        ); // Using non-null assertion (the trailing '!') because we know that question.options must be defined at this point
      }
    }
  } // constructor()

  isAnswered(): boolean {
    if (this.dateVal) {
      return true;
    }
    if (this.numResponse) {
      return true;
    }

    // Question has an answer if this.openResponse is defined and is not
    // an empty string (after whitespace is removed)
    if (this.openResponse) {
      if (this.openResponse!.trim() !== '') {
        return true;
      }
    }

    // Test to see if any options are selected
    let numSelectedOpts = this?.options?.filter(
      (opt) => opt.isSelected
    )?.length;
    // This works because 0 and undefined are falsy
    if (numSelectedOpts) {
      return true;
    }

    let numSelectedImgOpts = this?.imgOptions?.filter(
      (opt) => opt.isSelected
    )?.length;
    if (numSelectedImgOpts) {
      return true;
    }

    let numSelectedLinScaleOpts = this?.linScaleOptions?.filter(
      (opt) => opt.isSelected
    )?.length;
    if (numSelectedLinScaleOpts) {
      return true;
    }

    let numAnsweredRowQuestions = this?.rowQuestions?.filter((row) =>
      row.isAnswered()
    )?.length;
    if (numAnsweredRowQuestions) {
      return true;
    }

    return false;
  } // isAnswered()

  clone(): QuestionInputState {
    const newState = new QuestionInputState(this.question, this.isDanger);

    newState.openResponse = this?.openResponse;
    newState.numResponse = this?.numResponse;
    newState.dateVal = DateUtil.cloneMaybeDate(this.dateVal);

    newState.options = this?.options?.map((opt) => opt.clone());
    newState.imgOptions = this?.imgOptions?.map((opt) => opt.clone());
    newState.linScaleOptions = this?.linScaleOptions?.map((opt) => opt.clone());
    newState.rowQuestions = this?.rowQuestions?.map((row) => row.clone());

    return newState;
  }

  toResponse(): Response {
    const newResponse = new Response(this.ques.id);

    newResponse.openResponse = this?.openResponse;
    newResponse.dateResponse = DateUtil.cloneMaybeDate(this.dateVal);
    newResponse.numResponse = this?.numResponse;

    newResponse.selcOptions = this?.options
      ?.filter((opt) => opt.isSelected)
      ?.map((opt) => opt.option);

    const selcImgOption = this?.imgOptions?.filter((opt) => opt.isSelected);
    if (selcImgOption && selcImgOption.length > 0) {
      newResponse.selcImgOption = selcImgOption[0].value;
    }

    newResponse.rowResponses = this?.rowQuestions?.map((row) =>
      row.toResponse()
    );

    return newResponse;
  } // toResponse()

  static fromResponse(
    originalQuestion: Question,
    resp: Response
  ): QuestionInputState {
    if (originalQuestion.id !== resp.questionId) {
      throw new Error(
        'In QuestionInputState.fromResponse(): Question ID from Question does not match Question ID in Response.'
      );
    }

    const newState = new QuestionInputState(originalQuestion);

    newState.openResponse = resp.openResponse;
    newState.numResponse = resp.numResponse;
    newState.dateVal = DateUtil.cloneMaybeDate(resp.dateResponse);
    multiSelectMaybe(newState.options, resp.selcOptions);

    // ImgScale
    if (resp.selcImgOption) {
      newState.imgOptions?.forEach((opt) => {
        if (opt.value === resp.selcImgOption) {
          opt.isSelected = true;
        }
      });
    }

    // LinearScale
    const numResp = resp.numResponse;
    newState.linScaleOptions?.forEach((opt) => {
      if (opt.value === numResp) {
        opt.isSelected = true;
      }
    });

    // GridQuestions
    if (newState.rowQuestions && resp.rowResponses) {
      const rowQues = newState.rowQuestions;
      const rowResp = resp.rowResponses;
      if (rowQues.length !== rowResp.length) {
        throw new Error(
          'In QuestionInputState.fromResponse() > GridQuestion: The Response.rowResponses does not correspond to the given Question.rowQuestions'
        );
      }

      for (let i = 0; i < rowQues.length; i++) {
        if (rowQues[i].id !== rowResp[i].questionId) {
          throw new Error(
            'In QuestionInputState.fromResponse() > GridQuestion: The Response.rowResponses does not correspond to the given Question.rowQuestions'
          );
        }

        multiSelectMaybe(rowQues[i].options, rowResp[i].selcOptions);
      }
    } // GridQuestions
    return newState;
  } // fromResponse()

  static createSetDanger(isDanger: boolean): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newState = oldState.clone();
      newState.isDanger = isDanger;
      return newState;
    };
  }

  static createSetImgOption(selectedOptId: string): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newOpts: ImgOptInputState[] | undefined = oldState.imgOptions?.map(
        (opt) => {
          if (opt.id === selectedOptId) {
            return new ImgOptInputState(opt.scaleVal, true);
          } else {
            return new ImgOptInputState(opt.scaleVal, false);
          }
        }
      );

      const newState = oldState.clone();
      newState.imgOptions = newOpts;
      return newState;
    };
  }

  static createSetCheckboxOption(
    selectedOptId: string,
    newOptState: boolean
  ): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newOptions: OptionInputState[] | undefined = oldState?.options?.map(
        (opt) => {
          if (opt.id === selectedOptId) {
            return new OptionInputState(opt, newOptState);
          } else {
            return opt.clone();
          }
        }
      );

      const newState = oldState.clone();
      newState.options = newOptions;
      return newState;
    };
  }

  static createSetMultChoiceOption(
    selectedOptId: string
  ): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newOpts: OptionInputState[] | undefined = oldState?.options?.map(
        (opt) => {
          if (opt.id === selectedOptId) {
            return new OptionInputState(opt, true);
          } else {
            return new OptionInputState(opt, false);
          }
        }
      );

      const newState = oldState.clone();
      newState.options = newOpts;
      return newState;
    };
  }

  static createSetValueDate(date: Date): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newState = oldState.clone();
      newState.dateVal = new Date(date.getTime());
      return newState;
    };
  }

  static createSetValueManual(
    year: number,
    monthIndex: number,
    day: number,
    hoursIndex: number,
    minutes: number
  ): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newState = oldState.clone();
      newState.dateVal = new Date(year, monthIndex, day, hoursIndex, minutes);
      return newState;
    };
  }

  static createSetOpenResponse(newResponse: string): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newState = oldState.clone();
      newState.openResponse = newResponse;
      return newState;
    };
  }

  // Sets an option in a CheckboxGrid
  static createSetCbGridOption(
    selectedRow: string,
    selectedOpt: string,
    newOptState: boolean
  ): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      // Create the new rows
      const newRows: RowQuestionInputState[] | undefined =
        oldState?.rowQuestions?.map((row) => {
          if (row.id !== selectedRow) {
            return row.clone();
          }

          const rowOptions: OptionInputState[] = row.options.map((opt) => {
            if (opt.id !== selectedOpt) {
              return opt.clone();
            }

            return new OptionInputState(opt, newOptState);
          });

          return new RowQuestionInputState(row.question, rowOptions);
        });

      const newState = oldState.clone();
      newState.rowQuestions = newRows;
      return newState;
    };
  }

  // Sets an option in a MultChoiceGrid
  static createSetMcGridOption(
    selectedRow: string,
    selectedOpt: string
  ): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      // Create the new rows
      const newRows: RowQuestionInputState[] | undefined =
        oldState?.rowQuestions?.map((row) => {
          if (row.id !== selectedRow) {
            return row.clone();
          }

          const rowOptions: OptionInputState[] = row.options.map((opt) => {
            if (opt.id === selectedOpt) {
              return new OptionInputState(opt, true);
            } else {
              return new OptionInputState(opt, false);
            }
          });

          return new RowQuestionInputState(row.question, rowOptions);
        });

      const newState = oldState.clone();
      newState.rowQuestions = newRows;
      return newState;
    };
  }

  static createSetNumResponse(newResponse: number): QuestionInputStateReducer {
    return (oldState: QuestionInputState): QuestionInputState => {
      const newState = oldState.clone();
      newState.numResponse = newResponse;
      return newState;
    };
  }
}
export default QuestionInputState;
