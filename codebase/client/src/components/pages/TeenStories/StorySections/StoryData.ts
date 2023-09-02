import SupportedLanguage from 'src/model/Language/SupportedLanguage';

type LanguageDependentText = {
  [SupportedLanguage.ENGLISH]: string;
  [SupportedLanguage.SPANISH]: string;
};
interface StoryData {
  header: LanguageDependentText;
  img: string;
  alt: LanguageDependentText;
  content: LanguageDependentText;
}

export default StoryData;
