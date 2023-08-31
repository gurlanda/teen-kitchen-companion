import img from 'src/assets/img/stories/marley.png';
import StoryData from './StoryData';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const Marley: StoryData = {
  header: {
    [PreferredLanguage.ENGLISH]: 'Meet Marley!',
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
  img: img,
  alt: {
    [PreferredLanguage.ENGLISH]: 'Marley posing as she slices some tomatoes',
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
  content: {
    [PreferredLanguage.ENGLISH]: `"Hello everyone! I am Marley Avory. I am very thankful to be a part of
    Teen Kitchen Project during summer of 2021. There is so much to learn
    about cooking and I'm grateful for all that I've learned. I am a rising
    senior at Pajaro Valley High School who has been elected as Class
    President. On my spare time I enjoy to sew clothing for myself, my mom,
    and for our two cats!"`,
    [PreferredLanguage.SPANISH]: 'Lorem ipsum',
  },
};

export default Marley;
