import PreferredLanguage from 'src/model/User/PreferredLanguage';

type LanguageDependentText = {
  [PreferredLanguage.ENGLISH]: string;
  [PreferredLanguage.SPANISH]: string;
};
interface StoryData {
  header: LanguageDependentText;
  img: string;
  alt: LanguageDependentText;
  content: LanguageDependentText;
}

export default StoryData;
