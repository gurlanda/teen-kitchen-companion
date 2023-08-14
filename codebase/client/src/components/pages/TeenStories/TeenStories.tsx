import React from 'react';
import StoryData from './StorySections/StoryData';
import stories from './StorySections/stories';
import createId from '../../../utils/createId';
import TkpBanner from 'src/components/layout/TkpBanner';

const Story: React.FC<{ data: StoryData }> = ({ data }) => {
  const { header, img, alt, content } = data;
  return (
    <div className="flex flex-col gap-10 md:odd:flex-row md:even:flex-row-reverse text-center">
      <div className="flex flex-col gap-4 items-center">
        <h4 className="tk-acumin-pro-semi-condensed font-bold text-3xl text-cyan-500">
          {header}
        </h4>
        <img
          className="border-8 border-cyan-500 max-w-[min(350px,90vw)]"
          src={img}
          alt={alt}
        />
      </div>
      <p className="text-orange-700 basis-0 grow md:self-center">{content}</p>
    </div>
  );
};

const TeenStories: React.FC = () => {
  return (
    <div className="text-xl">
      <TkpBanner>Read some of the stories from our team!</TkpBanner>
      {/* Stories */}
      <div className="flex flex-col gap-10 md:gap-16 max-w-[min(90ch,90vw)] mx-auto">
        {stories.map((story) => (
          <Story data={story} key={createId()} />
        ))}
      </div>
    </div>
  );
};

export default TeenStories;
