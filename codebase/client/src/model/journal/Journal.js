import Question from '../survey/question/Question';

export default class Journal {
  constructor(weekStartDate, weekEndDate, questions, journalId) {
    if (
      !(questions instanceof Array) ||
      !(journalId instanceof String || typeof journalId === 'string')
    ) {
      throw new TypeError(
        'In constructor Journal(): One or more arguments are of invalid type'
      );
    }

    for (const ques of questions) {
      if (!(ques instanceof Question)) {
        throw new TypeError(
          'In constructor Journal(): One or more arguments are of invalid type'
        );
      }
    }

    if (
      weekStartDate instanceof String ||
      typeof weekStartDate === 'number' ||
      weekStartDate instanceof Date
    ) {
      this.weekStart = new Date(weekStartDate);
    } else {
      throw new TypeError(
        'In constructor Journal(): One or more arguments are of invalid type'
      );
    }

    if (
      weekEndDate instanceof String ||
      typeof weekEndDate === 'number' ||
      weekEndDate instanceof Date
    ) {
      this.weekEnd = new Date(weekEndDate);
    } else {
      throw new TypeError(
        'In constructor Journal(): One or more arguments are of invalid type'
      );
    }

    this.id = journalId;
    this.questions = questions.map((ques) => ques.clone());
  }

  clone() {
    return new Journal(this.weekStart, this.weekEnd, this.questions, this.id);
  }

  toStorable() {
    return {
      weekStart: this.weekStart.getTime(),
      weekEnd: this.weekEnd.getTime(),
      id: this.id,
      questions: this.questions.map((ques) => ques.toStorable()),
    };
  }

  fromData(data) {
    try {
      const journal = new Journal(
        data?.weekStart,
        data?.weekEnd,
        data?.questions,
        data?.id
      );
      return journal;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(
          'In Journal.fromData(): A new Journal cannot be created using the given data.'
        );
      }
    }
  }
}
