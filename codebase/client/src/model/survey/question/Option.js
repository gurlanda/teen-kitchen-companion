import createId from '../../../utils/createId';

class Option {
  constructor(optionText, isSelected = false, optionId = null) {
    if (!(isSelected instanceof String || typeof isSelected === 'boolean')) {
      throw new TypeError(
        "In constructor ImgOption(): Argument passed into parameter 'isSelected' is not of type Boolean"
      );
    }

    if (!(optionText instanceof String || typeof optionText === 'string')) {
      throw new TypeError(
        "In constructor ImgOption(): Argument passed into parameter 'optionText' is not of type String"
      );
    }

    if (optionId) {
      if (optionId instanceof String || typeof optionId === 'string') {
        this.id = optionId;
      } else {
        throw new TypeError(
          "In constructor Option(): Argument passed into parameter 'optionId' is not of type String"
        );
      }
    } else {
      this.id = createId();
    }

    this.text = optionText;
    this.isSelected = isSelected ? true : false;
  }

  clone() {
    return new Option(this.text, this.isSelected, this.id);
  }

  // Package Option data in a format that's acceptable by the server
  // If isResponse === true, then this.isSelected is stored. Otherwise, only this.text and this.isSelected is stored.
  toStorable(isResponse = false) {
    let storable = {
      id: this.id,
      value: this.text,
    };

    if (isResponse) {
      storable.isSelected = this.isSelected;
    }

    return storable;
  }

  static fromData(data) {
    if (data.hasOwnProperty('value') && data.hasOwnProperty('id')) {
      return new Option(data.value, data?.isSelected, data.id);
    } else {
      throw new TypeError(
        `In Option.fromData(): Option object cannot be created from ${data} passed into parameter data`
      );
    }
  }
}

export default Option;
