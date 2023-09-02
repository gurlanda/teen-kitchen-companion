import img from 'src/assets/img/stories/marley.png';
import StoryData from './StoryData';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Marley: StoryData = {
  header: {
    [SupportedLanguage.ENGLISH]: 'Meet Marley!',
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
  img: img,
  alt: {
    [SupportedLanguage.ENGLISH]: 'Marley posing as she slices some tomatoes',
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
  content: {
    [SupportedLanguage.ENGLISH]: `"Hello everyone! I am Marley Avory. I am very thankful to be a part of
    Teen Kitchen Project during summer of 2021. There is so much to learn
    about cooking and I'm grateful for all that I've learned. I am a rising
    senior at Pajaro Valley High School who has been elected as Class
    President. On my spare time I enjoy to sew clothing for myself, my mom,
    and for our two cats!"`,
    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
  },
};

export default Marley;
