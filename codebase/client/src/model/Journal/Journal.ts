import Identifiable from '../Interfaces/Identifiable';
import Clonable from '../Interfaces/Clonable';
import Question from '../Question/Question';
import * as DateUtil from '../../utils/DateUtil';
import StorableJournal from '../Storables/StorableJournal';

export default class Journal implements Clonable<Journal>, Identifiable {
  id: string;
  weekStart: Date;
  weekEnd: Date;
  questions: Question[];

  constructor(
    weekStart: Date | number,
    weekEnd: Date | number,
    questions: Question[],
    journalId: string
  ) {
    this.weekStart = DateUtil.toDate(weekStart);
    this.weekEnd = DateUtil.toDate(weekEnd);
    this.id = journalId;
    this.questions = questions.map((ques) => ques.clone());
  }

  clone(): Journal {
    return new Journal(this.weekStart, this.weekEnd, this.questions, this.id);
  }

  toStorable(): StorableJournal {
    return {
      weekStart: this.weekStart.getTime(),
      weekEnd: this.weekEnd.getTime(),
      _id: this.id,
      questions: this.questions.map((ques) => ques.toStorable()),
    };
  }

  static fromStorable(data: StorableJournal): Journal {
    return new Journal(
      data.weekStart,
      data.weekEnd,
      data.questions.map((ques) => Question.fromStorable(ques)),
      data._id
    );
  }
}
