import { Draggable } from 'react-beautiful-dnd';

const DraggableEmptySlot = ({
  draggableId,
  index,
  onChange,
}: {
  draggableId: string;
  index: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          className="bg-stone-300 hover:bg-stone-400 active:bg-stone-500 py-4 px-6"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex gap-2 ml-auto items-center border-2 border-gray-700 border-dashed rounded-l">
            <input
              id={draggableId}
              type="file"
              accept="application/pdf"
              onChange={onChange}
              className="h=[0.1px] w-[0.1] opacity-0 absolute -z-50"
            />
            <label htmlFor={draggableId} className="cursor-pointer relative">
              <i className=" absolute translate-x-[-120%] translate-y-[-15%] fa-solid fa-file-circle-plus text-2xl" />{' '}
              Add a menu for this week.
            </label>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableEmptySlot;
