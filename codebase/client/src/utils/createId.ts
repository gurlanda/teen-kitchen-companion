/**
 * Creates a random hexadecimal string of a given length.
 *
 * Why the default of idLength = 12?
 * Number of seconds in a century is on the order of 10^9.
 * Number of possibilities of a hex string of length 12 is on the
 * order of 10^12. We then shouldn't expect IDs to collide in most
 * contexts unless we create IDs much more frequently than one creation
 * per second.
 */
const OBJECT_ID_LENGTH = 24; // To match the length of an object ID in Mongoose
const createId = (OBJECT_ID_LENGTH: number = 12): string => {
  let id: string = '';
  for (let i: number = 0; i < OBJECT_ID_LENGTH; i++) {
    const digit: number = Math.floor(Math.random() * 16);
    if (digit > 9) {
      switch (digit) {
        case 10:
          id += 'a';
          break;
        case 11:
          id += 'b';
          break;
        case 12:
          id += 'c';
          break;
        case 13:
          id += 'd';
          break;
        case 14:
          id += 'e';
          break;
        case 15:
        default:
          id += 'f';
      }
    } else {
      id += digit;
    }
  }

  return id;
};

export default createId;
