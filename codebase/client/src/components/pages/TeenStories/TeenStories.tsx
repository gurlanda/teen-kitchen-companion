import { useContext } from 'react';
import StoryData from './StorySections/StoryData';
import stories from './StorySections/stories';
import createId from '../../../utils/createId';
import TkpBanner from 'src/components/layout/TkpBanner';
import EmailForm from 'src/components/layout/EmailForm';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const TeenStories: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="text-xl">
      <TkpBanner>
        {
          {
            [SupportedLanguage.ENGLISH]:
              'Read some of the stories from our team!',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
      </TkpBanner>
      {/* Stories */}
      <div className="flex flex-col gap-10 md:gap-16 max-w-[min(90ch,90vw)] mx-auto">
        {stories.map((story) => (
          <Story data={story} key={createId()} />
        ))}
        <EmailForm
          header={{
            [SupportedLanguage.ENGLISH]: 'Send a message to our volunteers',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          content={{
            [SupportedLanguage.ENGLISH]:
              'Fill out this form to send a message to our teen cooks and other volunteers!',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
        />
      </div>
    </div>
  );
};

const Story: React.FC<{ data: StoryData }> = ({ data }) => {
  const { preferredLanguage } = useContext(LanguageContext);
  const { header, img, alt, content } = data;

  return (
    <div className="flex flex-col gap-10 md:odd:flex-row md:even:flex-row-reverse text-center">
      <div className="flex flex-col gap-4 items-center">
        <h4 className="font-heading font-bold text-5xl text-brand-teal">
          {header[preferredLanguage]}
        </h4>
        <img
          className="border-8 border-gray-500 max-w-[min(350px,90vw)]"
          src={img}
          alt={alt[preferredLanguage]}
        />
      </div>
      <p className="text-brand-orange font-body basis-0 grow md:self-center">
        {content[preferredLanguage]}
      </p>
    </div>
  );
};

export default TeenStories;
