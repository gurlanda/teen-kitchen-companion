import createId from 'src/utils/createId';

class File {
  private _id: string;
  private _url: string;

  constructor(fileUrl: string = '', id: string = createId()) {
    this._url = fileUrl;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get url(): string {
    return this._url;
  }

  set url(newUrl: string) {
    this._url = newUrl;
  }

  clone(): File {
    return new File(this.url, this.id);
  }
}

export default File;
