import React, { useState, useEffect, useRef } from 'react';

import SurveyEdit from './SurveyEdit';
import SurveyAdminState from '../../context/survey-admin/SurveyAdminState';
import Loading from '../layout/Loading';
import { useParams } from 'react-router-dom';
import ServerAdapter from '../../model/database/ServerAdapter';

const SurveyAdmin = () => {
  const [surveyData, setSurveyData] = useState(null);
  const { id } = useParams();
  const _isMounted = useRef(false); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    _isMounted.current = true;

    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    const fetchData = async () => {
      try {
        // Todo: Handle null result
        const survey = await ServerAdapter.fetchSurvey(id);
        console.log(survey);
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

  return surveyData ? (
    <SurveyAdminState surveyData={surveyData}>
      <SurveyEdit />
    </SurveyAdminState>
  ) : (
    <Loading />
  );
};

export default SurveyAdmin;
