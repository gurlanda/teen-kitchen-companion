import React, { ReactNode, useEffect, useRef, useState } from 'react';
import dateString from './dateString';
import Journal from 'src/model/Journal/Journal';
import LocalDb from 'src/model/LocalDatabase/LocalDatabase';
import createId from 'src/utils/createId';
import JournalSelectItem from './JournalSelectItem';
import { Link } from 'react-router-dom';
import { isInBounds } from 'src/utils/ArrayUtil';
import Entry from 'src/model/Journal/Entry';
import EntrySelectItem from './EntrySelectItem';

const ColumnItem: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="border-t-[0.5px] border-gray-100 py-5 px-5">{children}</div>
  );
};

const JournalSelect: React.FC = () => {
  const [currentJournalIndex, setCurrentJournalIndex] = useState(0);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const _isMounted = useRef(true); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    (async () => {
      try {
        await LocalDb.refreshJournals();
        await LocalDb.refreshEntries();

        const journalArray = await LocalDb.retrieveJournals();
        // Todo: Sort array by date
        // Todo: If there are no active journals, how do we render this component?

        if (_isMounted) {
          await setSelectedJournal(journalArray.length - 1);
          setJournals(journalArray);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const setSelectedJournal = async (selectedJournalIndex: number) => {
    if (!isInBounds(journals, selectedJournalIndex)) {
      return;
    }

    const selectedId = journals[selectedJournalIndex].id;
    const newEntries = await LocalDb.retrieveEntriesOfJournal(selectedId);

    setEntries(newEntries);
    setCurrentJournalIndex(selectedJournalIndex);
  };

  return (
    <div className="flex flex-col max-w-screen-md mx-auto mt-4 px-3 ms:px-6 pb-12 space-y-4 items-center tk-acumin-pro-semi-condensed text-gray-700">
      {/* Journal select */}
      <div className="flex space-x-4 pb-8">
        {journals.map((journal, index) => (
          <JournalSelectItem
            journal={journal}
            onClick={() => setSelectedJournal(index)}
            isSelected={index === currentJournalIndex}
            key={createId()}
          />
        ))}
      </div>

      {/* Entry select */}
      <div className="flex flex-col rounded-2xl shadow-xl border border-gray-100 py-5">
        <div className="py-5 px-5">
          <h1 className="text-center font-bold text-2xl mb-3 text-gray-800">
            Your Journal Entries
          </h1>
          <h2 className="text-gray-600 px-1 text-lg">
            {`These are your journal entries for the week of ${dateString(
              journals[currentJournalIndex].weekStart
            )} to ${dateString(
              journals[currentJournalIndex].weekEnd
            )}. Choose an entry to modify, or create a new entry.`}
          </h2>
        </div>

        <ColumnItem>
          <Link
            className="flex flex-col items-center group"
            to={`/journal/createEntry/${journals[currentJournalIndex].id}`}
          >
            <h3 className="font-bold">Create a new journal entry</h3>
          </Link>
        </ColumnItem>

        {entries.map((entry) => (
          <ColumnItem key={createId()}>
            <EntrySelectItem entry={entry} />
          </ColumnItem>
        ))}
      </div>
    </div>
  );
};

export default JournalSelect;
