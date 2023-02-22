import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../layout/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import JournalTemplate from 'src/model/Journal/JournalTemplate';
import JTemplateEditContextState from 'src/context/JournalTemplateEdit/JTemplateEditContextState';
import JTemplateEditor from './JTemplateEditor';

const JTemplateEditLoader: React.FC = () => {
  const [journalTemplate, setJournalTemplate] = useState<JournalTemplate>();
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
        const template = await ServerAdapter.fetchJournalTemplate();
        console.log(template);
        if (_isMounted) {
          setJournalTemplate(template ?? undefined);
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

  return journalTemplate ? (
    <JTemplateEditContextState template={journalTemplate}>
      <JTemplateEditor />
    </JTemplateEditContextState>
  ) : (
    <Loading />
  );
};

export default JTemplateEditLoader;
