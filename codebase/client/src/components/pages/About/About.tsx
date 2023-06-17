import React from 'react';
import TkpBanner from 'src/components/layout/TkpBanner';

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
      <TkpBanner normalWeight>
        Building Healthier Communities Through Food
      </TkpBanner>
      <div className="tk-acumin-pro-semi-condensed flex flex-col items-center px-4 mx-auto mb-32 xs:px-6 sm:px-9 md:max-w-3xl">
        <h1 className="tk-acumin-pro-condensed text-gray-900 text-center text-4xl mb-6 mt-10">
          About the Teen Kitchen Project
        </h1>
        <AboutParagraph>
          The <strong>Teen Kitchen Project</strong> is a nonprofit organization
          that brings young people into the kitchen to learn to cook delicious
          and nourishing food. The meals they prepare are delivered to
          individuals and families who are in crisis due to a life-threatening
          illness like cancer. We serve families in{' '}
          <strong>Santa Cruz County, California</strong>.
        </AboutParagraph>
        <AboutParagraph>
          The teens gain skills in cooking healthy food, learn about the impact
          of their food choices, and are offered an opportunity to build
          connections through community service.
        </AboutParagraph>
        <AboutParagraph>
          The Teen Kitchen Project operates on Sundays all day, and Monday,
          Tuesday, and Wednesday afternoons, out of a commercial kitchen in
          Soquel, California. We are supported through donations from the
          community, grants, and contracts with local and state agencies.
        </AboutParagraph>
        {/* <h3 className="my-10 text-2xl text-center tk-acumin-pro-condensed">
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
        </div> */}
      </div>
    </>
  );
};

export default About;
