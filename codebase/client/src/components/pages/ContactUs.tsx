import React from 'react';
import tkpLogo from 'src/assets/img/tkpFullLogo.png';
import TkpBanner from '../layout/TkpBanner';

const ContactUs: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      {/* <div className="bg-[url('/src/assets/img/cooks-hero.png')] bg-center bg-no-repeat bg-cover bg-gray-400 bg-blend-multiply h-64 flex flex-col justify-center items-center">
        <h1 className="tk-acumin-pro-condensed font-bold text-7xl  text-white text-center">
          Contact
          <br className="ml:hidden" /> us!
        </h1>
      </div> */}
      <TkpBanner hideLogo>Contact us!</TkpBanner>

      {/* Content */}
      <div className="my-10 flex flex-col ml:flex-row ml:space-x-4 tk-acumin-pro-semi-condensed text-gray-700 h-screen px-5 sm:px-9 pb-8 sm:mx-auto sm:w-screen-3/4 md:w-screen-2/3 ml:w-screen max-w-5xl">
        {/* Contact info */}
        <div className="space-y-6 mb-5 ml:border-r-[1px] ml:pr-2 ml:border-gray-300">
          <div className="w-52 ml:w-48 mx-auto">
            <img
              className="h-auto w-full "
              src={tkpLogo}
              alt="The Teen Kitchen Project logo"
            />
          </div>
          <div className="">
            <h4 className="font-bold">Mailing address</h4>
            <p>P.O Box 1853</p>
            <p>Soquel, CA 95073</p>
          </div>
          <div className="">
            <h4 className="font-bold">
              SOQUEL KITCHEN (not a mailing address)
            </h4>
            <p>2880 Research Park Drive, Suite 200</p>
            <p>Soquel, CA 95073</p>
          </div>
          <div className="">
            <h4 className="font-bold">APTOS OFFICE (not a mailing address)</h4>
            <p>
              <em>Appointments strongly suggested as office hours vary</em>
            </p>
            <p>8063 Aptos St</p>
            <p>Aptos, CA 95003</p>
          </div>
        </div>
        {/* Misc info */}
        <div className="">
          <h3 className="text-lg font-bold italic">Additional Info</h3>
          <div className="space-y-4">
            <p>
              Please make an appointment before stopping by the kitchen. We are
              only at the Soquel kitchen on Sundays from 10-6, and Mondays,
              Tuesday and Wednesday from 3:00-7:30 PM.
            </p>
            <p>
              For liability reasons, we do not accept drop in volunteers or
              visitors.
            </p>
            <p>
              Email us at info@teenkitchenproject.org or call 831-316-4540,
              extension 0 to make an appointment to visit our facility. We would
              love to share TKP with you!
            </p>
            <div className="">
              <h4 className="font-bold">Volunteering</h4>
              <p>
                For more information on volunteering, call 831-316-4540
                extension 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
