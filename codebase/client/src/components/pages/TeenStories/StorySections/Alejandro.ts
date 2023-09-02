import img from 'src/assets/img/stories/alejandro.png';
import StoryData from './StoryData';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Alejandro: StoryData = {
  header: {
    [SupportedLanguage.ENGLISH]: 'Meet Alejandro!',
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
  img: img,
  alt: {
    [SupportedLanguage.ENGLISH]:
      'Alejandro smiling as he peels an egg in the kitchen.',
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
  content: {
    [SupportedLanguage.ENGLISH]: `"Hi! My name is Alejandro Ramirez. I'm a sophmore at Watsonville High
      School and I enjoy to play soccer with my friends. I hope to be an
      engineer in the future when I apply to University of California,
      Berkeley. On the side, I love to cook meals for my family and reached
      out to Teen Kitchen Project to expand my skills as a chef. I hope you
      all enjoy the food I make!"`,
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
};

export default Alejandro;
