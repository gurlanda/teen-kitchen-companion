import InputState from './InputState';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';
import ImgLinearScaleQuestion from '../../../model/survey/question/ImgLinearScaleQuestion';
import ImgOptInputState from './ImgOptInputState';
import * as ScaleTypes from '../../../model/survey/question/ImgOption/scaleTypes';
import ImgOption from '../../../model/survey/question/ImgOption';

// const fromResponse = (response, options) => {
//   return options.map((opt) => {
//     if (opt.value === response) {
//       return new LinScaleOptInputState(opt.value, opt.id, true);
//     } else {
//       return new LinScaleOptInputState(opt.text, opt.id, false);
//     }
//   });
// };

// const createOpts = (min, max, step) => {
//   const opts = [];
//   for (let i = min; i <= max; i += step) {
//     opts.push(new LinScaleOptInputState(i));
//   }

//   return opts;
// };

const fromResponse = (response, options) => {
  return options.map((opt) => {
    if (opt.value === response) {
      return new ImgOptInputState(opt.value, opt.scaleType, true, opt.id);
    } else {
      return new ImgOptInputState(opt.value, opt.scaleType, false, opt.id);
    }
  });
};

export default class ImgLinearScaleInputState extends InputState {
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    scaleType,
    minText,
    maxText,
    imgOptions,
    response = null
  ) {
    super(
      Qtypes.IMG_LINEAR_SCALE,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    if (!ScaleTypes.asArray.includes(scaleType)) {
      throw new TypeError(
        'In constructor ImgLinearScaleInputState(): scaleType is invalid.'
      );
    }

    if (!(minText instanceof String || typeof minText === 'string')) {
      throw new TypeError(
        'In constructor ImgLinearScaleInputState(): minText is not a string.'
      );
    }

    if (!(maxText instanceof String || typeof maxText === 'string')) {
      throw new TypeError(
        'In constructor ImgLinearScaleInputState(): maxText is not a string.'
      );
    }

    if (!(imgOptions instanceof Array)) {
      console.log(imgOptions);
      throw new TypeError(
        'In constructor ImgLinearScaleInputState(): imgOptions is not an array.'
      );
    }

    for (const imgOpt of imgOptions) {
      if (
        !(imgOpt instanceof ImgOption || imgOpt instanceof ImgOptInputState)
      ) {
        throw new TypeError(
          'In constructor ImgLinearScaleInputState(): One or more elements of imgOptions is not of type ImgOption or ImgOptInputState.'
        );
      }
    }

    this.minText = minText;
    this.maxText = maxText;
    this.scaleType = scaleType;

    let options;
    if (response) {
      options = fromResponse(response, imgOptions);
    } else {
      options = imgOptions.map((opt) => {
        return ImgOptInputState.fromOpt(opt);
      });
    }
    this.imgOptions = options;

    this.isDanger = false;
  }

  static fromQuestion(ques) {
    // Initialize value based off the type of the argument
    if (
      !(
        ques instanceof ImgLinearScaleInputState ||
        ques instanceof ImgLinearScaleQuestion
      )
    ) {
      throw new TypeError(
        'In constructor ImgLinearScaleInputState(): Argument must be either a ImgLinearScaleInputState or a ImgLinearScaleQuestion'
      );
    }

    return new ImgLinearScaleInputState(
      ques.isRequired,
      ques.text,
      ques.header,
      ques.id,
      ques.scaleType,
      ques.minText,
      ques.maxText,
      ques.imgOptions
    );
  }

  isAnswered() {
    for (const opt of this.imgOptions) {
      if (opt.isSelected === true) return true;
    }
    return false;
  }

  clone() {
    return ImgLinearScaleInputState.fromQuestion(this);
  }

  createSetDanger(isDanger) {
    if (!(isDanger instanceof String || typeof isDanger === 'boolean')) {
      throw new TypeError(
        'In ImgLinearScaleInputState.createSetDanger(): Argument not of type Boolean'
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
        'In ImgLinearScaleInputState.createSetOption(): Argument not of type String'
      );
    }

    return (oldState) => {
      const newState = oldState.clone();
      newState.imgOptions = oldState.imgOptions.map((opt) => {
        if (opt.id === selectedOptId) {
          return new ImgOptInputState(opt.value, opt.id, true);
        } else {
          return new ImgOptInputState(opt.value, opt.id, false);
        }
      });

      return newState;
    };
  }

  toResponse() {
    let value = null;
    for (const opt of this.imgOptions) {
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
      ImgLinearScaleInputState.cloneVal
    );
    return res;
  }

  static cloneVal = (val) => val;
}
