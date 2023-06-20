import React, { ReactNode } from 'react';
import TkpBanner from 'src/components/layout/TkpBanner';

const LinkButton: React.FC<{
  to: string;
  children: ReactNode;
}> = ({ to, children }) => {
  return (
    <a
      className={`block px-4 py-4 bg-white border rounded-lg border-gray-400 text-center tk-acumin-pro-semi-condensed  hover:bg-slate-200 text-cyan-600`}
      href={to}
      target="_blank"
    >
      {children}
    </a>
  );
};

const Volunteer: React.FC = () => {
  return (
    <div className="text-lg">
      <TkpBanner>Would you like to volunteer?</TkpBanner>

      {/* Content */}
      <div className="flex flex-col gap-10 max-w-[min(90vw,60ch)] mx-auto tk-acumin-pro-semi-condensed text-center">
        <div className="flex flex-col gap-3">
          <h1 className="tk-acumin-pro-condensed text-3xl ">
            Volunteering at the Teen Kitchen Project
          </h1>
          <p>Volunteers are the heart of our organization.</p>
          <p>
            We continue to be grateful for the myriad of volunteers who support
            our teens and clients.
          </p>
          <p className="font-bold">
            All volunteers are required to provide proof of COVID 19 Vaccine
            before they may participate in our program.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-5 items-center sm:flex-row sm:justify-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Teens</h3>
            <LinkButton to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/">
              Click Here to Learn More!
            </LinkButton>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Adults</h3>
            <LinkButton to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/">
              Click Here to Learn More!
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
