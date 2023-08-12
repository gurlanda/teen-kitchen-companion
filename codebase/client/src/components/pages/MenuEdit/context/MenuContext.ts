import { createContext } from 'react';
import File from '../model/File';

interface MenuContext {
  previewedFile: string;
  files: File[];
  dates: Date[];

  setPreviewedFile(file: string): void;
  changeFile(index: number, fileUrl: string): void;
  moveFile(fromIndex: number, toIndex: number): void;
  deleteFile(index: number): void;

  addNewWeek(): void;
  deleteWeek(index: number): void;
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
};

const menuContext = createContext<MenuContext>(initialMenuContext);
export default menuContext;
