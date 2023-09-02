import { useContext, useRef, useState } from 'react';
import MenuContext from '../context/MenuContext';
import MenuFile from 'src/model/Menu/MenuFile';
import ColumnItem from './utilities/ColumnItem';
import { Draggable } from 'react-beautiful-dnd';
import EllipsisMenu, {
  EllipsisButton,
  EllipsisMenuItem,
} from './utilities/EllipsisMenu';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const FileItem = ({
  file,
  index,
  className,
  isVisibleByClient,
}: {
  file: MenuFile;
  index: number;
  className?: string;
  isVisibleByClient?: boolean;
}): JSX.Element => {
  const { previewedFile, setPreviewedFile, deleteFile, changeFile } =
    useContext(MenuContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEllipsisMenuVisible, setIsEllipsisMenuVisible] =
    useState<boolean>(false);
  const { preferredLanguage } = useContext(LanguageContext);

  const isSelected = previewedFile === file.url;

  const isVisibleByClientStyles = `${
    isSelected ? 'bg-sky-100' : 'bg-sky-300'
  } hover:bg-sky-400 active:bg-sky-500 bg-opacity-30 hover:bg-opacity-40 active:bg-opacity-50`;
  const isNotVisibleByClientStyles = `${
    isSelected ? 'bg-slate-100' : 'bg-slate-300'
  } hover:bg-slate-400 active:bg-slate-500`;

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
            className={`flex items-center relative gap-2
            
            ${
              isVisibleByClient
                ? isVisibleByClientStyles
                : isNotVisibleByClientStyles
            }
            
            select-none ${className}`}
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
            <span className="basis-0 grow break-all">
              {file.url
                ? shorten(file.url)
                : {
                    [SupportedLanguage.ENGLISH]: 'No URL for this file.',
                    [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                  }[preferredLanguage]}
            </span>
          </ColumnItem>

          <EllipsisButton
            className={`
              ${
                isVisibleByClient
                  ? 'text-sky-500 text-opacity-50 hover:text-sky-100 active:text-sky-900'
                  : 'text-gray-500 hover:text-gray-50 active:text-gray-900'
              }
            `}
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
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Replace file',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
            </EllipsisMenuItem>
            <EllipsisMenuItem onClick={onClickDelete}>
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Delete file',
                  [SupportedLanguage.SPANISH]: 'Lorem ipsum',
                }[preferredLanguage]
              }
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

// Shortens a string by cutting off the head-end of the string
// We prioritize the tail-end of the string because that's where ID's are likely to be
function shorten(
  input: string,
  maxSize: number = 50,
  hasEllipsisPrefix: boolean = true
): string {
  let prefix: string;
  if (hasEllipsisPrefix) {
    maxSize -= 3;
    prefix = '...';
  } else {
    prefix = '';
  }

  if (input.length <= maxSize) {
    return input;
  }

  const startIndex = input.length - maxSize;
  const output = prefix + input.substring(startIndex, input.length);
  return output;
}

export default FileItem;
