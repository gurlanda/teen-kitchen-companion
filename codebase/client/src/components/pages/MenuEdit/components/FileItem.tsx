import { format } from 'date-fns';
import ColumnItem from './utilities/ColumnItem';
import { useContext } from 'react';
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
  const { setPreviewedFile, deleteFile } = useContext(MenuContext);

  return (
    <DraggableColumnItem
      className="flex gap-2"
      draggableId={file.id}
      index={index}
      onClick={() => setPreviewedFile(file.url)}
    >
      <span className="basis-0 grow break-all">{file.url}</span>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteFile(index);
        }}
        className="basis-0"
      >
        Delete file
      </Button>
    </DraggableColumnItem>
  );
};

export default FileItem;
