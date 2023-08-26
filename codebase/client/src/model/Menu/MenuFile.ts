import createId from 'src/utils/createId';
class MenuFile {
  private _id: string;
  private _url: string | null;

  constructor(fileUrl: string | null = null, id: string = createId()) {
    this._url = fileUrl;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get url(): string | null {
    return this._url;
  }

  set url(newUrl: string | null) {
    this._url = newUrl;
  }

  clone(): MenuFile {
    return new MenuFile(this.url, this.id);
  }

  equals(other: MenuFile): boolean {
    return this._id === other.id && this._url === other.url;
  }
}

export default MenuFile;
