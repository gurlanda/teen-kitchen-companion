import { useEffect, useState } from 'react';
import VerifyEmail from './VerifyEmail/VerifyEmail';

const EmailAction = (): JSX.Element => {
  // Example params: ?mode=verifyEmail&oobCode=ABC123&apiKey=AIzaSy&continueUrl=alakjsdfl&lang=fr
  const [params, setParams] = useState<UrlParams>({});
  const [pageMode, setPageMode] = useState<
    'resetPassword' | 'recoverEmail' | 'verifyEmail' | 'loading' | 'invalid'
  >('loading');

  useEffect(() => {
    const currentLocation = new URL(document.location.href);
    const urlParams = extractParams(currentLocation);

    if (!isValidUrl(urlParams.continueUrl)) {
      urlParams.continueUrl = `${currentLocation.protocol}//${currentLocation.host}`;
    }

    setParams(urlParams);
    console.log(urlParams);

    const { continueUrl, oobCode } = urlParams;

    switch (urlParams.mode) {
      case 'resetPassword': {
        setPageMode('resetPassword');
        break;
      }

      case 'recoverEmail': {
        setPageMode('recoverEmail');
        break;
      }

      case 'verifyEmail': {
        if (!isValidUrl(continueUrl) || oobCode === undefined) {
          setPageMode('invalid');
          break;
        }

        setPageMode('verifyEmail');
        break;
      }

      default: {
        setPageMode('invalid');
      }
    }
  }, []);

  return (
    <div className="h-full font-body text-lg">
      <div className="h-full w-fluid mx-auto flex flex-col gap-2">
        <h1 className="font-heading text-5xl">Email action</h1>
        <span>mode: {params.mode}</span>
        <span>oobCode: {params.oobCode}</span>
        <span>apiKey: {params.apiKey}</span>
        <span>continueUrl: {params.continueUrl}</span>
        <span>lang: {params.lang}</span>

        {pageMode === 'verifyEmail' && (
          <VerifyEmail
            continueUrl={new URL(params.continueUrl!)} // Verification should have happened in the useEffect callback
            actionCode={params.oobCode!} // Verification should have happened in the useEffect callback
          />
        )}
      </div>
    </div>
  );
};

type UrlParams = {
  mode?: string;
  oobCode?: string;
  apiKey?: string;
  continueUrl?: string;
  lang?: string;
};

function extractParams(url: URL): UrlParams {
  return {
    mode: url.searchParams.get('mode') ?? undefined,
    oobCode: url.searchParams.get('oobCode') ?? undefined,
    apiKey: url.searchParams.get('apiKey') ?? undefined,
    continueUrl: url.searchParams.get('continueUrl') ?? undefined,
    lang: url.searchParams.get('lang') ?? undefined,
  };
}

function isValidUrl(testString?: string): boolean {
  if (testString === undefined) {
    return false;
  }

  // The URL constructor throws if the URL is invalid
  try {
    new URL(testString);
    return true;
  } catch (error) {
    return false;
  }
}

export default EmailAction;
