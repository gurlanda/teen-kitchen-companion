import { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/tkp-pot.svg';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import { paths } from 'src';
import Button from './Button';

const Navbar: FC = () => {
  const authContext = useContext(AuthContext);
  const { preferredLanguage, setPreferredLanguage } =
    useContext(LanguageContext);

  const invisible = 'hidden';
  const visible = '';

  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const setInvisible = () => {
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between h-fit bg-white">
      <Link
        to={paths.home}
        className="flex items-center ml-3.5 lg:mr-2"
        onClick={setInvisible}
      >
        <img
          src={logo}
          alt={
            {
              [SupportedLanguage.ENGLISH]: 'Teen Kitchen Project logo',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
          className="h-12 w-12 mr-1 pr-0"
        />
        <h1 className="text-[2.66rem] acumin">TKC</h1>
      </Link>

      {/* Hamburger menu button for small screens */}
      <input
        type="checkbox"
        name=""
        id="toggleMenu"
        className="hidden"
        onChange={toggleIsVisible}
      />
      <label
        className={`h-full w-7 cursor-pointer flex flex-col justify-center items-center mx-1 mr-5 lg:hidden`}
        htmlFor="toggleMenu"
      >
        <div className="bg-gray-500 rounded-sm h-1 w-7"></div>
        <div className="bg-gray-500 rounded-sm h-1 w-7 my-[7px]"></div>
        <div className="bg-gray-500 rounded-sm h-1 w-7"></div>
      </label>

      <div
        className={`absolute py-2 top-20 w-full z-50 shadow-lg bg-white tk-acumin-pro-condensed  ${
          isVisible ? visible : invisible
        } lg:static lg:flex lg:shadow-none`}
      >
        <div className="pl-5 lg:flex lg:grow">
          {/* <NavLinkItem to="/" text="How it Works" onClick={toggleIsVisible} /> */}
          <NavLinkItem
            to={paths.menus}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'Our Menu',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to={paths.volunteer}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'Volunteer',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to={paths.stories}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'Stories',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to={paths.contact}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'Contact Us',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to={paths.about}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'About',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to={paths.surveys}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'Surveys',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />

          {/* User settings */}
          <NavLinkItem
            to={paths.account}
            text={
              {
                [SupportedLanguage.ENGLISH]: 'Account',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            onClick={toggleIsVisible}
          />

          {/* Admin links */}
          {authContext.isAdmin && (
            <NavLinkItem
              to={paths.admin.index}
              text={
                {
                  [SupportedLanguage.ENGLISH]: 'Admin Dashboard',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
              onClick={toggleIsVisible}
            />
          )}
        </div>

        {/* Auth links */}
        <div className="flex items-center gap-3 pl-3 py-2 pt-3 lg:px-5 text-xl ">
          {/* Auth buttons */}
          {!authContext.isSignedIn() && (
            <Link to={paths.auth.signIn}>
              <Button onClick={toggleIsVisible} textColor="brand-teal">
                {
                  {
                    [SupportedLanguage.ENGLISH]: 'Sign In',
                    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                  }[preferredLanguage]
                }
              </Button>
            </Link>
          )}
          {!authContext.isSignedIn() && (
            <Link to={paths.auth.signUp}>
              <Button onClick={toggleIsVisible} primary>
                {
                  {
                    [SupportedLanguage.ENGLISH]: 'Sign Up',
                    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                  }[preferredLanguage]
                }
              </Button>
            </Link>
          )}
          {authContext.isSignedIn() && (
            <Button onClick={() => authContext.signOut()}>
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Log Out',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </Button>
          )}

          {/* Language toggle */}
          <fieldset className="flex overflow-hidden border border-gray-400 rounded-md">
            <div
              className={`
               px-4 py-2 flex gap-2  border-r border-gray-400
              ${
                preferredLanguage === SupportedLanguage.ENGLISH
                  ? 'bg-gray-100'
                  : ''
              }
              `}
            >
              <input
                type="radio"
                name="language"
                id="english"
                value={SupportedLanguage.ENGLISH}
                checked={preferredLanguage === SupportedLanguage.ENGLISH}
                onChange={(e) => {
                  setPreferredLanguage(SupportedLanguage.ENGLISH);
                }}
              />
              <label htmlFor="english">English</label>
            </div>

            <div
              className={`px-4 py-2 flex gap-2 ${
                preferredLanguage === SupportedLanguage.SPANISH
                  ? 'bg-gray-100 '
                  : ''
              }`}
            >
              <input
                type="radio"
                name="language"
                id="spanish"
                value={SupportedLanguage.SPANISH}
                checked={preferredLanguage === SupportedLanguage.SPANISH}
                onChange={(e) => {
                  setPreferredLanguage(SupportedLanguage.SPANISH);
                }}
              />
              <label htmlFor="spanish">Español</label>
            </div>
          </fieldset>
        </div>
      </div>
    </nav>
  );
};

const NavLinkItem: FC<{
  text: string;
  to: string;
  onClick: { (e?: any): void };
}> = ({ text, to, onClick }) => {
  return (
    <div onClick={onClick}>
      <Link to={to}>
        <div className="font-heading py-2 lg:px-2 lg:py-4 lg:hover:border-y-2 lg:border-transparent lg:border-y-2 lg:hover:border-brand-teal">
          <h1 className="text-3xl">{text}</h1>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
