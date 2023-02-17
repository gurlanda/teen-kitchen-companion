import React, { useState, useEffect, useRef } from 'react';
import SurveyInput from './SurveyInput';
import SurveyState from '../../../context/survey/SurveyState';
import Loading from '../../layout/Loading';

import { retrieveSurvey } from '../../../model/database/LocalStorage';
import { useParams } from 'react-router-dom';

const TakeSurvey = () => {
  const [surveyData, setSurveyData] = useState(null);
  const { id } = useParams();
  const _isMounted = useRef(false); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    _isMounted.current = true;
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    const fetchData = async () => {
      try {
        const survey = await retrieveSurvey(id);
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
    <SurveyState surveyData={surveyData}>
      <SurveyInput />
    </SurveyState>
  ) : (
    <Loading />
  );
};

export default TakeSurvey;
