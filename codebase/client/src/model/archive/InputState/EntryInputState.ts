import QuestionInputState from './QuestionInputState';
import User from '../../User/User';
import Journal from '../Journal/Journal';
import Entry from '../Journal/Entry';
import Clonable from '../../Interfaces/Clonable';
import Reducer from '../../Interfaces/Reducer';
import Identifiable from '../../Interfaces/Identifiable';
import { cloneTransformArray } from '../../Interfaces/InterfaceUtils';
import createId from '../../../utils/createId';
import * as DateUtil from '../../../utils/DateUtil';

class EntryInputState implements Clonable<EntryInputState>, Identifiable {
  private journal: Journal;
  id: string;
  submittedAt?: Date;
  hasRequiredQuestions: boolean;
  didAttemptSubmit: boolean;
  isSubmitted: boolean;
  inputStates: QuestionInputState[];

  constructor(
    journal: Journal,
    inputStates?: QuestionInputState[],
    submittedAt?: Date,
    entryId?: string
  ) {
    this.journal = journal.clone();
    Object.freeze(this.journal);

    if (entryId) {
      this.id = entryId;
    } else {
      this.id = createId();
    }

    // Set both questionInputStates and hasRequiredQuestions at the same time
    // hasRequiredQuesions === true when this Survey has at least one required Question
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
    this.submittedAt = DateUtil.cloneMaybeDate(submittedAt);
  }

  private cloneTransformInputStates = cloneTransformArray<QuestionInputState>;

  clone(): EntryInputState {
    const output = new EntryInputState(
      this.journal,
      this.inputStates,
      this.submittedAt,
      this.id
    );

    output.didAttemptSubmit = this.didAttemptSubmit;
    output.isSubmitted = this.isSubmitted;
    return output;
  }

  getClearedClone(): EntryInputState {
    const output = new EntryInputState(this.journal);
    output.didAttemptSubmit = this.didAttemptSubmit;
    output.isSubmitted = this.isSubmitted;
    return output;
  }

  toEntry(submitter: User): Entry {
    this.submittedAt = new Date();

    return new Entry(
      this.id,
      submitter.id,
      this.journal.id,
      this.inputStates.map((state) => state.toResponse()),
      this.submittedAt
    );
  }

  static fromEntry(originalJournal: Journal, entry: Entry): EntryInputState {
    if (originalJournal.id !== entry.journalId) {
      throw new Error(
        'In EntryInputState.fromResponse(): Entry ID from Entry does not match Entry ID in Entry.'
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

    return new EntryInputState(
      originalJournal,
      inputStates,
      entry.submittedAt,
      entry.id
    );
  }

  applyQuestionReducer(
    targetId: string,
    reducer: Reducer<QuestionInputState>
  ): EntryInputState {
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
export default EntryInputState;
