import SupportedLanguage from './SupportedLanguage';

type LanguageContent = {
  [SupportedLanguage.ENGLISH]: string | React.ReactNode;
  [SupportedLanguage.SPANISH]: string | React.ReactNode;
};

export default LanguageContent;
