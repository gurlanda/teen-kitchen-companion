import { useState } from 'react';
import { Duration, add } from 'date-fns';
import MenuContext from './MenuContext';
import example4Pdf from 'src/assets/pdf/example4.pdf';
import FileItem from '../model/FileItem';

const MenuContextProvider = ({
  files: receivedFiles,
  dates: receivedDates,
  children,
}: {
  files: FileItem[];
  dates: Date[];
  children?: React.ReactNode;
}): JSX.Element => {
  const [previewedFile, setPreviewedFile] = useState<string>(example4Pdf);
  const [files, setFiles] = useState<FileItem[]>(receivedFiles);
  const [dates, setDates] = useState<Date[]>(receivedDates);

  function changeFile(targetIndex: number, fileUrl: string): void {
    const newFiles = files.map((file, index) => {
      if (index === targetIndex) {
        return new FileItem(fileUrl, file.id);
      } else {
        return file.clone();
      }
    });

    setFiles(newFiles);
  }

  function moveFile(fromIndex: number, toIndex: number) {
    if (!isValidIndex(fromIndex, files) || !isValidIndex(toIndex, files)) {
      return;
    }

    const newFiles = files.map((file) => file.clone());
    const targetFile = newFiles.splice(fromIndex, 1)[0];
    newFiles.splice(toIndex, 0, targetFile);

    setFiles(newFiles);
  }

  function addNewWeek(): void {
    const latestDate = new Date(dates[0]);
    const oneWeek: Duration = {
      weeks: 1,
    };

    const newDate = add(latestDate, oneWeek);
    const newDates: Date[] = [newDate, ...dates.map((date) => new Date(date))];

    setDates(newDates);

    const newFiles = [new FileItem(), ...files.map((file) => file.clone())];
    setFiles(newFiles);
  }

  function deleteDate(targetIndex: number): void {
    const newDates = dates
      .filter((date, index) => index !== targetIndex)
      .map((date) => new Date(date));

    setDates(newDates);
  }

  const providedValues = {
    previewedFile,
    files,
    dates,
    setPreviewedFile,
    changeFile,
    moveFile,
    addNewWeek,
    deleteDate,
  };

  return (
    <MenuContext.Provider value={providedValues}>
      {children}
    </MenuContext.Provider>
  );
};

function isValidIndex(index: number, array: Array<any>): boolean {
  if (index < 0 || index >= array.length) {
    return false;
  } else {
    return true;
  }
}

export default MenuContextProvider;
