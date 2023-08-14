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

  const placeholders = [
    'placeholder',
    'placeholder',
    'placeholder',
    'placeholder',
    'placeholder',
    'placeholder',
  ];

  const longContent =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid maxime quasi dignissimos voluptas quas fuga similique quibusdam consequuntur sapiente unde, velit culpa eaque quod nihil.';
  const longPlaceholders = [
    {
      id: createId(),
      content:
        faker.internet.url() + faker.internet.url() + faker.internet.url(),
    },
    {
      id: createId(),
      content:
        faker.internet.url() + faker.internet.url() + faker.internet.url(),
    },
    {
      id: createId(),
      content:
        faker.internet.url() + faker.internet.url() + faker.internet.url(),
    },
    {
      id: createId(),
      content:
        faker.internet.url() + faker.internet.url() + faker.internet.url(),
    },
    {
      id: createId(),
      content:
        faker.internet.url() + faker.internet.url() + faker.internet.url(),
    },
    {
      id: createId(),
      content:
        faker.internet.url() + faker.internet.url() + faker.internet.url(),
    },
  ];

  return (
    <Form
      className={`flex flex-col gap-4 border border-gray-300 rounded-xl py-4 px-5 max-w-[60%] ${className}`}
    >
      <h2 className="text-lg font-semibold">Menu edit form</h2>
      <Button onClick={() => addNewWeek()}>Add new week</Button>

      <div className="flex rounded-xl overflow-hidden">
        <div className="flex flex-col grow">
          <ColumnItem className="flex items-center bg-slate-500 text-slate-100">
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
                className="flex flex-col grow"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <ColumnItem className="flex items-center bg-slate-500 text-slate-100 border-l border-slate-400">
                  File
                </ColumnItem>
                {files.map((file, index) =>
                  file.url === '' ? (
                    <EmptyFileItem
                      draggableId={file.id}
                      index={index}
                      key={file.id}
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

/* <div className="flex h-full w-full">
        <div className="flex flex-col grow">
          {placeholders.map((content, index) => (
            <div className="bg-stone-100 even:bg-stone-300" key={index}>
              {content}
            </div>
          ))}
        </div>

        <DragDropContext onDragEnd={() => {}}>
          <StrictModeDroppable droppableId="testDroppable">
            {(provided) => {
              return (
                <div
                  className="flex flex-col grow"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {longPlaceholders.map((content, index) => (
                    <Draggable
                      draggableId={content.id}
                      index={index}
                      key={content.id}
                    >
                      {(provided) => (
                        <div
                          className="bg-slate-100 even:bg-slate-300"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {content.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </StrictModeDroppable>
        </DragDropContext>
      </div> */
