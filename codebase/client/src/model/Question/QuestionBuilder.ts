import Question from './Question';
import QuestionType from './QuestionType';
import * as Blueprint from './QuestionBlueprint';

class QuestionBuilder {
  static buildQuestion(prototype: Blueprint.QuestionBlueprint): Question {
    switch (prototype.type) {
      case QuestionType.NUMBER:
        return this.buildNumber(prototype);
      case QuestionType.DATE:
        return this.buildDate(prototype);
      case QuestionType.TIME:
        return this.buildTime(prototype);
      case QuestionType.DATE_TIME:
        return this.buildDateTime(prototype);
      case QuestionType.CHECKBOX:
        return this.buildCheckbox(prototype);
      case QuestionType.MULT_CHOICE:
        return this.buildMultChoice(prototype);
      case QuestionType.SHORT_ANSWER:
        return this.buildShortAnswer(prototype);
      case QuestionType.LONG_ANSWER:
        return this.buildLongAnswer(prototype);
      case QuestionType.CHECKBOX_GRID:
        return this.buildCheckboxGrid(prototype);
      case QuestionType.MULT_CHOICE_GRID:
        return this.buildMultChoiceGrid(prototype);
      case QuestionType.LINEAR_SCALE:
        return this.buildLinearScale(prototype);
      case QuestionType.IMG_LINEAR_SCALE:
        return this.buildImgLinearScale(prototype);
      default:
        throw new TypeError(
          `In QuestionBuilder.buildQuestion(): The given prototype has a type ${prototype.type} that is not handled`
        );
    }
  }

  private static createFromBlueprint(
    bp: Blueprint.QuestionBlueprint
  ): Question {
    const output = new Question(
      bp.type,
      bp.isRequired,
      bp.text,
      bp.header,
      bp.id
    );

    output.minText = bp.minText;
    output.maxText = bp.maxText;
    output.min = bp.min;
    output.max = bp.max;
    output.step = bp.step;
    output.scaleType = bp.scaleType;
    output.numLines = bp.numLines;
    output.options = bp.options?.map((opt) => opt.clone());
    output.rows = bp.rows?.map((row) => row.clone());

    return output;
  }

  private static applyBlueprint = (
    prototype: Blueprint.QuestionBlueprint,
    blueprint: Blueprint.QuestionBlueprint
  ): Blueprint.QuestionBlueprint => {
    const output: Blueprint.QuestionBlueprint = {
      type: blueprint.type,
      text: prototype.text,
      header: prototype.header,
      id: prototype.id,
      isRequired: prototype.isRequired,
      minText: undefined,
      maxText: undefined,
      min: undefined,
      max: undefined,
      step: undefined,
      scaleType: undefined,
      numLines: undefined,
      options: undefined,
      rows: undefined,
    };

    if (blueprint.minText) {
      if (!prototype.minText) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined minText but it is undefined in the given prototype'
        );
      }

      output.minText = prototype.minText;
    }
    if (blueprint.maxText) {
      if (!prototype.maxText) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined maxText but it is undefined in the given prototype'
        );
      }

      output.maxText = prototype.maxText;
    }
    if (blueprint.min) {
      if (!prototype.min) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined min but it is undefined in the given prototype'
        );
      }

      output.min = prototype.min;
    }
    if (blueprint.max) {
      if (!prototype.max) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined max but it is undefined in the given prototype'
        );
      }

      output.max = prototype.max;
    }
    if (blueprint.step) {
      if (!prototype.step) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined step but it is undefined in the given prototype'
        );
      }

      output.step = prototype.step;
    }
    if (blueprint.scaleType) {
      if (!prototype.scaleType) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined scaleType but it is undefined in the given prototype'
        );
      }

      output.scaleType = prototype.scaleType;
    }
    if (blueprint.numLines) {
      if (!prototype.numLines) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined numLines but it is undefined in the given prototype'
        );
      }

      output.numLines = prototype.numLines;
    }
    if (blueprint.options) {
      if (!prototype.options) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined options but it is undefined in the given prototype'
        );
      }

      output.options = prototype.options;
    }
    if (blueprint.rows) {
      if (!prototype.rows) {
        throw new TypeError(
          'In QuestionBuilder.buildQuestion(): QuestionType requires a defined rows but it is undefined in the given prototype'
        );
      }

      output.rows = prototype.rows;
    }

    return output;
  };

  static addBlueprints = (
    blueprint: Blueprint.QuestionBlueprint,
    newBlueprint: Blueprint.QuestionBlueprint
  ): Blueprint.QuestionBlueprint => {
    const output: Blueprint.QuestionBlueprint = {
      type: blueprint.type,
      text: blueprint.text,
      header: blueprint.header,
      id: blueprint.id,
      isRequired: blueprint.isRequired,
      minText: undefined,
      maxText: undefined,
      min: undefined,
      max: undefined,
      step: undefined,
      scaleType: undefined,
      numLines: undefined,
      options: undefined,
      rows: undefined,
    };

    output.minText = blueprint.minText
      ? blueprint.minText
      : newBlueprint.minText;

    output.maxText = blueprint.maxText
      ? blueprint.maxText
      : newBlueprint.maxText;

    output.min = blueprint.min ? blueprint.min : newBlueprint.min;

    output.max = blueprint.max ? blueprint.max : newBlueprint.max;

    output.step = blueprint.step ? blueprint.step : newBlueprint.step;

    output.scaleType = blueprint.scaleType
      ? blueprint.scaleType
      : newBlueprint.scaleType;

    output.numLines = blueprint.numLines
      ? blueprint.numLines
      : newBlueprint.numLines;

    output.options = blueprint.options
      ? blueprint.options.map((elem) => elem.clone())
      : newBlueprint.options?.map((elem) => elem.clone());

    output.rows = blueprint.rows
      ? blueprint.rows.map((elem) => elem.clone())
      : newBlueprint.rows?.map((elem) => elem.clone());

    return output;
  };

  private static buildNumber = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(prototype, Blueprint.numberBlueprint);
    return this.createFromBlueprint(bpApplied);
  };

  private static buildMultChoice = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.multChoiceBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildCheckbox = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.checkboxBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildMultChoiceGrid = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.multChoiceGridBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildCheckboxGrid = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.checkboxGridBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildDate = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(prototype, Blueprint.dateBlueprint);
    return this.createFromBlueprint(bpApplied);
  };

  private static buildTime = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(prototype, Blueprint.timeBlueprint);
    return this.createFromBlueprint(bpApplied);
  };

  private static buildDateTime = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.dateTimeBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildLinearScale = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.linearScaleBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildImgLinearScale = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.imgLinearScaleBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildShortAnswer = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.shortAnswerBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };

  private static buildLongAnswer = (
    prototype: Blueprint.QuestionBlueprint
  ): Question => {
    const bpApplied = this.applyBlueprint(
      prototype,
      Blueprint.longAnswerBlueprint
    );
    return this.createFromBlueprint(bpApplied);
  };
}

export default QuestionBuilder;
