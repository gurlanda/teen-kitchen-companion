import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../layout/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import Survey from 'src/model/Survey/Survey';
import SurveyAdminContextState from 'src/context/SurveyAdmin/SurveyAdminContextState';
import SurveyEditor from './SurveyEditor';

const SurveyEditLoader: React.FC = () => {
  const [surveyData, setSurveyData] = useState<Survey>();
  const { id } = useParams();
  const _isMounted = useRef(false); // This flag indicates if this component is mounted, and therefore if we can write to its state
  const navigate = useNavigate();

  if (!id) {
    navigate('/not-found');
  }

  useEffect(() => {
    _isMounted.current = true;

    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    const fetchData = async () => {
      try {
        // Todo: Handle null result
        const survey = await ServerAdapter.fetchSurvey(id!);
        console.log(survey);
        if (_isMounted) {
          setSurveyData(survey ?? undefined);
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

  return surveyData ? (
    <SurveyAdminContextState survey={surveyData}>
      <SurveyEditor />
    </SurveyAdminContextState>
  ) : (
    <Loading />
  );
};

export default SurveyEditLoader;
