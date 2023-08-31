import img from 'src/assets/img/stories/alejandro.png';
import StoryData from './StoryData';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const Alejandro: StoryData = {
  header: {
    [PreferredLanguage.ENGLISH]: 'Meet Alejandro!',
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
  img: img,
  alt: {
    [PreferredLanguage.ENGLISH]:
      'Alejandro smiling as he peels an egg in the kitchen.',
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
  content: {
    [PreferredLanguage.ENGLISH]: `"Hi! My name is Alejandro Ramirez. I'm a sophmore at Watsonville High
      School and I enjoy to play soccer with my friends. I hope to be an
      engineer in the future when I apply to University of California,
      Berkeley. On the side, I love to cook meals for my family and reached
      out to Teen Kitchen Project to expand my skills as a chef. I hope you
      all enjoy the food I make!"`,
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
};

export default Alejandro;
