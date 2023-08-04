import QuestionType from './QuestionType';
import ImgScale from './ImgScale';
import Option from './Option';
import RowQuestion from './RowQuestion';

export type QuestionBlueprint = {
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
};

export const multChoiceBlueprint: QuestionBlueprint = {
  type: QuestionType.MULT_CHOICE,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: undefined,
  maxText: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  scaleType: undefined,
  numLines: undefined,
  options: [],
  rows: undefined,
};

export const checkboxBlueprint = {
  type: QuestionType.CHECKBOX,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: undefined,
  maxText: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  scaleType: undefined,
  numLines: undefined,
  options: [],
  rows: undefined,
};

export const numberBlueprint: QuestionBlueprint = {
  type: QuestionType.NUMBER,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: undefined,
  maxText: undefined,
  min: 0,
  max: 0,
  step: 0,
  scaleType: undefined,
  numLines: undefined,
  options: undefined,
  rows: undefined,
};

export const linearScaleBlueprint: QuestionBlueprint = {
  type: QuestionType.LINEAR_SCALE,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: '',
  maxText: '',
  min: 0,
  max: 0,
  step: 0,
  scaleType: undefined,
  numLines: undefined,
  options: undefined,
  rows: undefined,
};

export const imgLinearScaleBlueprint: QuestionBlueprint = {
  type: QuestionType.IMG_LINEAR_SCALE,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: '',
  maxText: '',
  min: undefined,
  max: undefined,
  step: undefined,
  scaleType: ImgScale.Control,
  numLines: undefined,
  options: undefined,
  rows: undefined,
};

export const dateBlueprint: QuestionBlueprint = {
  type: QuestionType.DATE,
  text: '',
  header: '',
  id: '',
  isRequired: false,
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

export const timeBlueprint: QuestionBlueprint = {
  type: QuestionType.TIME,
  text: '',
  header: '',
  id: '',
  isRequired: false,
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

export const dateTimeBlueprint: QuestionBlueprint = {
  type: QuestionType.DATE_TIME,
  text: '',
  header: '',
  id: '',
  isRequired: false,
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

export const checkboxGridBlueprint: QuestionBlueprint = {
  type: QuestionType.CHECKBOX_GRID,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: undefined,
  maxText: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  scaleType: undefined,
  numLines: undefined,
  options: [],
  rows: [],
};

export const multChoiceGridBlueprint = {
  type: QuestionType.MULT_CHOICE_GRID,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: undefined,
  maxText: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  scaleType: undefined,
  numLines: undefined,
  options: [],
  rows: [],
};

export const shortAnswerBlueprint: QuestionBlueprint = {
  type: QuestionType.SHORT_ANSWER,
  text: '',
  header: '',
  id: '',
  isRequired: false,
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

export const longAnswerBlueprint: QuestionBlueprint = {
  type: QuestionType.LONG_ANSWER,
  text: '',
  header: '',
  id: '',
  isRequired: false,
  minText: undefined,
  maxText: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  scaleType: undefined,
  numLines: 5,
  options: undefined,
  rows: undefined,
};

export const getBlueprint = (
  qType: QuestionType.asUnion
): QuestionBlueprint => {
  switch (qType) {
    case QuestionType.NUMBER:
      return numberBlueprint;
    case QuestionType.DATE:
      return dateBlueprint;
    case QuestionType.TIME:
      return timeBlueprint;
    case QuestionType.DATE_TIME:
      return dateTimeBlueprint;
    case QuestionType.CHECKBOX:
      return checkboxBlueprint;
    case QuestionType.MULT_CHOICE:
      return multChoiceBlueprint;
    case QuestionType.SHORT_ANSWER:
      return shortAnswerBlueprint;
    case QuestionType.LONG_ANSWER:
      return longAnswerBlueprint;
    case QuestionType.CHECKBOX_GRID:
      return checkboxGridBlueprint;
    case QuestionType.MULT_CHOICE_GRID:
      return multChoiceGridBlueprint;
    case QuestionType.LINEAR_SCALE:
      return linearScaleBlueprint;
    case QuestionType.IMG_LINEAR_SCALE:
      return imgLinearScaleBlueprint;
    default:
      throw new TypeError(
        'In QuestionBlueprint.getBlueprint(): Unhandled QuestionType'
      );
  }
};
