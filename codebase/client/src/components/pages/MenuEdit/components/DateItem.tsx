import { add, format } from 'date-fns';
import ColumnItem from './utilities/ColumnItem';
import { useContext, useState } from 'react';
import MenuContext from '../context/MenuContext';
import EllipsisMenu, {
  EllipsisButton,
  EllipsisMenuItem,
} from './utilities/EllipsisMenu';
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
    <ColumnItem className="relative flex items-center gap-2 bg-slate-400 text-slate-50 pl-[16px] pr-3 last:rounded-bl-md">
      <span className="basis-0 grow text-center">
        {getDateItemContent(date)}
      </span>
      <EllipsisButton
        className="text-gray-300 hover:text-gray-100 active:text-gray-900"
        onClick={() => setIsEllipsisMenuVisible(!isEllipsisMenuVisible)}
      />
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

function getDateItemContent(startDate: Date): string {
  const endOfWeek: Date = add(startDate, { days: 6 });
  return `${formatDate(startDate)} to ${formatDate(endOfWeek)}`;

  function formatDate(date: Date): string {
    const formatString = 'M/d';
    const dateString = format(date, formatString);
    return dateString;
  }
}

export default DateItem;
