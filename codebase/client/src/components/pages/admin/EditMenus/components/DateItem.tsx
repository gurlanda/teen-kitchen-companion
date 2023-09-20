import { add, format } from 'date-fns';
import ColumnItem from './utilities/ColumnItem';
import { useContext, useState } from 'react';
import MenuContext from '../context/MenuContext';
import EllipsisMenu, {
  EllipsisButton,
  EllipsisMenuItem,
} from './utilities/EllipsisMenu';
import createId from 'src/utils/createId';
import MenuDate from 'src/model/Menu/MenuDate';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const DateItem = ({
  menuDate,
  index,
  isVisibleByClient,
}: {
  menuDate: MenuDate;
  index: number;
  isVisibleByClient?: boolean;
}): JSX.Element => {
  const menuContext = useContext(MenuContext);
  const [isEllipsisMenuVisible, setIsEllipsisMenuVisible] =
    useState<boolean>(false);
  const [id] = useState<string>(createId());
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <ColumnItem
      className={`relative flex items-center gap-2 

      ${
        isVisibleByClient
          ? 'bg-sky-400 bg-opacity-40 text-slate-800'
          : 'bg-slate-400 text-slate-50'
      } 
      
      pl-[16px] pr-7 last:rounded-bl-md `}
    >
      <span className="basis-0 grow text-center">
        {getDateItemContent(menuDate.startDate)}
      </span>

      <EllipsisButton
        className={`${
          isVisibleByClient
            ? 'text-sky-500 text-opacity-50 hover:text-sky-100 active:text-sky-900'
            : 'text-gray-300 hover:text-gray-100 active:text-gray-900'
        }`}
        onClick={() => setIsEllipsisMenuVisible(!isEllipsisMenuVisible)}
      />

      <EllipsisMenu
        isVisible={isEllipsisMenuVisible}
        setIsVisible={setIsEllipsisMenuVisible}
        id={'ellipsis-menu-' + id}
        className="text-black"
      >
        <EllipsisMenuItem onClick={() => menuContext.deleteWeek(index)}>
          {
            {
              [SupportedLanguage.ENGLISH]: 'Delete week',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
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
