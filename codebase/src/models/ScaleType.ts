namespace ScaleType {
  export const CONTROL = 'CONTROL';
  export const ENERGY = 'ENERGY';
  export const HAPPINESS = 'HAPPINESS';

  export const asArray = [CONTROL, ENERGY, HAPPINESS] as const;
  export type asUnion = typeof asArray[number];
}

export default ScaleType;
