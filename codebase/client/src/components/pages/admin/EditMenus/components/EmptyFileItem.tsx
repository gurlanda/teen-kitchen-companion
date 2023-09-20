import { useContext, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import MenuContext from '../context/MenuContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import ColumnItem from './utilities/ColumnItem';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const EmptyFileItem = ({
  draggableId,
  index,
  className,
  isVisibleByClient,
}: {
  draggableId: string;
  index: number;
  className?: string;
  isVisibleByClient?: boolean;
}): JSX.Element => {
  const { changeFile, setPreviewedFileIndex } = useContext(MenuContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { preferredLanguage } = useContext(LanguageContext);

  const isVisibleByClientStyles = `bg-sky-300 hover:bg-sky-400 active:bg-sky-500 bg-opacity-30 hover:bg-opacity-40 active:bg-opacity-50`;
  const isNotVisibleByClientStyles = `bg-slate-300 hover:bg-slate-400 active:bg-slate-500`;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <ColumnItem
          className={`flex items-stretch
          
          ${
            isVisibleByClient
              ? isVisibleByClientStyles
              : isNotVisibleByClientStyles
          }
          
          py-[8px] px-[10px] cursor-pointer ${className}`}
          providedProps={{
            ...provided.dragHandleProps,
            ...provided.draggableProps,
          }}
          innerRef={provided.innerRef}
          onClick={() => inputRef.current?.click()}
        >
          <div className="grow flex items-center justify-center gap-2 px-4 py-3 ml-auto  border-2 border-gray-500 text-gray-600 border-dashed rounded-lg">
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
                setPreviewedFileIndex(index);
              }}
              className="h=[0.1px] w-[0.1] opacity-0 absolute -z-50"
            />
            <label
              htmlFor={draggableId}
              className="cursor-pointer relative pl-7"
              onClick={(e) => e.stopPropagation()}
              // If propagation isn't stopped, then the MouseEvent will bubble up to the ColumnItem and trigger its click listener
            >
              <i className=" absolute translate-x-[-125%] translate-y-[-15%] fa-solid fa-file-circle-plus text-2xl" />{' '}
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    'Click here to add a menu for this week.',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </label>
          </div>
        </ColumnItem>
      )}
    </Draggable>
  );
};

export default EmptyFileItem;
