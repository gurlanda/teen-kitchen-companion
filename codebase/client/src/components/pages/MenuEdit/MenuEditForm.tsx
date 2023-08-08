import React from 'react';
import { Form } from 'react-router-dom';
import StrictModeDroppable from './StrictModeDroppable';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

const filePlaceholders = [
  { id: 'file1', value: 'File placeholder 1' },
  { id: 'file2', value: 'File placeholder 2' },
  { id: 'file3', value: 'File placeholder 3' },
  { id: 'file4', value: 'File placeholder 4' },
  { id: 'file5', value: 'File placeholder 5' },
];

type DivRef = React.LegacyRef<HTMLDivElement> | undefined;
const Placeholder = ({
  children,
  className,
  innerRef,
  providedProps,
}: {
  children?: React.ReactNode;
  className?: string;
  innerRef?: DivRef;
  providedProps?: any;
}): JSX.Element => {
  return (
    <div
      className={`py-4 px-6 bg-stone-200 ${className}`}
      ref={innerRef}
      {...providedProps}
    >
      {children || 'Placeholder'}
    </div>
  );
};

const DraggablePlaceholder = ({
  draggableId,
  index,
  children,
}: {
  draggableId: string;
  index: number;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <Placeholder
          providedProps={{
            ...provided.dragHandleProps,
            ...provided.draggableProps,
          }}
          innerRef={provided.innerRef}
          className="bg-stone-300"
        >
          {children}
        </Placeholder>
      )}
    </Draggable>
  );
};

const MenuEditForm = ({ className }: { className?: string }): JSX.Element => {
  return (
    <Form
      className={`border border-gray-300 rounded-xl py-4 px-5 ${className}`}
    >
      <h2 className="text-lg font-semibold">Menu edit form</h2>

      {/* File upload */}
      {/* <div className="flex gap-2 ml-auto items-center">
        <input type="file" accept=".pdf" onChange={onChooseFile} />
        <Button onClick={uploadFileToDb}>Upload file</Button>
      </div> */}

      <div className="flex">
        <div className="flex flex-col grow">
          <Placeholder>Date placeholder 1</Placeholder>
          <Placeholder>Date placeholder 2</Placeholder>
          <Placeholder>Date placeholder 3</Placeholder>
          <Placeholder>Date placeholder 4</Placeholder>
          <Placeholder>Date placeholder 5</Placeholder>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="fileColumn">
            {(provided) => (
              <div
                className="flex flex-col grow"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filePlaceholders.map((value, index) => (
                  <DraggablePlaceholder draggableId={value.id} index={index}>
                    {value.value}
                  </DraggablePlaceholder>
                ))}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </Form>
  );

  function onDragEnd() {}

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
