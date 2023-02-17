import InputState from './InputState';
import OptionInputState, { getSelectedOpts } from './OptionInputState';
import RowQuestionInputState from './RowQuestionInputState';
import { RowQuestion } from '../../../model/survey/question/GridQuestion';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from '../../../model/survey/questionTypes';

class MultChoiceGridInputState extends InputState {
  constructor(
    isRequired,
    isOneToOne,
    mainQuestionText,
    questionHeader,
    questionId,
    options,
    rowQuestions,
    response = null
  ) {
    super(
      Qtypes.MULT_CHOICE_GRID,
      isRequired,
      mainQuestionText,
      questionHeader,
      questionId
    );
    this.isOneToOne = isOneToOne;

    this.options = options.map((opt) => {
      if (opt instanceof OptionInputState) {
        return opt.clone();
      } else if (opt instanceof Option) {
        return new OptionInputState(opt.text, opt.id, false);
      } else if (opt.hasOwnProperty('text') && opt.hasOwnProperty('id')) {
        return new OptionInputState(opt.text, opt.id, false);
      } else {
        throw new TypeError(
          `In constructor MultChoiceGridInputState(): ${options} passed into parameter options is not an array of Options or OptionInputStates`
        );
      }
    });

    this.rowQuestions = rowQuestions.map((row) => {
      if (row instanceof RowQuestionInputState) {
        return row.clone();
      } else if (row instanceof RowQuestion) {
        return new RowQuestionInputState(row.text, row.id, this.options);
      } else if (row.hasOwnProperty('text') && row.hasOwnProperty('id')) {
        return new RowQuestionInputState(row.text, row.id, this.options);
      } else {
        throw new TypeError(
          `In constructor MultChoiceGridInputState(): ${rowQuestions} passed into parameter rowQuestions is not an array of RowQuestions or RowQuestionInputStates`
        );
      }
    });
  }

  // Returns true if there is at most one option checked per column
  doesFollowOneToOne() {
    let checkedOptions = this.rowQuestions.map((row) => row.getCheckedIndex());

    // Return true if and only if there is at least two elements in checkedOptions that are equal to each other AND they are not equal to -1
    for (let i = 0; i < checkedOptions.length; i++) {
      let currentOpt = checkedOptions[i];
      if (currentOpt !== -1) {
        for (let j = i + 1; j < checkedOptions.length; j++) {
          if (currentOpt === checkedOptions[j]) return false;
        }
      }
    }

    return true;
  }

  // Returns true if there is at least one option checked in the whole grid
  isAnswered() {
    for (let i = 0; i < this.rowQuestions.length; i++) {
      if (this.rowQuestions[i].isAnswered()) return true;
    }

    return false;
  }

  // Returns true if EVERY row has at least one option checked
  isAllAnswered() {
    for (let i = 0; i < this.rowQuestions.length; i++) {
      if (this.rowQuestions[i].isAnswered() === false) return false;
    }

    return true;
  }

  clone() {
    let newState = new MultChoiceGridInputState(
      this.isRequired,
      this.isOneToOne,
      this.text,
      this.header,
      this.id,
      this.options,
      this.rowQuestions
    );

    newState.isDanger = this.isDanger;
    return newState;
  }

  cloneOptions() {
    return this.options.map((opt) => opt.clone());
  }

  cloneRowQuestions() {
    return this.rowQuestions.map((row) => row.clone());
  }

  createSetDanger(isDanger) {
    return (oldState) => {
      let newState = oldState.clone();
      newState.isDanger = isDanger;
      return newState;
    };
  }

  createSetOption(selectedRowId, selectedOptId) {
    return (oldState) => {
      const newRows = oldState.rowQuestions.map((row) => {
        if (row.id !== selectedRowId) {
          return row.clone();
        } else {
          const rowOptions = row.options.map((opt) => {
            if (opt.id !== selectedOptId) {
              return new OptionInputState(opt.text, opt.id, false);
            } else {
              return new OptionInputState(opt.text, opt.id, true);
            }
          });

          return new RowQuestionInputState(row.text, row.id, rowOptions);
        }
      });

      return new MultChoiceGridInputState(
        oldState.isRequired,
        oldState.isOneToOne,
        oldState.text,
        oldState.header,
        oldState.id,
        oldState.options,
        newRows
      );
    };
  }

  toResponse() {
    const value = this.rowQuestions.map((row) => {
      return {
        questionText: row.text,
        id: row.id,
        response: getSelectedOpts(row.options),
      };
    });

    const res = new Response(
      this.type,
      this.text,
      this.id,
      value,
      MultChoiceGridInputState.cloneVal
    );
    return res;
  }

  static cloneVal = (val) => {
    return val.map((row) => RowQuestionInputState.cloneVal(row));
  };
}

export default MultChoiceGridInputState;
