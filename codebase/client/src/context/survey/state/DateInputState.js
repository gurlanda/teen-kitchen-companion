import DateQuestion from 'src/model/survey/question/DateQuestion';
import InputState from './InputState';
import Response from '../../../model/survey/response/Response';
import * as Qtypes from 'src/model/survey/questionTypes';

// We use a specific default Date to compare against the current value in isAnswered()
const DEFAULT_VALUE = new Date(2000, 0, 1, 0, 0, 0, 0);

export default class DateInputState extends InputState {
  // value must be a UTC timestamp or null
  constructor(
    isRequired,
    questionText,
    questionHeader,
    questionId,
    value = DEFAULT_VALUE
  ) {
    super(Qtypes.DATE, isRequired, questionText, questionHeader, questionId);

    if (
      !(questionHeader instanceof String || typeof questionHeader === 'string')
    ) {
      throw new TypeError(
        "In constructor DateInputState(): Argument passed into parameter 'questionHeader' is not of type String"
      );
    }

    if (
      !(value instanceof Number || typeof value === 'number' || value === null)
    ) {
      throw new TypeError(
        "In constructor DateInputState(): Argument passed into parameter 'value' is of incorrect type"
      );
    }

    this.value = value ? new Date(value) : DEFAULT_VALUE;
    this.isDanger = false;
  }

  static fromQuestion(dateTime) {
    // Initialize value based on what type is passed in
    if (
      !(dateTime instanceof DateInputState || dateTime instanceof DateQuestion)
    ) {
      console.log(
        'In static DateInputState.fromQues(): Parsing error. Passed-in argument:'
      );
      console.log(dateTime);
      throw new TypeError(
        "In static DateInputState.fromQues(): Argument passed into parameter 'dateTime' is not of type DateInputState or DateQuestion"
      );
    }

    return new DateInputState(
      dateTime.isRequired,
      dateTime.text,
      dateTime.header,
      dateTime.id,
      dateTime?.value?.getTime() ?? null
    );
  }

  isAnswered() {
    return this.value.getTime() !== DEFAULT_VALUE.getTime();
  }

  clone() {
    return DateInputState.fromQues(this);
  }

  createSetDanger(isDanger) {
    if (!(isDanger instanceof String || typeof isDanger === 'boolean')) {
      throw new TypeError(
        'In DateInputState.createSetDanger(): Argument not of type Boolean'
      );
    }

    return (oldState) => {
      let newState = oldState.clone();
      newState.isDanger = isDanger;
      return newState;
    };
  }

  createSetValueDate(date) {
    return (oldState) => {
      let newState = oldState.clone();

      if (date instanceof Date) {
        newState.value = new Date(date);
      } else if (date instanceof String || typeof date === 'number') {
        newState.value = new Date(date);
      } else if (date === null) {
        newState.value = DEFAULT_VALUE;
      } else {
        throw new TypeError(
          'In DateInputState.createSetValue(): Argument not of type Date or Number, or null'
        );
      }

      return newState;
    };
  }

  createSetValueManual(year, monthIndex, day, hoursIndex, minutes) {
    return (oldState) => {
      let newState = oldState.clone();

      if (
        !(year instanceof String || typeof year === 'number') ||
        !(monthIndex instanceof String || typeof monthIndex === 'number') ||
        !(day instanceof String || typeof day === 'number') ||
        !(hoursIndex instanceof String || typeof hoursIndex === 'number') ||
        !(minutes instanceof String || typeof minutes === 'number')
      ) {
        throw new TypeError(
          'In DateInputState.createSetValue(): One or more arguments is not a valid type'
        );
      }

      newState.value = new Date(year, monthIndex, day, hoursIndex, minutes);
      return newState;
    };
  }

  toResponse() {
    return new Response(
      this.type,
      this.text,
      this.id,
      this.value?.getDate() ?? null,
      DateInputState.cloneVal
    );
  }

  static cloneVal = (val) => val;
}
