import createId from 'src/utils/createId';
import MenuFile from './MenuFile';

export type StorableMenu = {
  startDate: Date;
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

  toStorable(): StorableMenu {
    let menuFileId: string | null;
    if (this._file.url === null) {
      menuFileId = null;
    } else {
      menuFileId = this._file.id;
    }

    return { startDate: new Date(this.startDate), fileId: menuFileId };
  }

  static fromStorable(
    storableMenuItem: StorableMenu,
    menuFile: MenuFile,
    id: string
  ): Menu {
    return new Menu(storableMenuItem.startDate, menuFile, id);
  }
}

export default Menu;
