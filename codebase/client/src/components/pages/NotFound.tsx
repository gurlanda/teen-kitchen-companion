import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const NotFound: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="pt-7 px-4 text-center">
      <h1 className="tk-acumin-pro-extra-condensed text-6xl -mb-2">
        <strong>404: </strong>
      </h1>
      <h2 className="tk-acumin-pro-condensed text-[2.75rem] mb-3">
        {
          {
            [SupportedLanguage.ENGLISH]: 'Not Found :(',
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
      </h2>
      <p className="tk-acumin-pro-semi-condensed text-xl">
        {
          {
            [SupportedLanguage.ENGLISH]: (
              <>
                The page you are looking for <br /> doesn't exist.
              </>
            ),
            [SupportedLanguage.SPANISH]: 'Lorem ipsum',
          }[preferredLanguage]
        }
      </p>
    </div>
  );
};

export default NotFound;
