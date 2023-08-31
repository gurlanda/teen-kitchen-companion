import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import mealPrep from 'src/assets/img/single-person-meal-prep.png';
import { useContext } from 'react';

const Section2: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="flex flex-col py-16 justify-center bg-slate-300 px-2 text-center md:py-12 lg:py-10 lg:flex-row font-body">
      <ItemGroup>
        <SectionItem
          heading={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Work with Intention'
              : 'Lorem ipsum'
          }
          details={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Our actions and choices lead to the greatest positive impact.'
              : 'Lorem ipsum'
          }
        />
        <div className="bg-family-icon bg-no-repeat bg-center h-28 w-28 md:px-6"></div>
        <SectionItem
          heading={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Young People are the Future'
              : 'Lorem ipsum'
          }
          details={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Young people are intelligent, responsible, capable, creative, caring, and must be central participants in shaping our collective future.'
              : 'Lorem ipsum'
          }
        />
      </ItemGroup>
      <div className="basis-0 grow-[5] min-w-[450px]">
        <img
          src={mealPrep}
          alt={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'A cook from the Teen Kitchen Project preparing a set of meals.'
              : 'Lorem ipsum'
          }
          className="min-h-full object-cover object-center"
        />
      </div>
      <ItemGroup>
        <SectionItem
          heading={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Food is Love'
              : 'Lorem ipsum'
          }
          details={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'The preparation and sharing of food allows our community to experience gratitude, compassion, connection, and serving those in greatest need.'
              : 'Lorem ipsum'
          }
        />
        <div className="bg-food-love-icon bg-no-repeat bg-center h-28 w-28 md:px-6"></div>
        <SectionItem
          heading={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Integrity Matters'
              : 'Lorem ipsum'
          }
          details={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'We are committed to trust, respect, and honesty.'
              : 'Lorem ipsum'
          }
        />
      </ItemGroup>
    </div>
  );
};

interface SecItmProps {
  heading: string;
  details: string;
}

const SectionItem: React.FC<SecItmProps> = ({ heading, details }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center my-2 md:basis-0 md:grow max-w-lg">
      <h2 className="font-bold font-heading text-2xl">{heading}</h2>
      <h3 className="text-md text-center">{details}</h3>
    </div>
  );
};

interface IGProps {
  children?: React.ReactNode;
}

const ItemGroup: React.FC<IGProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-between px-6 md:flex-row lg:flex-col basis-0 grow-[3]">
      {children}
    </div>
  );
};

export default Section2;
