import React from 'react';
import { Link } from 'react-router-dom';
import Entry from 'src/model/Journal/Entry';

const EntrySelectItem: React.FC<{ entry: Entry }> = ({ entry }) => {
  const { submittedAt, id } = entry;

  return (
    <Link
      className="flex flex-col items-center group"
      to={`/journal/entry/${id}`}
    >
      <h3 className="font-bold">{`Entry for ${submittedAt}`}</h3>
      <p className="italic text-blue-400 group-hover:text-blue-600">
        Edit this entry
      </p>
    </Link>
  );
};

export default EntrySelectItem;
