// Control scale
import c1 from 'src/assets/img/journal/control/c1.png';
import c2 from 'src/assets/img/journal/control/c2.png';
import c3 from 'src/assets/img/journal/control/c3.png';
import c4 from 'src/assets/img/journal/control/c4.png';
import c5 from 'src/assets/img/journal/control/c5.png';

// Energy scale
import ec1 from 'src/assets/img/journal/excited-calm/ec1.png';
import ec2 from 'src/assets/img/journal/excited-calm/ec2.png';
import ec3 from 'src/assets/img/journal/excited-calm/ec3.png';
import ec4 from 'src/assets/img/journal/excited-calm/ec4.png';
import ec5 from 'src/assets/img/journal/excited-calm/ec5.png';

// Happiness scale
import uh1 from 'src/assets/img/journal/happy-unhappy/uh1.png';
import uh2 from 'src/assets/img/journal/happy-unhappy/uh2.png';
import uh3 from 'src/assets/img/journal/happy-unhappy/uh3.png';
import uh4 from 'src/assets/img/journal/happy-unhappy/uh4.png';
import uh5 from 'src/assets/img/journal/happy-unhappy/uh5.png';

const CONTROL = 'CONTROL';
const ENERGY = 'ENERGY';
const HAPPINESS = 'HAPPINESS';

export class ScaleValue {
  readonly value: number;
  readonly path: string;
  constructor(value: number, path: string) {
    this.value = value;
    this.path = path;
    Object.freeze(this);
  }
}

export class ImgScale {
  readonly options: ScaleValue[];
  private readonly str: string;
  private constructor(vals: ScaleValue[], str: string) {
    this.options = vals;
    this.str = str;
    Object.freeze(this.options);
    Object.freeze(this);
  }

  static readonly Control: ImgScale = new ImgScale(
    [
      new ScaleValue(1, c1),
      new ScaleValue(2, c2),
      new ScaleValue(3, c3),
      new ScaleValue(4, c4),
      new ScaleValue(5, c5),
    ],
    CONTROL
  );

  static readonly Energy: ImgScale = new ImgScale(
    [
      new ScaleValue(1, ec1),
      new ScaleValue(2, ec2),
      new ScaleValue(3, ec3),
      new ScaleValue(4, ec4),
      new ScaleValue(5, ec5),
    ],
    ENERGY
  );

  static readonly Happiness: ImgScale = new ImgScale(
    [
      new ScaleValue(1, uh1),
      new ScaleValue(2, uh2),
      new ScaleValue(3, uh3),
      new ScaleValue(4, uh4),
      new ScaleValue(5, uh5),
    ],
    HAPPINESS
  );

  toString(): string {
    return this.str;
  }

  static fromString = (str: string): ImgScale => {
    switch (str) {
      case CONTROL:
        return ImgScale.Control;
      case ENERGY:
        return ImgScale.Energy;
      case HAPPINESS:
        return ImgScale.Happiness;
      default:
        throw new TypeError(
          'In stringToImgScale(): Passed in argument is not an ImgScale'
        );
    }
  };

  static fromStringMaybe = (str?: string): ImgScale | undefined => {
    if (str === undefined) {
      return undefined;
    }
    return ImgScale.fromString(str);
  };
}
export default ImgScale;
