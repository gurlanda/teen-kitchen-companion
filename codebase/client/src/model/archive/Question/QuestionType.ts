namespace QuestionType {
  export const NUMBER = 'NUMBER';
  export const LINEAR_SCALE = 'LINEAR_SCALE';
  export const IMG_LINEAR_SCALE = 'IMG_LINEAR_SCALE';
  export const DATE = 'DATE';
  export const TIME = 'TIME';
  export const DATE_TIME = 'DATE_TIME';
  export const CHECKBOX = 'CHECKBOX';
  export const MULT_CHOICE = 'MULT_CHOICE';
  export const SHORT_ANSWER = 'SHORT_ANSWER';
  export const LONG_ANSWER = 'LONG_ANSWER';
  export const CHECKBOX_GRID = 'CHECKBOX_GRID';
  export const MULT_CHOICE_GRID = 'MULT_CHOICE_GRID';

  export const asArray = [
    NUMBER,
    LINEAR_SCALE,
    IMG_LINEAR_SCALE,
    DATE,
    TIME,
    DATE_TIME,
    CHECKBOX,
    MULT_CHOICE,
    SHORT_ANSWER,
    LONG_ANSWER,
    CHECKBOX_GRID,
    MULT_CHOICE_GRID,
  ];
  export type asUnion = typeof asArray[number];
}

export default QuestionType;
