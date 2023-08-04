import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from 'src/components/layout/Loading';
import JournalInputContextState from 'src/context/archive/JournalInput/JournalInputContextState';
import Journal from 'src/model/archive/Journal/Journal';
import LocalDb from 'src/model/archive/LocalDatabase/LocalDatabase';
import EntryForm from './EntryForm';

const EntryCreate: React.FC = () => {
  const [journalData, setJournalData] = useState<Journal | null>(null);
  const { journalId } = useParams<{ journalId: string }>();
  const _isMounted = useRef(true); // This flag indicates if this component is mounted, and therefore if we can write to its state

  // If there's not ID parameter, then this request is ill-formed
  const navigate = useNavigate();
  if (!journalId) {
    navigate('/not-found');
  }

  useEffect(() => {
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    (async () => {
      try {
        const journal = await LocalDb.retrieveJournal(journalId!);
        if (journal === null) {
          return navigate('/not-found');
        }

        setJournalData(journal);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  return journalData ? (
    <JournalInputContextState journal={journalData}>
      <EntryForm />
    </JournalInputContextState>
  ) : (
    <Loading />
  );
};

export default EntryCreate;
