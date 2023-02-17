import Response from '../survey/response/Response';

export default class JournalEntry {
  constructor(entryId, userId, journalId, submittedAt, responses) {
    if (
      !(
        submittedAt instanceof Date ||
        submittedAt instanceof Number ||
        submittedAt === null
      ) ||
      !(userId instanceof String || typeof userId === 'string') ||
      !(entryId instanceof String || typeof entryId === 'string') ||
      !(responses instanceof Array) ||
      !(journalId instanceof String || typeof journalId === 'string')
    ) {
      throw new TypeError(
        'In constructor JournalEntry(): One or more arguments are of invalid type'
      );
    }

    for (const res of responses) {
      if (!(res instanceof Response)) {
        throw new TypeError(
          'In constructor JournalEntry(): One or more arguments are of invalid type'
        );
      }
    }

    this.submittedAt = new Date(submittedAt);
    this.userId = userId;
    this.id = entryId;
    this.journalId = journalId;
    this.responses = responses.map((res) => res.clone());
  }

  clone() {
    return new JournalEntry(
      this.id,
      this.userId,
      this.journalId,
      this.submittedAt,
      this.responses
    );
  }

  toStorable() {
    return {
      id: this.id,
      userId: this.userId,
      journalId: this.journalId,
      submittedAt: this.submittedAt.getTime(),
      responses: this.responses.map((res) => res.toStorable()),
    };
  }

  static fromData(data) {
    try {
      const responses = data?.responses?.map((resData) =>
        Response.fromData(resData)
      );
      return new JournalEntry(
        data?.id,
        data?.userId,
        data?.journalId,
        data?.submittedAt,
        responses
      );
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          'In JournalEntry.fromData(): A new JournalEntry cannot be created from the given data.'
        );
      }
    }
  }
}
