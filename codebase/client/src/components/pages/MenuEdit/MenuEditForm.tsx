import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import StrictModeDroppable from './StrictModeDroppable';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { Duration, add, format } from 'date-fns';

import menuItemConverter, { FileItem } from './model/menuItemConverter';
import testMenuItems from './model/testMenuItems';
import MenuContext from './context/MenuContext';
import createId from 'src/utils/createId';

const MenuEditForm = ({ className }: { className?: string }): JSX.Element => {
  const { setPreviewedFile } = useContext(MenuContext);
  const { dates, files: receivedFiles } =
    menuItemConverter.fromServer(testMenuItems);
  const [files, setFiles] = useState<FileItem[]>(receivedFiles);
  const randomId = createId();

  return (
    <Form
      className={`border border-gray-300 rounded-xl py-4 px-5 max-w-[60%] ${className}`}
    >
      <h2 className="text-lg font-semibold">Menu edit form</h2>

      {/* File upload */}
      {/* <div className="flex gap-2 ml-auto items-center">
        <input type="file" accept=".pdf" onChange={onChooseFile} />
        <Button onClick={uploadFileToDb}>Upload file</Button>
      </div> */}

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

    const newFiles = [...files];
    const targetFile = newFiles.splice(source.index, 1)[0];
    newFiles.splice(destination.index, 0, targetFile);
    setFiles(newFiles);
  }

  function formatDate(date: Date): string {
    const formatString = 'M/d';
    const dateString = format(date, formatString);
    return `Week starting on ${dateString}`;
  }

  function onChooseFile() {
    window.alert('onChooseFile()');
  }

  function uploadFileToDb() {
    window.alert('uploadFileToDb()');
  }
};

export function action() {
  return null;
}

type DivRef = React.LegacyRef<HTMLDivElement> | undefined;
const ColumnItem = ({
  children,
  className,
  innerRef,
  providedProps,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  innerRef?: DivRef;
  providedProps?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div
      className={`py-4 px-6 bg-stone-200  ${className}`}
      ref={innerRef}
      {...providedProps}
      onClick={onClick}
    >
      {children || 'Placeholder'}
    </div>
  );
};

const DraggableColumnItem = ({
  draggableId,
  index,
  children,
  onClick,
}: {
  draggableId: string;
  index: number;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <ColumnItem
          providedProps={{
            ...provided.dragHandleProps,
            ...provided.draggableProps,
          }}
          innerRef={provided.innerRef}
          className="bg-stone-300 hover:bg-stone-400 active:bg-stone-500 select-none min-w-0"
          onClick={onClick}
        >
          {children}
        </ColumnItem>
      )}
    </Draggable>
  );
};

const DraggableEmptySlot = ({
  draggableId,
  index,
}: {
  draggableId: string;
  index: number;
}): JSX.Element => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          className="bg-stone-300 hover:bg-stone-400 active:bg-stone-500 py-1 px-2"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-center items-center py-3 px-4 border-2 border-gray-700 border-dashed rounded-lg">
            <span className="relative">
              {' '}
              <i className=" absolute translate-x-[-120%] translate-y-[-15%] fa-solid fa-file-circle-plus text-2xl" />{' '}
              Add a menu for this week.
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

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
