import { createContext } from 'react';
import MenuFile from 'src/model/Menu/MenuFile';
import MenuDate from 'src/model/Menu/MenuDate';

interface MenuContext {
  previewedFileIndex: number | null;
  files: MenuFile[];
  dates: MenuDate[];

  setPreviewedFileIndex(newFileIndex: number): void;
  changeFile(index: number, fileUrl: string): void;
  moveFile(fromIndex: number, toIndex: number): void;
  deleteFile(index: number): void;
  uploadAllFiles(): Promise<void>;

  addNewWeek(): void;
  deleteWeek(index: number): void;

  isDataChanged(): boolean;
}

const initialMenuContext: MenuContext = {
  previewedFileIndex: null,
  files: [],
  dates: [],

  setPreviewedFileIndex(newFileIndex: number) {},
  changeFile(index: number, fileUrl: string) {},
  moveFile(fromIndex: number, toIndex: number) {},
  deleteFile(targetIndex: number) {},
  addNewWeek() {},
  deleteWeek(index: number) {},
  async uploadAllFiles() {},
  isDataChanged() {
    return false;
  },
};

const menuContext = createContext<MenuContext>(initialMenuContext);
export default menuContext;
