import React from 'react';

const Section1: React.FC = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center my-5">
      <h1 className="text-4xl font-heading font-bold my-5 text-center">
        Food right to your doorstep!
      </h1>

      {/* Items */}
      <div className="flex flex-col justify-around px-4 font-body lg:flex-row">
        <SectionItem
          heading="Healthy meals designed by a licensed dietitian"
          details="Meals are formulated to be heart-healthy and diabetes-friendly."
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
      <div className="flex flex-col gap-1">
        <h2 className="font-bold font-heading text-2xl text-center">
          {heading}
        </h2>
        <h3 className="text-md text-center">{details}</h3>
      </div>
    </div>
  );
};

export default Section1;
