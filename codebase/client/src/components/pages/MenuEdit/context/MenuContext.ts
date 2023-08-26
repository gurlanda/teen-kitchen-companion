import { createContext } from 'react';
import MenuFile from '../model/MenuFile';
import MenuDate from '../model/MenuDate';

interface MenuContext {
  previewedFile: string | null;
  files: MenuFile[];
  dates: MenuDate[];

  setPreviewedFile(file: string): void;
  changeFile(index: number, fileUrl: string): void;
  moveFile(fromIndex: number, toIndex: number): void;
  deleteFile(index: number): void;
  uploadAllFiles(): Promise<void>;

  addNewWeek(): void;
  deleteWeek(index: number): void;

  isDataChanged(): boolean;
}

const initialMenuContext: MenuContext = {
  previewedFile: '',
  files: [],
  dates: [],

  setPreviewedFile(file: string) {},
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
