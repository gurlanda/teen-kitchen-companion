import img from 'src/assets/img/stories/gracie.png';
import StoryData from './StoryData';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Gracie: StoryData = {
  header: {
    [SupportedLanguage.ENGLISH]: 'Gracie with a big smile!',
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
  img: img,
  alt: {
    [SupportedLanguage.ENGLISH]: 'Gracie with a big smile as she stirs a pot.',
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
  content: {
    [SupportedLanguage.ENGLISH]: `"I am a volunteer at Teen Kitchen Project during the summers when I have
    spare time! I am an elementary school teacher who loves music and uses
    it within my class. There's nothing quite like sharing food with other
    individuals and putting a smile on other people's faces. All the hard
    work pays off in the end!"`,
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
};

export default Gracie;
