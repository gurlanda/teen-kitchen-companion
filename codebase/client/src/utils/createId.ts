/*
  Creates a random hexadecimal string of a given length.

  Why the default of idLength = 6?

  Number of seconds in a century is on the order of 10^9. 
  Number of possible strings of length 6 containing characters from the default set is on the order of 10^10. 
  We then shouldn't expect IDs to collide in most contexts unless we create IDs much more frequently than one creation per second.
 */

function createId(
  idLength: number = DEFAULT_LENGTH,
  characterSet: string = DEFAULT_CHARACTER_SET
): string {
  let id: string = '';
  for (let i: number = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    id += characterSet[randomIndex];
  }

  return id;
}

// const OBJECT_ID_LENGTH = 24; // To match the length of an object ID in Mongoose
const DEFAULT_LENGTH = 6;
const DEFAULT_CHARACTER_SET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default createId;
