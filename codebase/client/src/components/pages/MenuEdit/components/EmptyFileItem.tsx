import { useContext, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import MenuContext from '../context/MenuContext';
import ColumnItem from './utilities/ColumnItem';

const EmptyFileItem = ({
  draggableId,
  index,
}: {
  draggableId: string;
  index: number;
}): JSX.Element => {
  const { changeFile, setPreviewedFile } = useContext(MenuContext);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <ColumnItem
          className="flex items-stretch bg-slate-300 hover:bg-slate-400 active:bg-slate-500 py-[8px] px-[10px] cursor-pointer"
          providedProps={{
            ...provided.dragHandleProps,
            ...provided.draggableProps,
          }}
          innerRef={provided.innerRef}
          onClick={() => {
            window.alert(`ID: ${draggableId}`);
            // inputRef.current?.click();
          }}
        >
          <div className="grow flex items-center justify-center gap-2 px-4 py-3 ml-auto  border-2 border-gray-700 border-dashed rounded-lg">
            <input
              id={draggableId}
              type="file"
              accept="application/pdf"
              ref={inputRef}
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
              className="h=[0.1px] w-[0.1] opacity-0 absolute -z-50"
            />
            <label
              htmlFor={draggableId}
              className="cursor-pointer relative pl-7"
            >
              <i className=" absolute translate-x-[-125%] translate-y-[-15%] fa-solid fa-file-circle-plus text-2xl" />{' '}
              Add a menu for this week.
            </label>
          </div>
        </ColumnItem>
      )}
    </Draggable>
  );
};

export default EmptyFileItem;
