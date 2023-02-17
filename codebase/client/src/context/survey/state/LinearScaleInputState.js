import InputState from './InputState';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';
import LinearScaleQuestion from '../../../model/survey/question/LinearScaleQuestion';
import createId from 'src/utils/createId.js';

const fromResponse = (response, options) => {
  return options.map((opt) => {
    if (opt.value === response) {
      return new LinScaleOptInputState(opt.value, opt.id, true);
    } else {
      return new LinScaleOptInputState(opt.text, opt.id, false);
    }
  });
};

export class LinScaleOptInputState {
  constructor(value, optionId = null, isSelected = false) {
    if (
      !(
        value instanceof String ||
        typeof value === 'string' ||
        typeof value === 'number'
      ) ||
      !(
        optionId instanceof String ||
        typeof optionId === 'string' ||
        optionId === null
      ) ||
      !(isSelected instanceof Boolean || typeof isSelected === 'boolean')
    ) {
      throw new TypeError(
        'In constructor LinScaleOptInputState(): One or more passed-in arguments have invalid type.'
      );
    }

    this.value = value;
    this.id = optionId ?? createId();
    this.isSelected = isSelected;
  }

  clone() {
    return new LinScaleOptInputState(this.value, this.id, this.isSelected);
  }

  static cloneVal = ({ value, isSelected, id }) => {
    return {
      value,
      isSelected,
      id,
    };
  };
}

const createOpts = (min, max, step) => {
  const opts = [];
  for (let i = min; i <= max; i += step) {
    opts.push(new LinScaleOptInputState(i));
  }

  return opts;
};

export default class LinearScaleInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    min,
    max,
    step,
    minText,
    maxText,
    response = null
  ) {
    super(
      Qtypes.LINEAR_SCALE,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    if (
      !(
        questionHeader instanceof String || typeof questionHeader === 'string'
      ) ||
      !(min instanceof String || typeof min === 'number') ||
      !(max instanceof String || typeof max === 'number') ||
      !(step instanceof String || typeof step === 'number') ||
      !(minText instanceof String || typeof minText === 'string') ||
      !(maxText instanceof String || typeof maxText === 'string')
    ) {
      throw new TypeError(
        'In constructor LinearScaleInputState(): One or more passed-in arguments have invalid type.'
      );
    }

    if (min >= max) {
      throw new TypeError(
        'In constructor LinearScaleInputState(): min must be strictly less than max'
      );
    }

    if (step <= 0) {
      throw new TypeError(
        'In constructor LinearScaleInputState(): step must be strictly positive'
      );
    }

    this.min = min;
    this.max = max;
    this.step = step;
    this.minText = minText;
    this.maxText = maxText;

    const options = createOpts(min, max, step);

    this.linScaleOpts = response ? fromResponse(response, options) : options;
    this.isDanger = false;
  }

  static fromQuestion(ques) {
    if (
      !(
        ques instanceof LinearScaleQuestion ||
        ques instanceof LinearScaleInputState
      )
    ) {
      throw new TypeError(
        'In static LinearScaleInputState.fromQuestion(): Argument must be a LinearScaleQuestion'
      );
    }

    return new LinearScaleInputState(
      ques.isRequired,
      ques.text,
      ques.header,
      ques.id,
      ques.min,
      ques.max,
      ques.step,
      ques.minText,
      ques.maxText
    );
  }

  clone() {
    const deepCopy = new LinearScaleInputState(
      this.isRequired,
      this.text,
      this.header,
      this.id,
      this.min,
      this.max,
      this.step,
      this.minText,
      this.maxText
    );

    deepCopy.isDanger = this.isDanger;
    deepCopy.linScaleOpts = this.linScaleOpts.map((opts) => opts.clone());
    return deepCopy;
  }

  isAnswered() {
    for (const opt of this.linScaleOpts) {
      if (opt.isSelected === true) return true;
    }

    return false;
  }

  createSetDanger(isDanger) {
    if (!(isDanger instanceof Boolean || typeof isDanger === 'boolean')) {
      throw new TypeError(
        'In LinearScaleInputState.createSetDanger(): Argument not of type Boolean'
      );
    }

    return (oldState) => {
      let newState = oldState.clone();
      newState.isDanger = isDanger;
      return newState;
    };
  }

  createSetOption(selectedOptId) {
    if (
      !(selectedOptId instanceof String || typeof selectedOptId === 'string')
    ) {
      throw new TypeError(
        'In LinearScaleInputState.createSetDanger(): Argument not of type String'
      );
    }

    return (oldState) => {
      const newState = oldState.clone();
      newState.linScaleOpts = oldState.linScaleOpts.map((opt) => {
        if (opt.id === selectedOptId) {
          return new LinScaleOptInputState(opt.value, opt.id, true);
        } else {
          return new LinScaleOptInputState(opt.value, opt.id, false);
        }
      });

      return newState;
    };
  }

  toResponse() {
    let value = null;
    for (const opt of this.linScaleOpts) {
      if (opt.isSelected) {
        value = opt.value;
        break;
      }
    }

    const res = new Response(
      this.type,
      this.text,
      this.id,
      value,
      LinearScaleInputState.cloneVal
    );
    return res;
  }

  static cloneVal = (val) => val;
}
