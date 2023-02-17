/**
 * Creates a random hexadecimal string of a given length.
 *
 * Why the default of idLength = 12?
 * Number of seconds in a century is on the order of 10^9.
 * Number of possibilities of a hex string of length 12 is on the
 * order of 10^12. We then shouldn't expect IDs to collide in most
 * contexts unless create IDs much more frequently than one creation
 * per second.
 */
const createId = (idLength = 12) => {
  let id = '';
  for (let i = 0; i < idLength; i++) {
    const digit = Math.floor(Math.random() * 16);
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

module.exports = createId;
