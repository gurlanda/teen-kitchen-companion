type StorableMenuItem = {
  startDate: Date; // Should be a storable form of Date, but should it be a string?
  file: string; // A UID
};

class MenuItem {
  private _startDate: Date;
  private _fileUrl: string;

  constructor(startDate: Date, fileUrl: string) {
    this._fileUrl = fileUrl;
    this._startDate = new Date(startDate);
  }

  get startDate(): Date {
    return new Date(this._startDate);
  }

  get fileUrl(): string {
    return this._fileUrl;
  }

  clone(): MenuItem {
    return new MenuItem(this._startDate, this._fileUrl);
  }
}

export default MenuItem;
