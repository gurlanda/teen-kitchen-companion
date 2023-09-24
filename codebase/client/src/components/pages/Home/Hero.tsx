import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import hero from 'src/assets/img/hero.png';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import { paths } from 'src';
import Button from 'src/components/layout/Button';

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
                {
                  [SupportedLanguage.ENGLISH]: 'Teen Kitchen Project logo',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
              className="h-[5.1rem] w-[5.1rem] "
            />
            <h1 className="font-bold text-7xl pt-3">Teen</h1>
          </div>
          <h1 className="font-bold text-7xl -mt-2.5 text-center">Kitchen</h1>
          <h1 className="font-bold text-7xl -mt-2.5 text-center">Project</h1>
        </div>

        <h4 className="text-4xl font-heading my-2 mx-6 text-center lg:text-gray-700">
          {
            {
              [SupportedLanguage.ENGLISH]: (
                <>
                  Building healthier
                  <br className="hidden xs:inline" />
                  communities through food
                </>
              ),
              [SupportedLanguage.SPANISH]: (
                <>
                  Construyendo comunidades más{' '}
                  <br className="hidden xs:inline" />
                  saludables a través de los alimentos
                </>
              ),
            }[preferredLanguage]
          }
        </h4>
        <div className="mx-auto my-5">
          <Link to={paths.about}>
            <Button
              className="font-body font-medium"
              large
              textColor="brand-teal"
            >
              {
                {
                  [SupportedLanguage.ENGLISH]: (
                    <>
                      Learn more about the
                      <br />
                      Teen Kitchen Project
                    </>
                  ),
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero image section for large screen sizes */}
      <img
        src={hero}
        alt={
          {
            [SupportedLanguage.ENGLISH]: 'Prepared food',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
        className="absolute lg:static w-full h-full lg:block basis-0 grow min-w-0 object-cover brightness-[45%] lg:filter-none"
      />
    </div>
  );
};

export default Hero;
