import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const NotFound: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="pt-7 px-4 text-center">
      <h1 className="tk-acumin-pro-extra-condensed text-6xl -mb-2">
        <strong>404: </strong>
      </h1>
      <h2 className="tk-acumin-pro-condensed text-[2.75rem] mb-3">
        {preferredLanguage === PreferredLanguage.ENGLISH
          ? 'Not Found :('
          : 'Lorem ipsum'}
      </h2>
      <p className="tk-acumin-pro-semi-condensed text-xl">
        {preferredLanguage === PreferredLanguage.ENGLISH ? (
          <>
            The page you are looking for <br /> doesn't exist.
          </>
        ) : (
          'Lorem ipsum'
        )}
      </p>
    </div>
  );
};

export default NotFound;
