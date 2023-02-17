import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import journals from './testData';

import createId from '../../../../utils/createId';

const dateString = (dateObj) => {
  const parts = dateObj.toDateString().split(' ');
  const month = parts[1];
  const date = parts[2];
  return `${month} ${date}`;
};

const JournalSelectItem = ({ info, onClick, index, currentIndex }) => {
  const { weekStart, weekEnd, isActive } = info;

  console.log(index);
  return (
    <div
      className={`flex flex-col min-w-[6rem] p-2.5 text-center shadow-lg border rounded-xl ${
        currentIndex == index ? 'border-4 border-cyan-500' : ''
      } tk-acumin-pro-condensed text-lg font-bold text-gray-700`}
      onClick={onClick}
      data-index={index}
    >
      <span data-index={index} className='block'>{`${dateString(
        weekStart
      )} to`}</span>
      <span data-index={index} className='block'>{`${dateString(
        weekEnd
      )}`}</span>
    </div>
  );
};

const ColumnItem = ({ children }) => {
  return (
    <div className='border-t-[0.5px] border-gray-100 py-5 px-5'>{children}</div>
  );
};

const EntrySelectItem = ({ entry, currentIndex }) => {
  const { entryDate } = entry;
  return (
    <Link
      className='flex flex-col items-center group'
      to={`/journal/${currentIndex}`}
    >
      <h3 className='font-bold'>{`Entry for ${entryDate}`}</h3>
      <p className='italic text-blue-400 group-hover:text-blue-600'>
        Edit this entry
      </p>
    </Link>
  );
};

const JournalSelect = () => {
  const [currentJournalIndex, setCurrentJournalIndex] = useState(0);
  const [w1Active, setW1Active] = useState(false);
  const [w2Active, setW2Active] = useState(true);
  const [w3Active, setW3Active] = useState(false);

  const onW1Click = () => {
    setW1Active(true);
    setW2Active(false);
    setW3Active(false);
  };
  const onW2Click = () => {
    setW1Active(false);
    setW2Active(true);
    setW3Active(false);
  };
  const onW3Click = () => {
    setW1Active(false);
    setW2Active(false);
    setW3Active(true);
  };
  const journalDates = [
    {
      weekStart: 'June 26',
      weekEnd: 'July 2',
      isActive: w1Active,
      onClick: onW1Click,
    },
    {
      weekStart: 'July 3',
      weekEnd: 'July 9',
      isActive: w2Active,
      onClick: onW2Click,
    },
    {
      weekStart: 'July 10',
      weekEnd: 'July 16',
      isActive: w3Active,
      onClick: onW3Click,
    },
  ];

  const onSelectJournal = (e) => {
    setCurrentJournalIndex(e.target.dataset.index);
  };

  const entries = [
    [{ entryDate: 'June 26' }, { entryDate: 'June 27' }],
    [{ entryDate: 'July 3' }, { entryDate: 'July 4' }],
    [{ entryDate: 'July 10' }, { entryDate: 'July 11' }],
  ];

  return (
    <div className='flex flex-col max-w-screen-md mx-auto mt-4 px-3 ms:px-6 pb-12 space-y-4 items-center tk-acumin-pro-semi-condensed text-gray-700'>
      {/* Journal select */}
      <div className='flex space-x-4 pb-8'>
        {journals.map((week, index) => (
          <JournalSelectItem
            info={week}
            onClick={onSelectJournal}
            index={index}
            currentIndex={currentJournalIndex}
            key={createId()}
          />
        ))}
      </div>

      {/* Entry select */}
      <div className='flex flex-col rounded-2xl shadow-xl border border-gray-100 py-5'>
        <div className='py-5 px-5'>
          <h1 className='text-center font-bold text-2xl mb-3 text-gray-800'>
            Your Journal Entries
          </h1>
          <h2 className='text-gray-600 px-1 text-lg'>
            {`These are your journal entries for the week of ${dateString(
              journals[currentJournalIndex].weekStart
            )} to ${dateString(
              journals[currentJournalIndex].weekEnd
            )}. Choose an entry to modify, or create a new entry.`}
          </h2>
        </div>

        {/* <ColumnItem>
          <h2>Create a new entry</h2>
        </ColumnItem> */}

        {entries[currentJournalIndex].map((entry) => (
          <ColumnItem key={createId()}>
            <EntrySelectItem entry={entry} currentIndex={currentJournalIndex} />
          </ColumnItem>
        ))}
      </div>
    </div>
  );
};

export default JournalSelect;
