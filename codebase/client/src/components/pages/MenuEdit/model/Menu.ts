import createId from 'src/utils/createId';

export type StorableMenu = {
  startDate: Date;
};

class Menu {
  private _startDate: Date;
  private _fileUrl: string;
  private _id: string;

  constructor(startDate: Date, fileUrl: string, id: string = createId()) {
    this._fileUrl = fileUrl;
    this._startDate = new Date(startDate);
    this._id = id;
  }

  get startDate(): Date {
    return new Date(this._startDate);
  }

  get fileUrl(): string {
    return this._fileUrl;
  }

  get id(): string {
    return this._id;
  }

  clone(): Menu {
    return new Menu(this._startDate, this._fileUrl, this._id);
  }

  toStorable(): StorableMenu {
    return { startDate: new Date(this.startDate) };
  }

  static fromStorable(
    storableMenuItem: StorableMenu,
    fileUrl: string,
    id: string
  ): Menu {
    return new Menu(storableMenuItem.startDate, fileUrl, id);
  }
}

export default Menu;
