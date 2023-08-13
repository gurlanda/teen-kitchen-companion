import { useContext, useRef, useState } from 'react';
import MenuContext from '../context/MenuContext';
import Button from './utilities/Button';
import File from '../model/File';
import DraggableColumnItem from './utilities/DraggableColumnItem';

const FileItem = ({
  file,
  index,
}: {
  file: File;
  index: number;
}): JSX.Element => {
  const { setPreviewedFile, deleteFile, changeFile } = useContext(MenuContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEllipsisMenuVisible, setIsEllipsisMenuVisible] =
    useState<boolean>(false);

  return (
    <DraggableColumnItem
      className="flex relative gap-2"
      draggableId={file.id}
      index={index}
      onClick={() => setPreviewedFile(file.url)}
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
      {/* <Button onClick={onClickDelete} className="basis-0">
        Delete file
      </Button>
      <Button onClick={onClickReplace} className="basis-0">
        Replace file
      </Button> */}
      <button
        className="flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsEllipsisMenuVisible(!isEllipsisMenuVisible);
        }}
      >
        <i className="fa-solid fa-ellipsis-v text-2xl" />
      </button>

      {/* Ellipsis menu */}
      <div
        className={`absolute left-[calc(100%_+_8px)] top-1/2 -translate-y-1/2 bg-white border rounded-lg overflow-hidden ${
          isEllipsisMenuVisible ? '' : 'hidden'
        }`}
      >
        <EllipsisMenuItem onClick={onClickReplace}>
          Replace file
        </EllipsisMenuItem>
        <EllipsisMenuItem onClick={onClickDelete}>Delete file</EllipsisMenuItem>
      </div>
    </DraggableColumnItem>
  );

  function onClickDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation(); // If this isn't here, then clicking this button will cause the parent's onclick listener to trigger
    deleteFile(index);
    setIsEllipsisMenuVisible(false);
  }

  function onClickReplace(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation(); // If this isn't here, then clicking this button will cause the parent's onclick listener to trigger

    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
    setIsEllipsisMenuVisible(false);
  }
};

const EllipsisMenuItem = ({
  onClick,
  children,
}: {
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <button
      className="bg-white hover:bg-gray-50 active:bg-gray-100 px-4 py-2 w-full min-w-max"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FileItem;
