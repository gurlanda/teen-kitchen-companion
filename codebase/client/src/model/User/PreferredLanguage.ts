namespace PreferredLanguage {
  export const ENGLISH = 'ENGLISH';
  export const SPANISH = 'SPANISH';
  export const asArray = [ENGLISH, SPANISH];

  export type Type = (typeof asArray)[number];
}

export default PreferredLanguage;
