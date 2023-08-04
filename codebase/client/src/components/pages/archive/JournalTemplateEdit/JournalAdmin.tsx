import React, { useEffect, useRef, useState } from 'react';
import Loading from 'src/components/layout/Loading';
import Journal from 'src/model/archive/Journal/Journal';
import ServerAdapter from 'src/model/archive/Server/ServerAdapter';
import JournalItem from './JournalItem';

const JournalAdmin: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const _isMounted = useRef(false); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    _isMounted.current = true;
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    (async () => {
      try {
        const journalArray = await ServerAdapter.fetchAllJournals();
        if (_isMounted) {
          setJournals(journalArray ?? []);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const createJournal = async () => {
    // Request the creation of a journal
    // Update the list
  };

  return journals ? (
    <div className="sm:bg-slate-50 sm:pt-5 min-h-screen">
      <div className="sm:pt-7 mt-5 tk-acumin-pro text-gray-600 sm:w-screen-3/5 sm:mx-auto sm:shadow-md sm:shadow-slate-200 sm:rounded-lg bg-white lg:max-w-[560px]">
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Active Journals
        </h1>

        {journals.length > 0 ? (
          <>
            <h1 className="mb-7 text-md text-center">
              Here are the currently-active journals:
            </h1>
            {journals.map((journal) => (
              <JournalItem key={journal.id} journal={journal} />
            ))}
          </>
        ) : (
          <h1 className="mb-7 text-md text-center">
            No journals active at this time.
          </h1>
        )}

        <hr className="bg-gray-100 h-[0.2px]" />
        <button
          className="block py-7 w-full font-bold text-lg italic bg-inherit cursor-pointer text-center text-blue-400 hover:text-blue-600 hover:bg-gray-50 sm:hover:rounded-lg"
          onClick={createJournal}
        >
          Create new journal
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default JournalAdmin;
