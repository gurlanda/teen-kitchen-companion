import Clonable from "../Interfaces/Clonable";
import Reducer from "../Interfaces/Reducer";
import Identifiable from "../Interfaces/Identifiable";
import { cloneTransformArray } from '../Interfaces/InterfaceUtils'
import Survey from "../Survey/Survey";
import QuestionInputState from "./QuestionInputState";
import Submission from "../Survey/Submission";
import User from "../User/User";

class SurveyInputState implements Clonable<SurveyInputState>, Identifiable {
  private survey: Survey;
  hasRequiredQuestions: boolean;
  didAttemptSubmit: boolean;
  isSubmitted: boolean;
  inputStates: QuestionInputState[];
  get id(): string { return this.survey.id; }
  get version(): number { return this.survey.version; }
  get description(): string { return this.survey.description; }
  get title(): string { return this.survey.title; }

  constructor(survey: Survey, inputStates?: QuestionInputState[]) {
    this.survey = survey.clone();
    Object.freeze(this.survey);

    // Set both questionInputStates and hasRequiredQuestions at the same time
    // hasRequiredQuesions === true when this Survey has at least one required Question
    this.hasRequiredQuestions = false;
    if (inputStates === undefined) {
      this.inputStates = survey.questions.map(ques => {
        if (ques.isRequired) { 
          this.hasRequiredQuestions = true; 
        }

        return new QuestionInputState(ques)
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
  }

  clone(): SurveyInputState {
    const output = new SurveyInputState(this.survey, this.inputStates);
    output.didAttemptSubmit = this.didAttemptSubmit;
    output.isSubmitted = this.isSubmitted;
    return output;
  }

  getClearedClone(): SurveyInputState {
    const output = new SurveyInputState(this.survey);
    output.didAttemptSubmit = this.didAttemptSubmit;
    output.isSubmitted = this.isSubmitted;
    return output;
  }

  toSubmission(submitter: User): Submission {
    return new Submission(
      this.id, 
      this.version, 
      submitter.id, 
      this.inputStates.map(state => state.toResponse()))
  }

  static fromSubmission(originalSurvey: Survey, sub: Submission): SurveyInputState {
    if (originalSurvey.id !== sub.surveyId) {
      throw new Error('In SurveyInputState.fromResponse(): Survey ID from Survey does not match Survey ID in Submission.')
    }

    const inputStates: QuestionInputState[] = [];
    const questions = originalSurvey.questions;
    const responses = sub.responses;
    for (let i in questions) {
      inputStates.push(QuestionInputState.fromResponse(questions[i], responses[i]));
    }

    return new SurveyInputState(originalSurvey, inputStates);
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
  applyQuestionReducer(targetId: string, reducer: Reducer<QuestionInputState>): SurveyInputState {
    let newInputStates = this.cloneTransformInputStates(this.inputStates, targetId, reducer);

    const output = this.clone();
    output.inputStates = newInputStates;
    return output;
  }
}
export default SurveyInputState;