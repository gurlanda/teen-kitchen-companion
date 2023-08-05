const ENGLISH = 'ENGLISH';
const SPANISH = 'SPANISH';
const preferredLanguageArray = [ENGLISH, SPANISH];
type PreferredLanguage = (typeof preferredLanguageArray)[number];

export default PreferredLanguage;
