import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import LanguageContent from 'src/model/Language/LanguageContent';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Section1: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <h1 className="text-4xl font-heading font-bold my-5 text-center">
        {
          {
            [SupportedLanguage.ENGLISH]: 'Food right to your doorstep!',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
      </h1>

      {/* Items */}
      <div className="flex flex-col justify-around px-4 font-body lg:flex-row">
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]:
              'Healthy meals designed by a licensed dietitian',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'Meals are formulated to be heart-healthy and diabetes-friendly.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
          icon="bg-laptop-icon"
        />
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]: 'We cook & deliver your food',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'With our team of chefs and volunteer teens, we cook your food to perfection.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
          icon="bg-cooking-icon"
        />
        <SectionItem
          heading={{
            [SupportedLanguage.ENGLISH]: 'Heat it up and enjoy!',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          details={{
            [SupportedLanguage.ENGLISH]:
              'Healthy, effortless meals that are ready to be eaten.',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }}
          preferredLanguage={preferredLanguage}
          icon="bg-heat-food-icon"
        />
      </div>
    </div>
  );
};

interface SecItmProps {
  heading: LanguageContent;
  details: LanguageContent;
  icon: string;
  preferredLanguage: SupportedLanguage.Type;
}

const SectionItem: React.FC<SecItmProps> = ({
  heading,
  details,
  icon,
  preferredLanguage,
}) => {
  return (
    <div className="flex flex-col items-center mx-2 mt-6 mb-10">
      <div
        className={`h-36 w-full bg-no-repeat bg-center text-center mb-2 py-12 ${icon}`}
      ></div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold font-heading text-2xl text-center">
          {heading[preferredLanguage]}
        </h2>
        <h3 className="text-md text-center">{details[preferredLanguage]}</h3>
      </div>
    </div>
  );
};

export default Section1;
