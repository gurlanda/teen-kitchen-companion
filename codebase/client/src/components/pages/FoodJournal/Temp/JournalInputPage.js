import React from 'react';
import { useParams } from 'react-router-dom';
import JournalState from 'src/context/journal/JournalState';
import FoodJournal from './FoodJournalTemp';
import journals from './testData';

const JournalInputPage = () => {
  const { id } = useParams();

  return (
    <JournalState journal={journals[id]}>
      <FoodJournal />
    </JournalState>
  );
};

export default JournalInputPage;
