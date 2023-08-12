import { Draggable } from 'react-beautiful-dnd';
import ColumnItem from './ColumnItem';

const DraggableColumnItem = ({
  draggableId,
  index,
  children,
  className,
  onClick,
}: {
  draggableId: string;
  index: number;
  children?: React.ReactNode;
  className?: string;
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
          className={`bg-stone-300 hover:bg-stone-400 active:bg-stone-500 select-none min-w-0 ${className}`}
          onClick={onClick}
        >
          {children}
        </ColumnItem>
      )}
    </Draggable>
  );
};

export default DraggableColumnItem;
