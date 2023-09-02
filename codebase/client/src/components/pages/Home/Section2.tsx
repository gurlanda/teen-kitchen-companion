import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import mealPrep from 'src/assets/img/single-person-meal-prep.png';
import { useContext } from 'react';
import LanguageContent from 'src/model/Language/LanguageContent';

const Section2: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="flex flex-col py-16 justify-center bg-slate-300 px-2 text-center md:py-12 lg:py-10 lg:flex-row font-body">
      <ItemGroup>
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]: 'Work with Intention',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'Our actions and choices lead to the greatest positive impact.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
        />
        <div className="bg-family-icon bg-no-repeat bg-center h-28 w-28 md:px-6"></div>
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]: 'Young People are the Future',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'Young people are intelligent, responsible, capable, creative, caring, and must be central participants in shaping our collective future.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
        />
      </ItemGroup>
      <div className="basis-0 grow-[5] min-w-[450px]">
        <img
          src={mealPrep}
          alt={
            {
              [SupportedLanguage.ENGLISH]:
                'A cook from the Teen Kitchen Project preparing a set of meals.',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
          className="min-h-full object-cover object-center"
        />
      </div>
      <ItemGroup>
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]: 'Food is Love',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'The preparation and sharing of food allows our community to experience gratitude, compassion, connection, and serving those in greatest need.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
        />
        <div className="bg-food-love-icon bg-no-repeat bg-center h-28 w-28 md:px-6"></div>
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]: 'Integrity Matters',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'We are committed to trust, respect, and honesty.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
        />
      </ItemGroup>
    </div>
  );
};

interface SecItmProps {
  heading: LanguageContent;
  details: LanguageContent;
  preferredLanguage: SupportedLanguage.Type;
}

const SectionItem: React.FC<SecItmProps> = ({
  heading,
  details,
  preferredLanguage,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center my-2 md:basis-0 md:grow max-w-lg">
      <h2 className="font-bold font-heading text-2xl">
        {heading[preferredLanguage]}
      </h2>
      <h3 className="text-md text-center">{details[preferredLanguage]}</h3>
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
