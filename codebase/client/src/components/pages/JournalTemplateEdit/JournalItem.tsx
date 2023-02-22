import React from 'react';
import Journal from 'src/model/Journal/Journal';
import dateString from '../FoodJournal/dateString';

const JournalItem: React.FC<{ journal: Journal }> = ({ journal }) => {
  const { weekStart, weekEnd } = journal;

  return (
    <>
      <hr className="bg-gray-100 h-[0.2px] border-0" />
      <div className="px-3 py-7 block text-center">
        <div className="mb-2 bg-inherit">
          <h1 className="font-bold text-lg text-gray-700">{`Journal from ${dateString(
            weekStart
          )} to ${dateString(weekEnd)}`}</h1>
        </div>
      </div>
    </>
  );
};

export default JournalItem;
