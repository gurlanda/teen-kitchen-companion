import { useContext } from 'react';
import tkpLogo from 'src/assets/img/tkpFullLogo.png';
import TkpBanner from '../layout/TkpBanner';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import ExternalLinkButton from '../layout/ExternalLinkButton';

const Surveys = (): JSX.Element => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="min-h-full">
      <TkpBanner>
        {
          {
            [SupportedLanguage.ENGLISH]: 'Help us improve!',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
      </TkpBanner>

      {/* Content */}
      <div className="flex flex-col gap-6 max-w-[min(90vw,60ch)] mx-auto font-body text-center text-lg">
        <h1 className="font-heading font-bold text-4xl ">
          {preferredLanguage === SupportedLanguage.ENGLISH
            ? 'Take One of Our Surveys'
            : 'Lorem ipsum'}
        </h1>
        <p>
          {
            {
              [SupportedLanguage.ENGLISH]:
                'Help us learn how to improve our services by taking one of our surveys. We appreciate your feedback!',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
        </p>

        {/* Links */}
        <div className="flex flex-col gap-5 items-center sm:flex-row sm:justify-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">
              {preferredLanguage === SupportedLanguage.ENGLISH
                ? 'Clients'
                : 'Lorem ipsum'}
            </h3>
            <ExternalLinkButton
              to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/"
              large
            >
              {preferredLanguage === SupportedLanguage.ENGLISH
                ? 'Click here to take the survey!'
                : 'Lorem ipsum'}
            </ExternalLinkButton>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">
              {preferredLanguage === SupportedLanguage.ENGLISH
                ? 'Drivers'
                : 'Lorem ipsum'}
            </h3>
            <ExternalLinkButton
              to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/"
              large
            >
              {preferredLanguage === SupportedLanguage.ENGLISH
                ? 'Click here to take the survey!'
                : 'Lorem ipsum'}
            </ExternalLinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;
