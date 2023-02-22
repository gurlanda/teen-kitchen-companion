import React from 'react';
import createId from '../../../utils/createId';
import tkpLogo from 'src/assets/img/tkp-logo-horiz.png';
import businessSupporters from './businessSupporters';
import majorFunders from './majorFunders';

const AboutParagraph: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className="mb-4 leading-relaxed text-gray-800">{children}</p>;
};

const ImgGridItem: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="w-32 flex flex-col justify-center">
      <img className="w-full h-auto" src={src} alt="" />
    </div>
  );
};

const About: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <div className="bg-[url('/src/assets/img/food-layout-hero.png')] bg-center bg-no-repeat bg-cover bg-gray-500 bg-blend-multiply h-96 relative">
        <img
          className="h-[calc(102_*_0.07em)] w-[calc(279_*_0.07em)] absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={tkpLogo}
          alt="Teen Kitchen Project logo"
        />
        <h1 className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit tk-acumin-pro-condensed text-4xl text-white text-center">
          Building Healthier Communities
          <br />
          through Food
        </h1>
      </div>
      <div className="tk-acumin-pro-semi-condensed flex flex-col items-center px-4 mx-auto mb-32 xs:px-6 sm:px-9 md:max-w-3xl">
        <h1 className="tk-acumin-pro-condensed text-gray-900 text-center text-4xl mb-6 mt-10">
          About the Teen Kitchen Project
        </h1>
        <AboutParagraph>
          The Teen Kitchen Project is a nonprofit organization that brings young
          people into the kitchen to learn to cook delicious and nourishing
          food. The meals they prepare are delivered to individuals and families
          who are in crisis due to a life-threatening illness like cancer. We
          serve families in Santa Cruz County, California.
        </AboutParagraph>
        <AboutParagraph>
          The teens gain skills in cooking healthy food, learn about the impact
          of their food choices, and are offered an opportunity to build
          connections through community service.
        </AboutParagraph>
        <AboutParagraph>
          The Teen Kitchen Project operates on Monday, Tuesday, and Wednesday
          afternoons, out of commercial kitchens in Soquel and Watsonville,
          California. We are supported through donations from the community.
        </AboutParagraph>
        <AboutParagraph>
          Teen Kitchen Project hosts cooking classes and camps for ages 8 and
          up. We also have a robust catering program. Both the classes and
          catering program offer us an opportunity to generate revenue to
          support feeding more families in crisis.
        </AboutParagraph>
        <h3 className="my-10 text-2xl text-center tk-acumin-pro-condensed">
          Please support the businesses that support the Teen Kitchen Project:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {businessSupporters.map((src) => (
            <ImgGridItem src={src} key={createId()} />
          ))}
        </div>
        <h3 className="mt-14 mb-10 text-3xl text-center tk-acumin-pro-condensed">
          Thank you to the following major funders of our work:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {majorFunders.map((src) => (
            <ImgGridItem src={src} key={createId()} />
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
