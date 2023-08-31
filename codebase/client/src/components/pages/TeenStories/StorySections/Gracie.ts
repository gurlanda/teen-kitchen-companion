import img from 'src/assets/img/stories/gracie.png';
import StoryData from './StoryData';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const Gracie: StoryData = {
  header: {
    [PreferredLanguage.ENGLISH]: 'Gracie with a big smile!',
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
  img: img,
  alt: {
    [PreferredLanguage.ENGLISH]: 'Gracie with a big smile as she stirs a pot.',
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
  content: {
    [PreferredLanguage.ENGLISH]: `"I am a volunteer at Teen Kitchen Project during the summers when I have
    spare time! I am an elementary school teacher who loves music and uses
    it within my class. There's nothing quite like sharing food with other
    individuals and putting a smile on other people's faces. All the hard
    work pays off in the end!"`,
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
};

export default Gracie;
