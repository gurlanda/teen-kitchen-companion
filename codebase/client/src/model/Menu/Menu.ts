import createId from 'src/utils/createId';
import MenuFile, { StorableMenuFile } from './MenuFile';
import { Timestamp } from 'firebase/firestore';
import { isSameDay } from 'date-fns';

export type StorableMenu = {
  startDate: Timestamp;
  file: StorableMenuFile | null;
};

class Menu {
  private _startDate: Date;
  private _file: MenuFile;
  private _id: string;

  constructor(startDate: Date, file: MenuFile, id: string = createId()) {
    this._file = file.clone();
    this._startDate = new Date(startDate);
    this._id = id;
  }

  get startDate(): Date {
    return new Date(this._startDate);
  }

  get file(): MenuFile {
    return this._file.clone();
  }

  get id(): string {
    return this._id;
  }

  set file(newFile: MenuFile) {
    this._file = newFile.clone();
  }

  clone(): Menu {
    return new Menu(this._startDate, this._file, this._id);
  }

  equals(other: Menu): boolean {
    return (
      this._id === other.id &&
      isSameDay(this._startDate, other.startDate) &&
      this._file.equals(other.file)
    );
  }

  toStorable(): StorableMenu {
    let menuFile: StorableMenuFile | null;
    if (this._file.url === null) {
      menuFile = null;
    } else {
      menuFile = this._file.toStorable();
    }

    return {
      startDate: Timestamp.fromDate(this._startDate),
      file: menuFile,
    };
  }

  static fromStorable(storableMenu: StorableMenu, id: string): Menu {
    let menuFile: MenuFile;
    if (storableMenu.file === null) {
      menuFile = new MenuFile();
    } else {
      menuFile = MenuFile.fromStorable(storableMenu.file);
    }

    return new Menu(storableMenu.startDate.toDate(), menuFile, id);
  }
}

export default Menu;
