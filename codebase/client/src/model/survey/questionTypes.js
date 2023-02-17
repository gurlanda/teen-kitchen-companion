export const NUMBER = 'NUMBER';
export const DATE = 'DATE';
export const TIME = 'TIME';
export const DATE_TIME = 'DATE_TIME';
export const CHECKBOX = 'CHECKBOX';
export const MULT_CHOICE = 'MULT_CHOICE';
export const SHORT_ANSWER = 'SHORT_ANSWER';
export const LONG_ANSWER = 'LONG_ANSWER';
export const CHECKBOX_GRID = 'CHECKBOX_GRID';
export const MULT_CHOICE_GRID = 'MULT_CHOICE_GRID';
export const LINEAR_SCALE = 'LINEAR_SCALE';
export const IMG_LINEAR_SCALE = 'IMG_LINEAR_SCALE';

export const questionTypes = {
  NUMBER,
  DATE,
  TIME,
  DATE_TIME,
  CHECKBOX,
  MULT_CHOICE,
  SHORT_ANSWER,
  LONG_ANSWER,
  CHECKBOX_GRID,
  MULT_CHOICE_GRID,
  LINEAR_SCALE,
  IMG_LINEAR_SCALE,
};

export const asArray = [
  NUMBER,
  DATE,
  TIME,
  DATE_TIME,
  CHECKBOX,
  MULT_CHOICE,
  SHORT_ANSWER,
  LONG_ANSWER,
  CHECKBOX_GRID,
  MULT_CHOICE_GRID,
  LINEAR_SCALE,
  IMG_LINEAR_SCALE,
];

export const isQuestionType = (questionType) => {
  switch (questionType) {
    case NUMBER:
    case DATE:
    case TIME:
    case DATE_TIME:
    case CHECKBOX:
    case MULT_CHOICE:
    case SHORT_ANSWER:
    case LONG_ANSWER:
    case CHECKBOX_GRID:
    case MULT_CHOICE_GRID:
    case LINEAR_SCALE:
    case IMG_LINEAR_SCALE:
      return true;
    default:
      return false;
  }
};

export class QuestionTypeError extends TypeError {
  constructor(message) {
    super(message);
    this.name = 'QuestionTypeError';
  }
}
