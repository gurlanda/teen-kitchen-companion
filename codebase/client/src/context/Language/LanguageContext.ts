import { createContext } from 'react';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

interface LanguageContext {
  preferredLanguage: PreferredLanguage.Type;
  setPreferredLanguage: (preferredLanguage: PreferredLanguage.Type) => void;
}

const defaultLanguageContext: LanguageContext = {
  preferredLanguage: PreferredLanguage.ENGLISH,
  setPreferredLanguage: () => {},
};

const languageContext = createContext<LanguageContext>(defaultLanguageContext);
export default languageContext;
