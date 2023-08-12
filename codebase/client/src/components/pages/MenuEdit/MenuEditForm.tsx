import React, { useContext } from 'react';
import { Form } from 'react-router-dom';
import StrictModeDroppable from './StrictModeDroppable';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { format } from 'date-fns';

import MenuContext from './context/MenuContext';
import ColumnItem from './components/ColumnItem';
import DraggableColumnItem from './components/DraggableColumnItem';
import DraggableEmptySlot from './components/DraggableEmptySlot';

const MenuEditForm = ({ className }: { className?: string }): JSX.Element => {
  const { files, dates, setPreviewedFile, changeFile, moveFile, addNewWeek } =
    useContext(MenuContext);

  return (
    <Form
      className={`flex flex-col gap-2 border border-gray-300 rounded-xl py-4 px-5 max-w-[60%] ${className}`}
    >
      <h2 className="text-lg font-semibold">Menu edit form</h2>
      <Button onClick={() => addNewWeek()}>Add new week</Button>
      <div className="flex">
        <div className="flex flex-col grow basis-0">
          {dates.map((date, index) => (
            <ColumnItem key={index}>{formatDate(date)}</ColumnItem>
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="fileColumn">
            {(provided) => (
              <div
                className="flex flex-col grow basis-0"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {files.map(({ fileUrl, id }, index) =>
                  fileUrl === '' ? (
                    <DraggableEmptySlot
                      draggableId={id}
                      index={index}
                      key={id}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files || files.length === 0) {
                          return;
                        }

                        const chosenFile = files[0];
                        const fileUrl = URL.createObjectURL(chosenFile);

                        changeFile(index, fileUrl);
                        setPreviewedFile(fileUrl);
                      }}
                    />
                  ) : (
                    <DraggableColumnItem
                      draggableId={id}
                      index={index}
                      key={id}
                      onClick={() => setPreviewedFile(fileUrl)}
                    >
                      {fileUrl}
                    </DraggableColumnItem>
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </Form>
  );

  function onDragEnd(result: DropResult) {
    const { draggableId: fileId, source, destination } = result;
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

  function formatDate(date: Date): string {
    const formatString = 'M/d';
    const dateString = format(date, formatString);
    return `Week starting on ${dateString}`;
  }
};

export function action() {
  return null;
}

const Button = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`border rounded-lg px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MenuEditForm;
