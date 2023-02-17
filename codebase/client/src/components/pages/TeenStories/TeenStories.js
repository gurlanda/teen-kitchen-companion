import React from 'react';
import stories from './StorySections/stories';
import tkpLogo from 'src/assets/img/tkp-logo-horiz.png';
import createId from '../../../utils/createId';

const Story = ({ data }) => {
  const { header, img, alt, content } = data;
  return (
    <div className='tk-acumin-pro-semi-condensed flex flex-col md:odd:flex-row md:even:flex-row-reverse items-center text-center mb-10'>
      <div className='flex flex-col items-center mb-6 basis-0 grow'>
        <h4 className='font-bold text-3xl text-cyan-500 mb-4'>{header}</h4>
        <div className='w-3/4 border-8 border-cyan-500'>
          <img className='w-full h-auto' src={img} alt={alt} />
        </div>
      </div>
      <p className='text-orange-700 tk-acumin-pro-condensed text-xl basis-0 grow'>
        {content}
      </p>
    </div>
  );
};

const TeenStories = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="bg-[url('/src/assets/img/food-layout-hero.png')] bg-center bg-no-repeat bg-cover bg-gray-500 bg-blend-multiply h-64 mb-8 flex flex-col justify-evenly items-center">
        <div className='w-72'>
          <img
            className='h-auto w-full'
            src={tkpLogo}
            alt='Teen Kitchen Project logo'
          />
        </div>
        <h1 className='w-fit tk-acumin-pro-condensed font-bold text-5xl text-white text-center'>
          Read some of the stories <br />
          from our team!
        </h1>
      </div>
      {/* Stories */}
      <div className='mx-6 md:space-y-16 max-w-[968px] lg:mx-auto'>
        {stories.map((story) => (
          <Story data={story} key={createId()} />
        ))}
      </div>
    </div>
  );
};

export default TeenStories;
