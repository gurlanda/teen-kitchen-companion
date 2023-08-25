import createId from 'src/utils/createId';
import MenuFile from './MenuFile';
import { Timestamp } from 'firebase/firestore';
import { isSameDay } from 'date-fns';

export type StorableMenu = {
  startDate: Timestamp;
  fileId: string | null;
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
    let menuFileId: string | null;
    if (this._file.url === null) {
      menuFileId = null;
    } else {
      menuFileId = this._file.id;
    }

    return {
      startDate: Timestamp.fromDate(this._startDate),
      fileId: menuFileId,
    };
  }

  static fromStorable(
    storableMenu: StorableMenu,
    menuFile: MenuFile,
    id: string
  ): Menu {
    return new Menu(storableMenu.startDate.toDate(), menuFile, id);
  }
}

export default Menu;
