import { useContext } from 'react';
import { Form } from 'react-router-dom';
import StrictModeDroppable from './components/StrictModeDroppable';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import MenuContext from './context/MenuContext';
import DraggableColumnItem from './components/DraggableColumnItem';
import DraggableEmptySlot from './components/DraggableEmptySlot';
import Button from './components/Button';
import DateItem from './components/DateItem';
import FileItem from './components/FileItem';

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
        <div className="flex flex-col basis-0">
          {dates.map((date, index) => (
            <DateItem date={date} key={index} index={index} />
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="fileColumn">
            {(provided) => (
              <div
                className="flex flex-col basis-0 max-w-[66%]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {files.map((file, index) =>
                  file.url === '' ? (
                    <DraggableEmptySlot
                      draggableId={file.id}
                      index={index}
                      key={file.id}
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
                    <FileItem file={file} index={index} key={file.id} />
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
