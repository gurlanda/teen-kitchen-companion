namespace PreferredLanguage {
  export const ENGLISH = 'ENGLISH';
  export const SPANISH = 'SPANISH';
  export const asArray = [ENGLISH, SPANISH];

  export type Type = 'ENGLISH' | 'SPANISH';

  export function isPreferredLanguage(input: string): boolean {
    switch (input) {
      case ENGLISH:
        return true;
      case SPANISH:
        return true;
      default:
        return false;
    }
  }
}

export default PreferredLanguage;
