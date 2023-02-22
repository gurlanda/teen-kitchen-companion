import React from 'react';
import deliveryAngels from '../../../assets/img/deliveryAngels.jpg';

interface SecItmProps {
  heading: string;
  details: string;
}

const SectionItem: React.FC<SecItmProps> = ({ heading, details }) => {
  return (
    <div className="flex flex-col items-center my-2 md:basis-0 md:grow max-w-lg">
      <h2 className="font-bold text-lg">{heading}</h2>
      <h3 className="text-md text-center">{details}</h3>
    </div>
  );
};

interface IGProps {
  children?: React.ReactNode;
}

const ItemGroup: React.FC<IGProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-between px-6 md:flex-row lg:flex-col">
      {children}
    </div>
  );
};

const Section2: React.FC = () => {
  return (
    <div className="flex flex-col py-16 justify-center items-center bg-slate-300 px-2 text-center md:py-12 lg:py-10 lg:flex-row tk-acumin-pro-semi-condensed text-gray-800">
      <ItemGroup>
        <SectionItem
          heading="Work with Intention"
          details="Our actions and choices lead to the greatest positive impact."
        />
        <div className="bg-family-icon bg-no-repeat bg-center h-28 w-28 md:px-6"></div>
        <SectionItem
          heading="Young People are the Future"
          details="Young people are intelligent, responsible, capable, creative,caring, and must be central participants in shaping our collective future."
        />
      </ItemGroup>
      <img
        src={deliveryAngels}
        alt="Two Delivery Angels fulfilling a delivery."
        className="my-4"
      />
      <ItemGroup>
        <SectionItem
          heading="Food is Love"
          details="The preparation and sharing of food allows our community to experience gratitude, compassion, connection, and serving those in greatest need."
        />
        <div className="bg-food-love-icon bg-no-repeat bg-center h-28 w-28 md:px-6"></div>
        <SectionItem
          heading="Integrity Matters"
          details="We are committed to trust, respect, and honesty."
        />
      </ItemGroup>
    </div>
  );
};

export default Section2;
