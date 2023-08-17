import { useContext, useRef, useState } from 'react';
import MenuContext from '../context/MenuContext';
import MenuFile from '../model/MenuFile';
import ColumnItem from './utilities/ColumnItem';
import { Draggable } from 'react-beautiful-dnd';
import EllipsisMenu, {
  EllipsisButton,
  EllipsisMenuItem,
} from './utilities/EllipsisMenu';

const FileItem = ({
  file,
  index,
  className,
}: {
  file: MenuFile;
  index: number;
  className?: string;
}): JSX.Element => {
  const { previewedFile, setPreviewedFile, deleteFile, changeFile } =
    useContext(MenuContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEllipsisMenuVisible, setIsEllipsisMenuVisible] =
    useState<boolean>(false);

  const isSelected = previewedFile === file.url;

  return (
    <Draggable draggableId={file.id} index={index}>
      {(provided) => (
        <div
          className="relative"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <ColumnItem
            className={`flex items-center relative gap-2 ${
              isSelected ? 'bg-slate-100' : 'bg-slate-300'
            } hover:bg-slate-400 active:bg-slate-500 select-none ${className}`}
            onClick={() => (file.url ? setPreviewedFile(file.url) : null)}
          >
            <input
              type="file"
              ref={inputRef}
              accept="application/pdf"
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
            <span className="basis-0 grow break-all">{file.url}</span>
          </ColumnItem>

          <EllipsisButton
            className="text-gray-500 hover:text-gray-50 active:text-gray-900"
            onClick={(e) => {
              e.stopPropagation();
              setIsEllipsisMenuVisible(!isEllipsisMenuVisible);
            }}
          />

          <EllipsisMenu
            isVisible={isEllipsisMenuVisible}
            setIsVisible={setIsEllipsisMenuVisible}
            id={'ellipsis-menu-' + file.id}
          >
            <EllipsisMenuItem onClick={onClickReplace}>
              Replace file
            </EllipsisMenuItem>
            <EllipsisMenuItem onClick={onClickDelete}>
              Delete file
            </EllipsisMenuItem>
          </EllipsisMenu>
        </div>
      )}
    </Draggable>
  );

  function onClickDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    deleteFile(index);
    setIsEllipsisMenuVisible(false);
  }

  function onClickReplace(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
    setIsEllipsisMenuVisible(false);
  }
};

export default FileItem;
