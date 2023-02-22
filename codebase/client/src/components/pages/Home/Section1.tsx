import React from 'react';

interface SecItmProps {
  heading: string;
  details: string;
  icon: string;
}

const SectionItem: React.FC<SecItmProps> = ({ heading, details, icon }) => {
  return (
    <div className="flex flex-col items-center mx-2 mt-6 mb-10">
      <div
        className={`h-36 w-full bg-no-repeat bg-center text-center mb-2 py-12 ${icon}`}
      ></div>
      <h2 className="font-bold text-lg">{heading}</h2>
      <h3 className="text-md text-center">{details}</h3>
    </div>
  );
};

const Section1: React.FC = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center my-5 tk-acumin-pro-semi-condensed text-gray-800">
      <h1 className="text-3xl my-5 text-center">
        Food right to your doorstep!
      </h1>

      {/* Items */}
      <div className="flex flex-col justify-around px-4 lg:flex-row">
        <SectionItem
          heading="Get started with our meals"
          details="Sign up and customize your meals to fit your diet."
          icon="bg-laptop-icon"
        />
        <SectionItem
          heading="We cook &#38; deliver your food"
          details="With our team of chefs and volunteer teens, we cook your food to perfection."
          icon="bg-cooking-icon"
        />
        <SectionItem
          heading="Heat it up and enjoy!"
          details="Healthy, effortless meals that are ready to be eaten."
          icon="bg-heat-food-icon"
        />
      </div>
    </div>
  );
};

export default Section1;
