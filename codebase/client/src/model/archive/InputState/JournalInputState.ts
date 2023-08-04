import Clonable from '../../Interfaces/Clonable';
import Reducer from '../../Interfaces/Reducer';
import Identifiable from '../../Interfaces/Identifiable';
import { cloneTransformArray } from '../../Interfaces/InterfaceUtils';
import Journal from '../Journal/Journal';
import Entry from '../Journal/Entry';
import QuestionInputState from './QuestionInputState';
import User from '../../User/User';
import createId from '../../../utils/createId';

class JournalInputState implements Clonable<JournalInputState>, Identifiable {
  private journal: Journal;
  id: string;
  hasRequiredQuestions: boolean;
  didAttemptSubmit: boolean;
  isSubmitted: boolean;
  inputStates: QuestionInputState[];
  get journalId(): string {
    return this.journal.id;
  }
  get weekStart(): Date {
    return this.journal.weekStart;
  }
  get weekEnd(): Date {
    return this.journal.weekEnd;
  }

  constructor(
    journal: Journal,
    inputStates?: QuestionInputState[],
    entryId?: string
  ) {
    this.journal = journal.clone();
    Object.freeze(this.journal);

    // Set both questionInputStates and hasRequiredQuestions at the same time
    // hasRequiredQuesions === true when this Journal has at least one required Question
    this.hasRequiredQuestions = false;
    if (inputStates === undefined) {
      this.inputStates = journal.questions.map((ques) => {
        if (ques.isRequired) {
          this.hasRequiredQuestions = true;
        }

        return new QuestionInputState(ques);
      });
    } else {
      this.inputStates = inputStates.map((ques) => {
        if (ques.isRequired) {
          this.hasRequiredQuestions = true;
        }

        return ques.clone();
      });
    }

    this.didAttemptSubmit = false;
    this.isSubmitted = false;
    if (entryId) {
      this.id = entryId;
    } else {
      this.id = createId();
    }
  }

  clone(): JournalInputState {
    const output = new JournalInputState(this.journal, this.inputStates);
    output.didAttemptSubmit = this.didAttemptSubmit;
    output.isSubmitted = this.isSubmitted;
    return output;
  }

  clearedClone(): JournalInputState {
    const output = new JournalInputState(this.journal);
    output.didAttemptSubmit = this.didAttemptSubmit;
    output.isSubmitted = this.isSubmitted;
    return output;
  }

  toEntry(submitter: User): Entry {
    return new Entry(
      this.id,
      submitter.id,
      this.journalId,
      this.inputStates.map((elem) => elem.toResponse()),
      new Date()
    );
  }

  static fromEntry(originalJournal: Journal, entry: Entry): JournalInputState {
    if (originalJournal.id !== entry.journalId) {
      throw new Error(
        'In JournalInputState.fromEntry(): Journal ID from Journal does not match Journal ID in Entry.'
      );
    }

    const inputStates: QuestionInputState[] = [];
    const questions = originalJournal.questions;
    const responses = entry.responses;
    for (let i in questions) {
      inputStates.push(
        QuestionInputState.fromResponse(questions[i], responses[i])
      );
    }

    return new JournalInputState(originalJournal, inputStates, entry.id);
  }

  isDirty(): boolean {
    for (const question of this.inputStates) {
      if (question.isAnswered()) {
        return true;
      }
    }

    return false;
  }

  private cloneTransformInputStates = cloneTransformArray<QuestionInputState>;
  applyQuestionReducer(
    targetId: string,
    reducer: Reducer<QuestionInputState>
  ): JournalInputState {
    let newInputStates = this.cloneTransformInputStates(
      this.inputStates,
      targetId,
      reducer
    );

    const output = this.clone();
    output.inputStates = newInputStates;
    return output;
  }
}
export default JournalInputState;
