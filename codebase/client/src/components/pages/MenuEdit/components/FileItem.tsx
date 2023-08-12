import { format } from 'date-fns';
import ColumnItem from './ColumnItem';
import { useContext } from 'react';
import MenuContext from '../context/MenuContext';
import Button from './Button';
import File from '../model/File';
import DraggableColumnItem from './DraggableColumnItem';

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
      onClick={() => setPreviewedFile(file.fileUrl)}
    >
      <span>{file.fileUrl}</span>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteFile(index);
        }}
      >
        Delete file
      </Button>
    </DraggableColumnItem>
  );
};

export default FileItem;
