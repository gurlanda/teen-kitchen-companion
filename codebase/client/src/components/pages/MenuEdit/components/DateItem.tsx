import { format } from 'date-fns';
import ColumnItem from './utilities/ColumnItem';
import { useContext, useState } from 'react';
import MenuContext from '../context/MenuContext';
import EllipsisMenu, { EllipsisMenuItem } from './utilities/EllipsisMenu';
import createId from 'src/utils/createId';

const DateItem = ({
  date,
  index,
}: {
  date: Date;
  index: number;
}): JSX.Element => {
  const menuContext = useContext(MenuContext);
  const [isEllipsisMenuVisible, setIsEllipsisMenuVisible] =
    useState<boolean>(false);
  const [id] = useState<string>(createId());

  return (
    <ColumnItem className="relative flex items-center gap-2 bg-slate-400 text-slate-50">
      <span className="basis-0 grow">{formatDate(date)}</span>
      <button
        className="basis-0 flex items-center"
        onClick={(e) => setIsEllipsisMenuVisible(!isEllipsisMenuVisible)}
      >
        <i className="fas fa-ellipsis-v text-2xl" />
      </button>
      <EllipsisMenu
        isVisible={isEllipsisMenuVisible}
        setIsVisible={setIsEllipsisMenuVisible}
        id={'ellipsis-menu-' + id}
        className="text-black"
      >
        <EllipsisMenuItem onClick={() => menuContext.deleteWeek(index)}>
          Delete week
        </EllipsisMenuItem>
      </EllipsisMenu>
    </ColumnItem>
  );
};

function formatDate(date: Date): string {
  const formatString = 'M/d';
  const dateString = format(date, formatString);
  return `Week starting on ${dateString}`;
}

export default DateItem;
