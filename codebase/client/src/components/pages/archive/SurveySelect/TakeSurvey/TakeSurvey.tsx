import { FC, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LocalDb from 'src/model/archive/LocalDatabase/LocalDatabase';
import Survey from 'src/model/archive/Survey/Survey';
import SurveyInput from './SurveyInput';
import SurveyInputContextState from 'src/context/archive/SurveyInput/SurveyInputContextState';
import Loading from 'src/components/layout/Loading';

const TakeSurvey: FC<{}> = () => {
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const { id } = useParams<{ id: string }>();
  const _isMounted = useRef(false); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    _isMounted.current = true;
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    const fetchData = async () => {
      try {
        const survey = await LocalDb.retrieveSurvey(id);
        if (_isMounted) {
          setSurveyData(survey);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only initialize the Context when questionsArray is fully loaded
  return surveyData ? (
    <SurveyInputContextState survey={surveyData}>
      <SurveyInput />
    </SurveyInputContextState>
  ) : (
    <Loading />
  );
};

export default TakeSurvey;
