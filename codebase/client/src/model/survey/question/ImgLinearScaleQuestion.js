import Question from './Question';
import ImgOption from './ImgOption';
import * as ScaleTypes from './ImgOption/scaleTypes';
import * as Qtypes from '../questionTypes';

export default class ImgLinearScaleQuestion extends Question {
  constructor(
    isRequired,
    questionText,
    scaleType,
    minText,
    maxText,
    imgOptions,
    questionHeader,
    questionId = null
  ) {
    super(
      Qtypes.IMG_LINEAR_SCALE,
      isRequired,
      questionText,
      questionHeader,
      questionId
    );

    if (
      !(minText instanceof String || typeof minText === 'string') ||
      !(maxText instanceof String || typeof maxText === 'string') ||
      !ScaleTypes.asArray.includes(scaleType) ||
      !(imgOptions instanceof Array)
    ) {
      // throw new TypeError(
      //   'In constructor ImgLinearScaleQuestion(): One or more passed-in arguments are of an invalid type.'
      // );
    }

    for (let opt of imgOptions) {
      if (!(opt instanceof ImgOption)) {
        // throw new TypeError(
        //   'In constructor ImgLinearScaleQuestion(): One or more elements of imgOptions is not of type ImgOption.'
        // );
      }

      if (opt.scaleType !== scaleType) {
        // throw new TypeError(
        //   'In constructor ImgLinearScaleQuestion(): One or more elements of imgOptions is not the same type as the Question.'
        // );
      }
    }

    this.scaleType = scaleType;
    this.minText = minText;
    this.maxText = maxText;
    this.imgOptions = imgOptions.map((opt) => opt.clone());
  }

  clone() {
    return new ImgLinearScaleQuestion(
      this.isRequired,
      this.text,
      this.scaleType,
      this.minText,
      this.maxText,
      this.imgOptions,
      this.header,
      this.id
    );
  }

  toStorable() {
    return {
      isRequired: this.isRequired,
      questionText: this.text,
      questionHeader: this.header,
      type: this.type,
      id: this.id,
      additionalData: {
        scale: this.scale,
        minText: this.minText,
        maxText: this.maxText,
        imgOptions: this.imgOptions.map((opt) => opt.toStorable()),
      },
    };
  }

  static fromData(data) {
    try {
      const opts = data?.additionalData?.imgOptions?.map((optData) => {
        return ImgOption.fromData(optData);
      });

      const ques = new ImgLinearScaleQuestion(
        data?.isRequired,
        data?.questionText,
        data?.additionalData?.scale,
        data?.additionalData?.minText,
        data?.additionalData?.maxText,
        opts,
        data?.questionHeader,
        data?.id
      );
      return ques;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          'In ImgLinearScaleQuestion.fromData(): New ImgLinearScaleQuestion cannot be created from the passed-in data.'
        );
      } else {
        throw error;
      }
    }
  }
}
