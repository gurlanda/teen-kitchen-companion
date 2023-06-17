import React from 'react';
import StoryData from './StorySections/StoryData';
import stories from './StorySections/stories';
import createId from '../../../utils/createId';
import TkpBanner from 'src/components/layout/TkpBanner';

const Story: React.FC<{ data: StoryData }> = ({ data }) => {
  const { header, img, alt, content } = data;
  return (
    <div className="tk-acumin-pro-semi-condensed flex flex-col md:odd:flex-row md:even:flex-row-reverse items-center text-center mb-10">
      <div className="flex flex-col items-center mb-6 basis-0 grow">
        <h4 className="font-bold text-3xl text-cyan-500 mb-4">{header}</h4>
        <div className="w-3/4 border-8 border-cyan-500">
          <img className="w-full h-auto" src={img} alt={alt} />
        </div>
      </div>
      <p className="text-orange-700 tk-acumin-pro-condensed text-xl basis-0 grow">
        {content}
      </p>
    </div>
  );
};

const TeenStories: React.FC = () => {
  return (
    <div className="flex flex-col gap-12">
      <TkpBanner>Read some of the stories from our team!</TkpBanner>
      {/* Stories */}
      <div className="mx-6 md:space-y-16 max-w-[968px] lg:mx-auto">
        {stories.map((story) => (
          <Story data={story} key={createId()} />
        ))}
      </div>
    </div>
  );
};

export default TeenStories;
