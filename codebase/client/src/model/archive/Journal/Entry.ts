import Clonable from '../../Interfaces/Clonable';
import Identifiable from '../../Interfaces/Identifiable';
import Response from '../Question/Response';
import * as DateUtil from '../../../utils/DateUtil';
import StorableEntry from '../Storables/StorableEntry';

export default class Entry implements Clonable<Entry>, Identifiable {
  id: string;
  userEmail: string;
  journalId: string;
  submittedAt: Date;
  responses: Response[];

  constructor(
    entryId: string,
    userEmail: string,
    journalId: string,
    responses: Response[],
    submittedAt: Date
  ) {
    this.submittedAt = DateUtil.cloneDate(submittedAt);
    this.userEmail = userEmail;
    this.id = entryId;
    this.journalId = journalId;
    this.responses = responses.map((res) => res.clone());
  }

  clone() {
    return new Entry(
      this.id,
      this.userEmail,
      this.journalId,
      this.responses,
      this.submittedAt
    );
  }

  toStorable(): StorableEntry {
    return {
      _id: this.id,
      userEmail: this.userEmail,
      journalId: this.journalId,
      submittedAt: this.submittedAt.getTime(),
      responses: this.responses.map((res) => res.toStorable()),
    };
  }

  static fromStorable(data: StorableEntry): Entry {
    return new Entry(
      data._id,
      data.userEmail,
      data.journalId,
      data.responses.map((res) => Response.fromStorable(res)),
      DateUtil.toDate(data.submittedAt)
    );
  }
}
