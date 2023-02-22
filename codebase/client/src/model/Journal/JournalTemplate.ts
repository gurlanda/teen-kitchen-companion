import Clonable from '../Interfaces/Clonable';
import Question from '../Question/Question';
import StorableJournalTemplate from '../Storables/StorableJournalTemplate';

export default class JournalTemplate implements Clonable<JournalTemplate> {
  questions: Question[];

  constructor(questions: Question[]) {
    this.questions = questions.map((ques) => ques.clone());
  }

  clone(): JournalTemplate {
    return new JournalTemplate(this.questions);
  }

  toStorable(): StorableJournalTemplate {
    return {
      questions: this.questions.map((ques) => ques.toStorable()),
    };
  }

  static fromStorable(data: StorableJournalTemplate): JournalTemplate {
    return new JournalTemplate(
      data.questions.map((ques) => Question.fromStorable(ques))
    );
  }
}
