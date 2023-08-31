import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import hero from 'src/assets/img/hero.png';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const Hero: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="relative flex h-screen-5/6">
      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center items-center basis-0 grow px-3 text-white lg:pt-0 lg:justify-center lg:bg-none lg:bg-gray-200">
        {/* Logo */}
        <div className="flex flex-col my-3 font-heading lg:text-gray-800">
          <div className="flex justify-center -ml-6">
            <img
              src={logo}
              alt={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Teen Kitchen Project logo'
                  : 'Lorem ipsum'
              }
              className="h-[5.1rem] w-[5.1rem] "
            />
            <h1 className="font-bold text-7xl pt-3">Teen</h1>
          </div>
          <h1 className="font-bold text-7xl -mt-2.5 text-center">Kitchen</h1>
          <h1 className="font-bold text-7xl -mt-2.5 text-center">Project</h1>
        </div>

        <h4 className="text-4xl font-heading my-2 mx-6 text-center lg:text-gray-700">
          {preferredLanguage === PreferredLanguage.ENGLISH ? (
            <>
              Building healthier
              <br className="hidden xs:inline" />
              communities through food
            </>
          ) : (
            'Lorem ipsum'
          )}
        </h4>
        <div className="mx-auto my-5">
          <Link to="/about">
            <button className="border-gray-200 hover:bg-slate-100 bg-white text-brand-teal font-body font-medium border rounded-lg shadow-md text-lg px-6 py-4">
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  Learn more about the
                  <br />
                  Teen Kitchen Project
                </>
              ) : (
                'Lorem ipsum'
              )}
            </button>
          </Link>
        </div>
      </div>

      {/* Hero image section for large screen sizes */}
      <img
        src={hero}
        alt={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Prepared food'
            : 'Lorem ipsum'
        }
        className="absolute lg:static w-full h-full lg:block basis-0 grow min-w-0 object-cover brightness-[45%] lg:filter-none"
      />
    </div>
  );
};

export default Hero;
