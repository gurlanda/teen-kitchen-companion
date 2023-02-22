import React, { useEffect, useState, useRef } from 'react';
import LocalDb from 'src/model/LocalDatabase/LocalDatabase';
import SurveyItem from './SurveyItem';
import Loading from '../../layout/Loading';
import Survey from 'src/model/Survey/Survey';

const SurveySelect: React.FC<{}> = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const _isMounted = useRef(true); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    (async () => {
      try {
        await LocalDb.refreshSurveys();
        const surveyArray = await LocalDb.retrieveSurveys();
        if (_isMounted) {
          setSurveys(surveyArray);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  return surveys ? (
    <div className="sm:bg-slate-50 sm:pt-5 min-h-screen">
      <div className="sm:pt-7 mt-5 tk-acumin-pro text-gray-600 sm:w-screen-3/5 sm:mx-auto sm:shadow-md sm:shadow-slate-200 sm:rounded-lg bg-white lg:max-w-[560px]">
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Available Surveys
        </h1>

        {surveys.length > 0 ? (
          <>
            <h1 className="mb-7 text-md text-center">
              Choose a survey to take.
            </h1>
            {surveys.map((survey) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))}
          </>
        ) : (
          <h1 className="mb-7 text-md text-center">
            No surveys available at this time.
          </h1>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SurveySelect;
