import React from 'react';
import TkpBanner from 'src/components/layout/TkpBanner';

const AboutParagraph: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className="leading-relaxed text-gray-800">{children}</p>;
};

const About: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <TkpBanner normalWeight>
        Building Healthier Communities Through Food
      </TkpBanner>

      <div className="flex flex-col gap-4 max-w-[min(90vw,65ch)] mx-auto tk-acumin-pro-semi-condensed">
        <h1 className="tk-acumin-pro-condensed text-gray-900 text-center text-4xl">
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
      </div>
    </>
  );
};

export default About;
