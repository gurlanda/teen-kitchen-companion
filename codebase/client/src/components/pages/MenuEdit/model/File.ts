import createId from 'src/utils/createId';

class File {
  private _id: string;
  private _fileUrl: string;

  constructor(fileUrl: string = '', id: string = createId()) {
    this._fileUrl = fileUrl;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get fileUrl(): string {
    return this._fileUrl;
  }

  set fileUrl(newUrl: string) {
    this._fileUrl = newUrl;
  }

  clone(): File {
    return new File(this.fileUrl, this.id);
  }
}

export default File;
