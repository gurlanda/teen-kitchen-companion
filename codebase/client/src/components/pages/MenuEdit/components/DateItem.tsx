import { format } from 'date-fns';
import ColumnItem from './ColumnItem';
import { useContext } from 'react';
import MenuContext from '../context/MenuContext';
import Button from './Button';

const DateItem = ({
  date,
  index,
}: {
  date: Date;
  index: number;
}): JSX.Element => {
  const menuContext = useContext(MenuContext);

  return (
    <ColumnItem className="flex gap-2">
      <span className="basis-0">{formatDate(date)}</span>
      <Button className="basis-0" onClick={() => menuContext.deleteWeek(index)}>
        Delete week
      </Button>
    </ColumnItem>
  );
};

function formatDate(date: Date): string {
  const formatString = 'M/d';
  const dateString = format(date, formatString);
  return `Week starting on ${dateString}`;
}

export default DateItem;
