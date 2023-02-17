// Return a shallow copy of a given array where the indicated element
// is moved up by one position
// If the index is zero or invalid, then the array is
// returned unchanged
export const moveElemUp = (arr, index) => {
  if (index <= 0 || index >= arr.length) {
    return arr;
  }

  const newHead = arr.slice(0, index - 1);
  const newTail = arr.slice(index + 1);

  return [...newHead, arr[index], arr[index - 1], ...newTail];
};

// Return a shallow copy of a given array where the indicated element
// is moved down by one position
// If the index is invalid or if the indicated element is already last, then the array is
// returned unchanged
export const moveElemDown = (arr, index) => {
  if (index < 0 || index >= arr.length - 1) {
    return arr;
  }

  const newHead = arr.slice(0, index);
  const newTail = arr.slice(index + 2);

  return [...newHead, arr[index + 1], arr[index], ...newTail];
};
