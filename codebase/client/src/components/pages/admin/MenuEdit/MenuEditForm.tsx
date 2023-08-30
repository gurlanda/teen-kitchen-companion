import { useContext } from 'react';
import { Form } from 'react-router-dom';
import StrictModeDroppable from './components/utilities/StrictModeDroppable';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import MenuContext from './context/MenuContext';
import EmptyFileItem from './components/EmptyFileItem';
import Button from '../../../layout/Button';
import DateItem from './components/DateItem';
import FileItem from './components/FileItem';

import ColumnItem from './components/utilities/ColumnItem';
import { Interval, addWeeks, isWithinInterval, previousSunday } from 'date-fns';
import numMenusAvailableToClients from 'src/firebase/Menu/numMenusAvailableToClients';

const MenuEditForm = ({ className }: { className?: string }): JSX.Element => {
  const { files, dates, moveFile, addNewWeek, uploadAllFiles, isDataChanged } =
    useContext(MenuContext);

  return (
    <Form
      className={`flex flex-col gap-4 border border-gray-300 rounded-md pt-7 pb-5 px-8 max-w-[60%] ${className}`}
    >
      <section className="flex flex-col gap-3">
        <h2 className="text-5xl font-heading font-bold">Edit weekly menus</h2>

        <p>
          Click a menu to preview it. Rearrange menus by dragging a menu and
          dropping it to the desired week. Reveal more options by clicking a
          <i className="fas fa-ellipsis-v px-[6px]" />
          button.
        </p>
      </section>

      <div className="flex gap-2">
        <Button className="grow" onClick={() => addNewWeek()}>
          Add new weekly menu
        </Button>
        <Button
          className={`grow disabled:border-gray-300 disabled:text-gray-300`}
          disabled={!isDataChanged()}
          onClick={() => uploadAllFiles()}
        >
          {isDataChanged() ? 'Upload changes' : 'No changes to upload'}
        </Button>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <ColumnItem className="flex items-center justify-center bg-slate-500 text-slate-100 text-xl rounded-tl-md">
            Week
          </ColumnItem>
          {dates.map((date, index) => (
            <DateItem
              menuDate={date}
              key={index}
              index={index}
              isVisibleByClient={dateIsVisibleToClient(date.startDate)}
            />
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="fileColumn">
            {(provided) => (
              <div
                className="flex flex-col grow text-gray-800"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <ColumnItem className="flex items-center justify-center bg-slate-500 text-slate-100 border-l border-slate-400 text-xl rounded-tr-md">
                  Weekly menu file
                </ColumnItem>
                {files.map((file, index) => {
                  const isLastElement: boolean = index === files.length - 1;
                  const lastElementStyles: string = isLastElement
                    ? 'rounded-br-md'
                    : '';
                  const dateAtIndex = dates[index].startDate;

                  return file.url === null ? (
                    <EmptyFileItem
                      draggableId={file.id}
                      index={index}
                      key={file.id}
                      className={lastElementStyles}
                      isVisibleByClient={dateIsVisibleToClient(dateAtIndex)}
                    />
                  ) : (
                    <FileItem
                      file={file}
                      index={index}
                      key={file.id}
                      className={lastElementStyles}
                      isVisibleByClient={dateIsVisibleToClient(dateAtIndex)}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </Form>
  );

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveFile(source.index, destination.index);
  }

  function dateIsVisibleToClient(date: Date): boolean {
    const numberOfWeeksInVisbilityInterval = numMenusAvailableToClients;
    const earliestVisibleDate = addWeeks(
      previousSunday(Date.now()),
      -numberOfWeeksInVisbilityInterval
    );
    const visibilityInterval: Interval = {
      start: earliestVisibleDate,
      end: Date.now(),
    };
    return isWithinInterval(date, visibilityInterval);
  }
};

export function action() {
  return null;
}

export default MenuEditForm;
