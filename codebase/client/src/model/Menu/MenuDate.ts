import createId from 'src/utils/createId';

class MenuDate {
  private _startDate: Date;
  private _id: string;

  constructor(startDate: Date, id: string = createId()) {
    this._id = id;
    this._startDate = new Date(startDate);
  }

  get id(): string {
    return this._id;
  }

  get startDate(): Date {
    return new Date(this._startDate);
  }

  clone(): MenuDate {
    return new MenuDate(this._startDate, this._id);
  }
}

export default MenuDate;
