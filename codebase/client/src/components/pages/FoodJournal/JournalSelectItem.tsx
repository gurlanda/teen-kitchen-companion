import React from 'react';
import Journal from 'src/model/archive/Journal/Journal';

/**
 * Formats a Date into MM DD format.
 * @param dateObj The input Date object.
 * @returns The input Date as a string in MM DD format.
 */
const dateString = (dateObj: Date): string => {
  const parts = dateObj.toDateString().split(' ');
  const month = parts[1];
  const date = parts[2];
  return `${month} ${date}`;
};

const JournalSelectItem: React.FC<{
  journal: Journal;
  isSelected: boolean;
  onClick: { (): void };
}> = ({ journal, isSelected, onClick }) => {
  const { weekStart, weekEnd } = journal;

  return (
    <div
      className={`flex flex-col min-w-[6rem] p-2.5 text-center shadow-lg border rounded-xl ${
        isSelected ? 'border-4 border-cyan-500' : ''
      } tk-acumin-pro-condensed text-lg font-bold text-gray-700`}
      onClick={() => onClick()}
    >
      <span className="block">{`${dateString(weekStart)} to`}</span>
      <span className="block">{`${dateString(weekEnd)}`}</span>
    </div>
  );
};

export default JournalSelectItem;
