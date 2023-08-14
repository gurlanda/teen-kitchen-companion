import { useContext } from 'react';
import { Form } from 'react-router-dom';
import StrictModeDroppable from './components/utilities/StrictModeDroppable';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { faker } from '@faker-js/faker';

import MenuContext from './context/MenuContext';
import DraggableColumnItem from './components/utilities/DraggableColumnItem';
import EmptyFileItem from './components/EmptyFileItem';
import Button from './components/utilities/Button';
import DateItem from './components/DateItem';
import FileItem from './components/FileItem';
import createId from 'src/utils/createId';
import ColumnItem from './components/utilities/ColumnItem';

const MenuEditForm = ({ className }: { className?: string }): JSX.Element => {
  const { files, dates, setPreviewedFile, changeFile, moveFile, addNewWeek } =
    useContext(MenuContext);

  return (
    <Form
      className={`flex flex-col gap-4 border border-gray-300 rounded-md pt-7 pb-5 px-8 max-w-[60%] ${className}`}
    >
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold">Edit weekly menus</h2>

        <p>
          Click a menu to preview it. Rearrange menus by dragging a menu and
          dropping it to the desired week. Reveal more options by clicking a
          <i className="fas fa-ellipsis-v px-[6px]" />
          button.
        </p>
      </section>

      <Button onClick={() => addNewWeek()}>Add new weekly menu</Button>

      <div className="flex">
        <div className="flex flex-col">
          <ColumnItem className="flex items-center bg-slate-500 text-slate-100 text-xl rounded-tl-md">
            Week
          </ColumnItem>
          {dates.map((date, index) => (
            <DateItem date={date} key={index} index={index} />
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
                <ColumnItem className="flex items-center bg-slate-500 text-slate-100 border-l border-slate-400 text-xl rounded-tr-md">
                  Weekly menu file
                </ColumnItem>
                {files.map((file, index) => {
                  const isLastElement: boolean = index === files.length - 1;
                  const lastElementStyles: string = isLastElement
                    ? 'rounded-br-md'
                    : '';

                  return file.url === '' ? (
                    <EmptyFileItem
                      draggableId={file.id}
                      index={index}
                      key={file.id}
                      className={lastElementStyles}
                    />
                  ) : (
                    <FileItem
                      file={file}
                      index={index}
                      key={file.id}
                      className={lastElementStyles}
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
};

export function action() {
  return null;
}

export default MenuEditForm;
