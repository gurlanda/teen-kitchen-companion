import { maybeToMaybe } from './MaybeUtil';

// Returns a clone of a Date
export const cloneDate = (date: Date): Date => {
  return new Date(date.getTime());
};
export const cloneMaybeDate = maybeToMaybe<Date, Date>(cloneDate);

// Converts a (number | undefined) to a (Date | undefined)
export const numberToDate = (date: number): Date => {
  return new Date(date);
};
export const numberToDateMaybe = maybeToMaybe<number, Date>(numberToDate);

export const toDate = (date: number | Date): Date => {
  if (date instanceof Date) {
    return cloneDate(date);
  } else {
    return numberToDate(date);
  }
};
export const toDateMaybe = maybeToMaybe<number | Date, Date>(toDate);

/**
 * For HTML <input type='date' />, the value attribute accepts a date in the format YYYY-MM-DD, where MM is 1-indexed. This function converts a Date object to this string format.
 * @param {Date} date The input Date.
 * @return {string}
 */
export const toDateInputValue = (date: Date): string => {
  const dateString = date.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  const inputValue = dateString.split('T')[0]; // Format: YYYY-MM-DD
  return inputValue;
};

/**
 * For HTML <input type='time' />, the value attribute accepts a time in the format HH:mm:ss, where HH is the hour in 24-hour format, mm is the minute, and ss is the second (specifying only the hour and minute isn't permitted). This function converts a Date object to this string format.
 * @param {Date} date The input Date.
 * @return {string}
 */
export const toTimeInputValue = (date: Date): string => {
  const dateString = date.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  const timePortion = dateString.split('T')[1]; // Format: HH:mm:ss.sssZ
  const inputValue = timePortion.split('.')[0]; // Format: HH:mm:ss
  return inputValue;
};
