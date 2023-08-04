import Clonable from '../../Interfaces/Clonable';
import Identifiable from '../../Interfaces/Identifiable';
import Reducer from '../../Interfaces/Reducer';
import {
  cloneTransformArray,
  deleteElementIC,
  moveElemDownIC,
  moveElemUpIC,
} from '../../Interfaces/InterfaceUtils';
import Question from '../Question/Question';
import QuestionType from '../Question/QuestionType';
import QuestionBuilder from '../Question/QuestionBuilder';
import ImgScale from '../Question/ImgScale';
import Option from '../Question/Option';
import RowQuestion from '../Question/RowQuestion';
import * as Blueprint from '../Question/QuestionBlueprint';
type QuestionBlueprint = Blueprint.QuestionBlueprint;

class QuestionEditState implements Clonable<QuestionEditState>, Identifiable {
  type: QuestionType.asUnion;
  text: string;
  header: string;
  id: string;
  isRequired: boolean;
  minText?: string;
  maxText?: string;
  min?: number;
  max?: number;
  step?: number;
  scaleType?: ImgScale;
  numLines?: number;
  options?: Option[];
  rows?: RowQuestion[];

  get blueprint(): QuestionBlueprint {
    return {
      type: this.type,
      text: this.text,
      id: this.id,
      header: this.header,
      isRequired: this.isRequired,
      minText: this.minText,
      maxText: this.maxText,
      min: this.min,
      max: this.max,
      step: this.step,
      scaleType: this.scaleType,
      numLines: this.numLines,
      options: this.options?.map((elem) => elem.clone()),
      rows: this.rows?.map((elem) => elem.clone()),
    };
  }

  constructor(
    question: Question | QuestionEditState = new Question(
      QuestionType.NUMBER,
      false,
      '',
      ''
    )
  ) {
    this.type = question.type;
    this.text = question.text;
    this.id = question.id;
    this.header = question.header;
    this.isRequired = question.isRequired;
    this.minText = question.minText;
    this.maxText = question.maxText;
    this.min = question.min;
    this.max = question.max;
    this.step = question.step;
    this.scaleType = question.scaleType;
    this.numLines = question.numLines;
    this.options = question.options?.map((elem) => elem.clone());
    this.rows = question.rows?.map((elem) => elem.clone());
  }

  static fromBlueprint(blueprint: QuestionBlueprint): QuestionEditState {
    const output = new QuestionEditState(
      new Question('NUMBER', false, '', '', '')
    );

    output.type = blueprint.type;
    output.text = blueprint.text;
    output.id = blueprint.id;
    output.header = blueprint.header;
    output.isRequired = blueprint.isRequired;
    output.minText = blueprint.minText;
    output.maxText = blueprint.maxText;
    output.min = blueprint.min;
    output.max = blueprint.max;
    output.step = blueprint.step;
    output.scaleType = blueprint.scaleType;
    output.numLines = blueprint.numLines;
    output.options = blueprint.options?.map((elem) => elem.clone());
    output.rows = blueprint.rows?.map((elem) => elem.clone());

    return output;
  }

  clone(): QuestionEditState {
    return QuestionEditState.fromBlueprint(this.blueprint);
  }

  buildQuestion(): Question {
    return QuestionBuilder.buildQuestion(this.blueprint);
  }

  /**
   * This function applies an Option reducer to the array of Options.
   *
   * @param targetId The ID of the Option to transform
   * @param reducer Used to transform the target
   * @returns A clone of this QuestionEditState with the transformed Options
   */
  applyOptReducer(
    targetId: string,
    reducer: Reducer<Option>
  ): QuestionEditState {
    let blueprint: QuestionBlueprint;

    if (this.options) {
      blueprint = {
        options: cloneTransformArray<Option>(this.options, targetId, reducer),
        ...this.blueprint,
      };
    } else {
      blueprint = { ...this.blueprint };
    }

    return QuestionEditState.fromBlueprint(blueprint);
  }

  /**
   * This function applies an RowQuestion reducer to the array of RowQuestions.
   *
   * @param targetId The ID of the RowQuestion to transform
   * @param reducer Used to transform the target
   * @returns A clone of this QuestionEditState with the transformed RowQuestions
   */
  applyRowReducer(
    targetId: string,
    reducer: Reducer<RowQuestion>
  ): QuestionEditState {
    let blueprint: QuestionBlueprint;

    if (this.rows) {
      blueprint = {
        rows: cloneTransformArray<RowQuestion>(this.rows, targetId, reducer),
        ...this.blueprint,
      };
    } else {
      blueprint = this.blueprint;
    }

    return QuestionEditState.fromBlueprint(blueprint);
  }

  // -------------------- Reducer creators --------------------
  static createChangeQuestionType(
    newType: QuestionType.asUnion
  ): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newTypeBlueprint = Blueprint.getBlueprint(newType);
      const newBlueprint = QuestionBuilder.addBlueprints(
        oldState.blueprint,
        newTypeBlueprint
      );

      return QuestionEditState.fromBlueprint(newBlueprint);
    };
  }

  static createSetQuestionText(newText: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.text = newText;
      return newState;
    };
  }

  static createSetHeader(newHeader: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.header = newHeader;
      return newState;
    };
  }

  static createSetIsRequired(newValue: boolean): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.isRequired = newValue;
      return newState;
    };
  }

  static createSetMinText(newValue: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.minText = newValue;
      return newState;
    };
  }

  static createSetMaxText(newValue: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.maxText = newValue;
      return newState;
    };
  }

  static createSetMin(newValue: number): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.min = newValue;
      return newState;
    };
  }

  static createSetMax(newValue: number): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.max = newValue;
      return newState;
    };
  }

  static createSetStep(newValue: number): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.step = newValue;
      return newState;
    };
  }

  static createSetImgScale(newValue: ImgScale): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.scaleType = newValue;
      return newState;
    };
  }

  static createSetNumLines(newValue: number): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.numLines = newValue;
      return newState;
    };
  }

  static createSetOptions(
    newOpts: Option[] = [new Option()]
  ): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.options = newOpts.map((elem) => elem.clone());
      return newState;
    };
  }

  static createSetRows(
    newRows: RowQuestion[] = [new RowQuestion()]
  ): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();
      newState.rows = newRows.map((elem) => elem.clone());
      return newState;
    };
  }

  // Option reducers
  static createSetOptionText(
    newText: string,
    targetId: string
  ): Reducer<QuestionEditState> {
    const reducer: Reducer<Option> = (oldOpt: Option): Option => {
      return new Option(newText, oldOpt.id);
    };

    return (oldState: QuestionEditState): QuestionEditState => {
      return oldState.applyOptReducer(targetId, reducer);
    };
  }

  static createAddOption(): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();

      if (!newState.options) {
        newState.options = [];
      }

      newState.options.push(new Option());

      return newState;
    };
  }

  static createMoveUpOption(optionId: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      if (!oldState.options) {
        return oldState.clone();
      }

      return QuestionEditState.fromBlueprint({
        options: moveElemUpIC<Option>(oldState.options, optionId),
        ...oldState.blueprint,
      });
    };
  }

  static createMoveDownOption(optionId: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      if (!oldState.options) {
        return oldState.clone();
      }

      return QuestionEditState.fromBlueprint({
        options: moveElemDownIC<Option>(oldState.options, optionId),
        ...oldState.blueprint,
      });
    };
  }

  static createDeleteOption(optionId: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      if (!oldState.options) {
        return oldState.clone();
      }

      return QuestionEditState.fromBlueprint({
        options: deleteElementIC<Option>(oldState.options, optionId),
        ...oldState.blueprint,
      });
    };
  }

  // RowQuestion reducers
  static createSetRowText(
    newText: string,
    targetId: string
  ): Reducer<QuestionEditState> {
    const reducer: Reducer<RowQuestion> = (
      oldRow: RowQuestion
    ): RowQuestion => {
      return new RowQuestion(newText, oldRow.id);
    };

    return (oldState: QuestionEditState): QuestionEditState => {
      return oldState.applyRowReducer(targetId, reducer);
    };
  }

  static createAddRow(): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      const newState = oldState.clone();

      if (!newState.rows) {
        newState.rows = [];
      }

      newState.rows.push(new RowQuestion());

      return newState;
    };
  }

  static createMoveUpRow(optionId: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      if (!oldState.rows) {
        return oldState.clone();
      }

      return QuestionEditState.fromBlueprint({
        rows: moveElemUpIC<RowQuestion>(oldState.rows, optionId),
        ...oldState.blueprint,
      });
    };
  }

  static createMoveDownRow(optionId: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      if (!oldState.rows) {
        return oldState.clone();
      }

      return QuestionEditState.fromBlueprint({
        rows: moveElemDownIC<RowQuestion>(oldState.rows, optionId),
        ...oldState.blueprint,
      });
    };
  }

  static createDeleteRow(optionId: string): Reducer<QuestionEditState> {
    return (oldState: QuestionEditState): QuestionEditState => {
      if (!oldState.rows) {
        return oldState.clone();
      }

      return QuestionEditState.fromBlueprint({
        rows: deleteElementIC<RowQuestion>(oldState.rows, optionId),
        ...oldState.blueprint,
      });
    };
  }
}

export default QuestionEditState;
