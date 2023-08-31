import { ReactNode, useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import TkpBanner from 'src/components/layout/TkpBanner';

const Volunteer: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="text-lg">
      <TkpBanner>
        {preferredLanguage === PreferredLanguage.ENGLISH
          ? 'Would you like to volunteer?'
          : 'Lorem ipsum'}
      </TkpBanner>

      {/* Content */}
      <div className="flex flex-col gap-10 max-w-[min(90vw,60ch)] mx-auto font-body text-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading font-bold text-4xl ">
            {preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Volunteering at the Teen Kitchen Project'
              : 'Lorem ipsum'}
          </h1>
          <p>
            {preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Volunteers are the heart of our organization.'
              : 'Lorem ipsum'}
          </p>
          <p>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                We continue to be grateful for the myriad of volunteers who
                support our teens and clients.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </p>
          <p className="font-bold">
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                All volunteers are required to provide proof of COVID 19 Vaccine
                before they may participate in our program.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-5 items-center sm:flex-row sm:justify-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Teens'
                : 'Lorem ipsum'}
            </h3>
            <LinkButton to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/">
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Click Here to Learn More!'
                : 'Lorem ipsum'}
            </LinkButton>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Adults'
                : 'Lorem ipsum'}
            </h3>
            <LinkButton to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/">
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Click Here to Learn More!'
                : 'Lorem ipsum'}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkButton: React.FC<{
  to: string;
  children: ReactNode;
}> = ({ to, children }) => {
  return (
    <a
      className={`block px-4 py-4 bg-white border rounded-lg border-gray-400 text-center hover:bg-slate-200 text-brand-teal`}
      href={to}
      target="_blank"
    >
      {children}
    </a>
  );
};

export default Volunteer;
