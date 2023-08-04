import React, { useContext } from 'react';
import SurveyInputContext from 'src/context/archive/SurveyInput/SurveyInputContext';
import Button from 'src/components/layout/Form/Button';
import RouterLinkButton from 'src/components/layout/Form/RouterLinkButton';

const SurveySubmitted: React.FC = () => {
  const surveyContext = useContext(SurveyInputContext);
  if (!surveyContext) {
    return <></>;
  }

  const { setIsSubmitted } = surveyContext;
  const { title } = surveyContext.state;

  const onClickSubmit = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="mt-7 pb-9 min-h-screen px-0 sm:w-screen-4/5 sm:mx-auto sm:max-w-[650px] sm:pb-12">
      <div className="flex flex-col group shadow-md px-3 mb-7 py-6 bg-white xs:px-5 sm:rounded-xl sm:border-[1px] sm:border-gray-100">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-1">
          {title}
        </h1>
        <p className="text-center text-gray-600 text-xl mb-5 px-1">
          Thank you! Your response has been recorded.
        </p>
      </div>
      <div className="flex justify-end mb-3">
        <Button
          classNames="bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={onClickSubmit}
        >
          Submit another response
        </Button>
        <RouterLinkButton
          classNames="bg-sky-100 hover:bg-sky-200 text-blue-600 text-center"
          to="/survey"
        >
          Go back
        </RouterLinkButton>
      </div>
    </div>
  );
};

export default SurveySubmitted;
