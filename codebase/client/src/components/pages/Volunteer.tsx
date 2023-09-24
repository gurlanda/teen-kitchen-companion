import { ReactNode, useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import TkpBanner from 'src/components/layout/TkpBanner';
import ExternalLinkButton from '../layout/ExternalLinkButton';

const Volunteer: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="text-lg">
      <TkpBanner>
        {
          {
            [SupportedLanguage.ENGLISH]: 'Would you like to volunteer?',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
      </TkpBanner>

      {/* Content */}
      <div className="flex flex-col gap-10 max-w-[min(90vw,60ch)] mx-auto font-body text-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading font-bold text-4xl ">
            {
              {
                [SupportedLanguage.ENGLISH]:
                  'Volunteering at the Teen Kitchen Project',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </h1>
          <p>
            {
              {
                [SupportedLanguage.ENGLISH]:
                  'Volunteers are the heart of our organization.',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </p>
          <p>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    We continue to be grateful for the myriad of volunteers who
                    support our teens and clients.
                  </>
                ),
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </p>
          <p className="font-bold">
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    All volunteers are required to provide proof of COVID 19
                    Vaccine before they may participate in our program.
                  </>
                ),
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-5 items-center sm:flex-row sm:justify-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Teens',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </h3>
            <ExternalLinkButton
              to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/"
              large
            >
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Click Here to Learn More!',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </ExternalLinkButton>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Adults',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </h3>
            <ExternalLinkButton
              to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/"
              large
            >
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Click Here to Learn More!',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </ExternalLinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
