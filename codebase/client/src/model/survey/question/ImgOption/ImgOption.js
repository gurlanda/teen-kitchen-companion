import createId from '../../../../utils/createId';
import * as ScaleTypes from './scaleTypes';
import * as imgScaleUrls from './imgScaleUrls';

const getControlPath = (value) => {
  switch (value) {
    case 1:
      return imgScaleUrls.c1;
    case 2:
      return imgScaleUrls.c2;
    case 3:
      return imgScaleUrls.c3;
    case 4:
      return imgScaleUrls.c4;
    case 5:
      return imgScaleUrls.c5;
    default:
      console.log(`In getControlPath(): value: ${value}`);
      throw new TypeError(
        `In ImgOption > getImgPath(): Passed argument pair 'value' and 'scaleType' is invalid.`
      );
  }
};

const getEnergyPath = (value) => {
  switch (value) {
    case 1:
      return imgScaleUrls.ec1;
    case 2:
      return imgScaleUrls.ec2;
    case 3:
      return imgScaleUrls.ec3;
    case 4:
      return imgScaleUrls.ec4;
    case 5:
      return imgScaleUrls.ec5;
    default:
      console.log(`In getEnergyPath(): value: ${value}`);
      throw new TypeError(
        `In ImgOption > getImgPath(): Passed argument pair 'value' and 'scaleType' is invalid.`
      );
  }
};

const getHappinessPath = (value) => {
  switch (value) {
    case 1:
      return imgScaleUrls.uh1;
    case 2:
      return imgScaleUrls.uh2;
    case 3:
      return imgScaleUrls.uh3;
    case 4:
      return imgScaleUrls.uh4;
    case 5:
      return imgScaleUrls.uh5;
    default:
      console.log(`In getHappinessPath(): value: ${value}`);
      throw new TypeError(
        `In ImgOption > getImgPath(): Passed argument pair 'value' and 'scaleType' is invalid.`
      );
  }
};

export const getImgPath = (scaleType, value) => {
  if (!ScaleTypes.asArray.includes(scaleType)) {
    throw new TypeError(
      `In ImgOption > getImgPath(): Argument ${scaleType} passed into parameter 'scaleType' is not a valid ScaleType`
    );
  }

  if (!(value instanceof Number || typeof value === 'number')) {
    console.log(`typeof value is ${typeof value}`);
    throw new TypeError(
      `In ImgOption > getImgPath(): Argument ${value} passed into parameter 'value' is not of type Number`
    );
  }

  switch (scaleType) {
    case ScaleTypes.CONTROL:
      return getControlPath(value);
    case ScaleTypes.ENERGY:
      return getEnergyPath(value);
    case ScaleTypes.HAPPINESS:
      return getHappinessPath(value);
    default:
      throw new TypeError(
        `In ImgOption > getImgPath(): Argument ${scaleType} passed into parameter 'scaleType' is not a valid ScaleType`
      );
  }
};

export default class ImgOption {
  constructor(value, scaleType, isSelected = false, optionId = null) {
    if (!(isSelected instanceof Boolean || typeof isSelected === 'boolean')) {
      throw new TypeError(
        `In constructor ImgOption(): Argument ${isSelected} passed into parameter 'isSelected' is not of type Boolean`
      );
    }

    if (optionId) {
      if (optionId instanceof String || typeof optionId === 'string') {
        this.id = optionId;
      } else {
        throw new TypeError(
          `In constructor ImgOption(): Argument ${optionId} passed into parameter 'optionId' is not of type String`
        );
      }
    } else {
      this.id = createId();
    }

    this.imgPath = getImgPath(scaleType, value);
    this.scaleType = scaleType;
    this.value = value;
    this.isSelected = isSelected ? true : false;
  }

  clone() {
    return new ImgOption(this.value, this.scaleType, this.isSelected, this.id);
  }

  toStorable() {
    return {
      value: this.value,
      scaleType: this.scaleType,
      isSelected: this.isSelected,
      id: this.id,
    };
  }

  static fromData(data) {
    try {
      const imgOpt = new ImgOption(
        data?.value,
        data?.scaleType,
        data.isSelected,
        data.id
      );

      return imgOpt;
    } catch (err) {
      if (err instanceof TypeError) {
        throw new TypeError(
          'In ImgOption.fromData(): New ImgOption cannot be created from the passed-in argument.'
        );
      } else {
        throw err;
      }
    }
  }
}
