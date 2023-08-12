import { createContext } from 'react';
import FileItem from '../model/FileItem';

interface MenuContext {
  previewedFile: string;
  files: FileItem[];
  dates: Date[];

  setPreviewedFile(file: string): void;
  changeFile(index: number, fileUrl: string): void;
  moveFile(fromIndex: number, toIndex: number): void;

  addNewWeek(): void;
  deleteDate(index: number): void;
}

const initialMenuContext: MenuContext = {
  previewedFile: '',
  files: [],
  dates: [],

  setPreviewedFile(file: string) {},
  changeFile(index: number, fileUrl: string) {},
  moveFile(fromIndex: number, toIndex: number) {},
  addNewWeek() {},
  deleteDate(index: number) {},
};

const menuContext = createContext<MenuContext>(initialMenuContext);
export default menuContext;
