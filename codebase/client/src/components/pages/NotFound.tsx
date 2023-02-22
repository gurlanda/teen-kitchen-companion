import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="pt-7 px-4 text-center">
      <h1 className="tk-acumin-pro-extra-condensed text-6xl -mb-2">
        <strong>404: </strong>
      </h1>
      <h2 className="tk-acumin-pro-condensed text-[2.75rem] mb-3">
        Not Found :(
      </h2>
      <p className="tk-acumin-pro-semi-condensed text-xl">
        The page you are looking for <br /> doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
