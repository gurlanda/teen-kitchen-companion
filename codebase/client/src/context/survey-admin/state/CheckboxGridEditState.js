import { CHECKBOX_GRID } from '../../../model/survey/questionTypes';
import EditState from './EditState';
import Option from '../../../model/survey/question/Option';
import { RowQuestion } from '../../../model/survey/question/GridQuestion';
import { moveElemUp, moveElemDown } from '../../../utils/utils';
import CheckboxGridQuestion from '../../../model/survey/question/CheckboxGridQuestion';

class CheckboxGridEditState extends EditState {
  constructor(
    isRequired,
    isAllRequired,
    mainQuestionText,
    rowQuestions = null,
    options = null,
    id = null
  ) {
    super(CHECKBOX_GRID, isRequired, mainQuestionText, id);

    if (options) {
      this.options = options.map((opt) => opt.clone());
    } else {
      this.options = [new Option('Option 1')];
    }

    if (rowQuestions) {
      this.rowQuestions = rowQuestions.map((row) => row.clone());
    } else {
      this.rowQuestions = [new RowQuestion('Question row 1')];
    }

    this.isAllRequired = isAllRequired;
  }

  clone() {
    return new CheckboxGridEditState(
      this.isRequired,
      this.isAllRequired,
      this.text,
      this.rowQuestions,
      this.options,
      this.id
    );
  }

  // Converts to a format that the server can accept
  toStorable() {
    const opts = this.options.map((opt) => opt.toStorable());
    const rows = this.rowQuestions.map((row) => row.toStorable());

    return {
      isRequired: this.isRequired,
      questionText: this.text,
      type: this.type,
      id: this.id,
      additionalData: {
        rowQuestions: rows,
        options: opts,
        isAllRequired: this.isAllRequired,
      },
    };
  }

  // Converts the current state to a Question object
  toQuestion() {
    return new CheckboxGridQuestion(
      this.isRequired,
      this.text,
      this.rowQuestions,
      this.options,
      this.id
    );
  }

  createToggleIsRequired() {
    return (oldState) => {
      return new CheckboxGridEditState(
        !oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        oldState.options,
        oldState.id
      );
    };
  }

  createToggleIsAllRequired() {
    return (oldState) => {
      return new CheckboxGridEditState(
        oldState.isRequired,
        !oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        oldState.options,
        oldState.id
      );
    };
  }

  createSetQuestionText(newQuestionText) {
    return (oldState) => {
      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        newQuestionText,
        oldState.rowQuestions,
        oldState.options,
        oldState.id
      );
    };
  }

  /**
   * ------------ Option manipulators ------------
   */
  createAddOption() {
    return (oldState) => {
      // Create deep copy
      const opts = oldState.options.map((opt) => opt.clone());
      opts.push(new Option('Option text'));

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        opts,
        oldState.id
      );
    };
  }

  createEditOptionText(optText, optId) {
    return (oldState) => {
      const opts = oldState.options.map((opt) => {
        if (opt.id === optId) {
          return new Option(optText, false, optId);
        } else {
          return opt.clone();
        }
      });

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        opts,
        oldState.id
      );
    };
  }

  createMoveUpOption(optId) {
    return (oldState) => {
      const targetIndex = oldState.options.findIndex((opt) => opt.id === optId);

      // Do nothing if there is no Option with the given ID
      if (targetIndex <= 0) {
        return oldState;
      }

      // Create deep copy
      const optsCopy = oldState.options.map((opt) => opt.clone());
      const newOpts = moveElemUp(optsCopy, targetIndex);

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        newOpts,
        oldState.id
      );
    };
  }

  createMoveDownOption(optId) {
    return (oldState) => {
      const targetIndex = oldState.options.findIndex((opt) => opt.id === optId);

      // Create deep copy
      const optsCopy = oldState.options.map((opt) => opt.clone());
      const newOpts = moveElemDown(optsCopy, targetIndex);

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        newOpts,
        oldState.id
      );
    };
  }

  createDeleteOption(optId) {
    return (oldState) => {
      const opts = oldState.options.filter((opt) => opt.id !== optId);

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        oldState.rowQuestions,
        opts,
        oldState.id
      );
    };
  }

  /**
   * ------------ Row question manipulators ------------
   */
  createAddRow() {
    return (oldState) => {
      // Create deep copy
      const rows = oldState.rowQuestions.map((row) => row.clone());
      rows.push(new RowQuestion('Row text'));

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        rows,
        oldState.options,
        oldState.id
      );
    };
  }

  createEditRowText(rowText, rowId) {
    return (oldState) => {
      const rows = oldState.rowQuestions.map((row) => {
        if (row.id === rowId) {
          return new RowQuestion(rowText, rowId);
        } else {
          return row.clone();
        }
      });

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        rows,
        oldState.options,
        oldState.id
      );
    };
  }

  createMoveUpRow(rowId) {
    return (oldState) => {
      const targetIndex = oldState.rowQuestions.findIndex(
        (row) => row.id === rowId
      );

      // Do nothing if there is no RowQuestion with the given ID
      if (targetIndex <= 0) {
        return oldState;
      }

      // Create deep copy
      const rowsCopy = oldState.rowQuestions.map((row) => row.clone());
      const newRows = moveElemUp(rowsCopy, targetIndex);

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        newRows,
        oldState.options,
        oldState.id
      );
    };
  }

  createMoveDownRow(rowId) {
    return (oldState) => {
      const targetIndex = oldState.rowQuestions.findIndex(
        (row) => row.id === rowId
      );

      // Create deep copy
      const rowsCopy = oldState.rowQuestions.map((row) => row.clone());
      const newRows = moveElemDown(rowsCopy, targetIndex);

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        newRows,
        oldState.options,
        oldState.id
      );
    };
  }

  createDeleteRow(rowId) {
    return (oldState) => {
      const rows = oldState.rowQuestions.filter((row) => row.id !== rowId);

      return new CheckboxGridEditState(
        oldState.isRequired,
        oldState.isAllRequired,
        oldState.text,
        rows,
        oldState.options,
        oldState.id
      );
    };
  }
}

export default CheckboxGridEditState;
