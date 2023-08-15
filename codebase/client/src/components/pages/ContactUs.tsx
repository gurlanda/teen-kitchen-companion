import React from 'react';
import tkpLogo from 'src/assets/img/tkpFullLogo.png';
import TkpBanner from '../layout/TkpBanner';
import EmailForm from '../layout/EmailForm';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-full">
      <TkpBanner hideLogo>Contact us!</TkpBanner>

      {/* Content */}
      <div className="flex flex-col gap-6 max-w-[min(90vw,65ch)] font-body text-lg mx-auto ml:max-w-[min(90vw,100ch)] ml:flex-row">
        {/* Contact info */}
        <aside className="space-y-6 ml:border-r-[1px] ml:border-gray-300 ml:pr-2">
          <img
            className="w-52 ml:w-48 mx-auto"
            src={tkpLogo}
            alt="Teen Kitchen Project logo"
          />
          <div className="">
            <h4 className="font-heading font-bold text-2xl">Mailing address</h4>
            <p>P.O Box 1853</p>
            <p>Soquel, CA 95073</p>
          </div>
          <div className="">
            <h4 className="font-heading font-bold text-2xl">
              SOQUEL KITCHEN (not a mailing address)
            </h4>
            <p>2880 Research Park Drive, Suite 200</p>
            <p>Soquel, CA 95073</p>
          </div>
          <div className="">
            <h4 className="font-heading font-bold text-2xl">
              APTOS OFFICE (not a mailing address)
            </h4>
            <p>
              <em>Appointments strongly suggested as office hours vary</em>
            </p>
            <p>8063 Aptos St</p>
            <p>Aptos, CA 95003</p>
          </div>
        </aside>
        {/* Misc info */}
        <main className="flex flex-col gap-7">
          <section className="flex flex-col gap-1">
            <h3 className="font-heading font-bold text-3xl">Additional Info</h3>
            <div className="space-y-3">
              <p>
                Please make an appointment before stopping by the kitchen. We
                are only at the Soquel kitchen on Sundays from 10-6, and
                Mondays, Tuesday and Wednesday from 3:00-7:30 PM.
              </p>
              <p>
                For liability reasons, we do not accept drop in volunteers or
                visitors.
              </p>
              <p>
                Email us at info@teenkitchenproject.org or call 831-316-4540,
                extension 0 to make an appointment to visit our facility. We
                would love to share TKP with you!
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-1">
            <h4 className="font-heading font-bold text-3xl">Volunteering</h4>
            <p>
              For more information on volunteering, call 831-316-4540 extension
              2.
            </p>
          </section>

          <EmailForm
            className="border-none shadow-none"
            paddingClassName=""
            header="Send a message to our registered dietician"
            headingSizeClassName="text-3xl"
            content="You can contact our registered dietition for a free consultation. Fill out this form to make an appointment or chat with them about your meals!"
          />
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
