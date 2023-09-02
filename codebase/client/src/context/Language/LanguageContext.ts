import { createContext } from 'react';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

interface LanguageContext {
  preferredLanguage: SupportedLanguage.Type;
  setPreferredLanguage: (preferredLanguage: SupportedLanguage.Type) => void;
}

const defaultLanguageContext: LanguageContext = {
  preferredLanguage: SupportedLanguage.ENGLISH,
  setPreferredLanguage: () => {},
};

const languageContext = createContext<LanguageContext>(defaultLanguageContext);
export default languageContext;
