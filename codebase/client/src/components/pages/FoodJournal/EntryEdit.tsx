import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from 'src/components/layout/Loading';
import JournalInputContextState from 'src/context/archive/JournalInput/JournalInputContextState';
import Entry from 'src/model/archive/Journal/Entry';
import Journal from 'src/model/archive/Journal/Journal';
import LocalDb from 'src/model/archive/LocalDatabase/LocalDatabase';
import EntryForm from './EntryForm';

const EntryEdit: React.FC = () => {
  const [entryData, setEntryData] = useState<Entry | null>(null);
  const [journalData, setJournalData] = useState<Journal | null>(null);
  const { entryId } = useParams<{ entryId: string }>();
  const _isMounted = useRef(true); // This flag indicates if this component is mounted, and therefore if we can write to its state

  // If there's not ID parameter, then this request is ill-formed
  const navigate = useNavigate();
  if (!entryId) {
    navigate('/not-found');
  }

  useEffect(() => {
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    (async () => {
      try {
        const entry = await LocalDb.retrieveEntry(entryId!);
        if (entry === null) {
          return navigate('/not-found');
        }

        const journalId = entry.journalId;
        const journal = await LocalDb.retrieveJournal(journalId);
        if (journal === null) {
          return navigate('/not-found');
        }

        setEntryData(entry);
        setJournalData(journal);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  return entryData && journalData ? (
    <JournalInputContextState journal={journalData} entry={entryData}>
      <EntryForm />
    </JournalInputContextState>
  ) : (
    <Loading />
  );
};

export default EntryEdit;
