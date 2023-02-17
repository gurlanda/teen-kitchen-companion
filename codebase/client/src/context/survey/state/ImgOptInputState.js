import ImgOption, {
  getImgPath,
} from 'src/model/survey/question/ImgOption/ImgOption.js';

export default class ImgOptInputState {
  constructor(value, scaleType, isSelected, optionId) {
    if (!(isSelected instanceof Boolean || typeof isSelected === 'boolean')) {
      console.log(`isSelected: ${isSelected}\ntype: ${isSelected}`);
      throw new TypeError(
        "In constructor ImgOptInputState(): Argument passed into parameter 'isSelected' is not of type Boolean"
      );
    }

    if (!(optionId instanceof String || typeof optionId === 'string')) {
      throw new TypeError(
        "In constructor ImgOptInputState(): Argument passed into parameter 'optionId' is not of type String"
      );
    }

    try {
      this.imgPath = getImgPath(scaleType, value);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          `In constructor ImgOptInputState(): Passed argument pair 'value' and 'scaleType' is invalid.`
        );
      }
    }

    this.id = optionId;
    this.value = value;
    this.scaleType = scaleType;
    this.isSelected = isSelected;
  }

  static fromOpt(imgOpt) {
    if (!(imgOpt instanceof ImgOptInputState || imgOpt instanceof ImgOption)) {
      throw new TypeError(
        "In constructor ImgOptInputState(): Argument passed into parameter 'imgOpt' is not of type ImgOptInputState or ImgOption"
      );
    }

    try {
      return new ImgOptInputState(
        imgOpt.value,
        imgOpt.scaleType,
        imgOpt.isSelected,
        imgOpt.id
      );
    } catch (error) {
      console.log(
        'In static ImgOptInputState.fromOpt(): Could not create ImgOptInputState. Passed-in data:'
      );
      console.log(imgOpt);
      throw error;
    }
  }

  clone() {
    return ImgOptInputState.fromOpt(this);
  }

  toStorable() {
    return {
      value: this.value,
      scaleType: this.scaleType,
      isSelected: this.isSelected,
      id: this.id,
    };
  }

  toResponseData() {
    return this.toStorable();
  }

  static fromStorable(data) {
    try {
      const imgOpt = new ImgOptInputState(
        data?.value,
        data?.scaleType,
        data.isSelected,
        data.id
      );

      return imgOpt;
    } catch (err) {
      if (err instanceof TypeError) {
        throw new TypeError(
          'In ImgOptInputState.fromData(): New ImgOptInputState cannot be created from the passed-in argument.'
        );
      } else {
        throw err;
      }
    }
  }
}
