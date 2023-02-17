// For use for if a data object doesn't have the right members present (e.g. if data.text was expected but doesn't exist)
export default class DataError extends Error {
  constructor(...params) {
    super(...params);

    this.name = 'DataError';
  }
}
