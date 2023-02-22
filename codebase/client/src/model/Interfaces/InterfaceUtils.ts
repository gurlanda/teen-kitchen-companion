import Clonable from './Clonable';
import Identifiable from './Identifiable';
import Selectable from './Selectable';
import Comparable from './Comparable';
import Reducer from './Reducer';

const isInBounds = (arr: Array<any>, index: number): boolean => {
  if (0 <= index && index < arr.length) {
    return true;
  } else {
    return false;
  }
};

// ------------------ Comparable Arrays ------------------
export const isEqual = (
  arr1: Comparable[] | undefined,
  arr2: Comparable[] | undefined
): boolean => {
  let result: boolean;
  if (arr1 === undefined && arr2 === undefined) {
    result = true;
  } else if (arr1?.length !== arr2?.length) {
    // Case 1: One side is defined and the other is not.
    // Case 2: Both sides are defined but the array lengths are different
    result = false;
  } else {
    // This branch occurs when both arrays are defined and have the same length
    for (let i = 0; i < arr2!.length; i++) {
      const opt1 = arr1![i];
      const opt2 = arr2![i];

      if (!opt1.isEqualTo(opt2)) {
        result = false;
        break;
      }
    }

    result = true;
  }

  return result;
};

// ------------------ Clonable Arrays ------------------

// Returns a copy of the given array where the element at the targeted index is deleted
// If index not in bounds (i.e. index < 0 or index >= arr.length) then an unmodified copy is returned
export const deleteElement = <T>(
  arr: Clonable<T>[],
  index: number
): Array<T> => {
  if (!isInBounds(arr, index)) {
    return arr.map((elem) => elem.clone());
  }

  return arr.filter((elem, i) => i !== index).map((elem) => elem.clone());
};

// Return a clone of a given array where the indicated element is moved up by one position
// If the index is zero or invalid, then the array is cloned unchanged
export const moveElemUp = <T>(arr: Clonable<T>[], index: number) => {
  if (index <= 0 || index >= arr.length) {
    return arr.map((elem) => elem.clone());
  }

  const newHead = arr.slice(0, index - 1);
  const newTail = arr.slice(index + 1);

  const newArray = [...newHead, arr[index], arr[index - 1], ...newTail];
  return newArray.map((elem) => elem.clone());
};

// Return a clone of a given array where the indicated element is moved down by one position
// If the index is invalid or if the indicated element is already last, then the array is returned unchanged
export const moveElemDown = <T>(arr: Clonable<T>[], index: number) => {
  if (index < 0 || index >= arr.length - 1) {
    return arr.map((elem) => elem.clone());
  }

  const newHead = arr.slice(0, index);
  const newTail = arr.slice(index + 2);

  const newArray = [...newHead, arr[index + 1], arr[index], ...newTail];
  return newArray.map((elem) => elem.clone());
};

// ------------------ Identifiable Arrays ------------------

// Gets the index of the element with the given ID. If there is no element with that ID, returns null.
export const getIndex = (
  arr: Identifiable[],
  targetId: string
): number | null => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) {
      return i;
    }
  }

  return null;
};

// ------------------ Selectable Arrays ------------------
export const filterSelected = (arr: Selectable[]): Selectable[] => {
  return arr.filter((elem) => elem.isSelected);
};

export const filterSelectedMaybe = (
  arr: Selectable[] | undefined
): Selectable[] | undefined => {
  if (arr === undefined) {
    return undefined;
  }

  return arr?.filter((elem) => elem.isSelected);
};

// Sets all elements as unselected except the element at the given index.
// Modifies the given array in-place.
export const selectOnlyAtIndex = (
  arr: Selectable[],
  selectedIndex: number
): void => {
  if (selectedIndex < 0 || arr.length < selectedIndex) {
    return;
  }

  arr.forEach((elem, index) => {
    if (index === selectedIndex) {
      elem.isSelected = true;
    } else {
      elem.isSelected = false;
    }
  });
};

// ------------------ Selectable & Clonable Arrays ------------------
type ClonableSelectable<T> = Selectable & Clonable<T>;

// Sets all elements as unselected except the element at the given index.
// Returns a modified clone of the given array.
export const cloneSelectOnlyAtIndex = <T>(
  arr: ClonableSelectable<T>[],
  selectedIndex: number
) => {
  // If out of range, just return a clone
  if (selectedIndex < 0 || arr.length < selectedIndex) {
    return arr.map((elem) => elem.clone());
  }

  return arr.map((elem, index) => {
    let clone = elem.clone() as unknown as ClonableSelectable<T>;
    if (index === selectedIndex) {
      clone.isSelected = true;
    } else {
      clone.isSelected = false;
    }

    return clone;
  });
};

// ------------------ Selectable & Identifiable Arrays ------------------
// For each element in opts, this function sets element.isSelected to true if the element is also an element of targets
// This function necessarily modifies opts. If you don't want the original array to be modified, make a deep copy before giving it to this function.
type UniqueSelectable = Selectable & Identifiable;
export const multiSelect = (
  opts: UniqueSelectable[],
  targets: Identifiable[]
) => {
  const targetIds = targets.map((tar) => tar.id);
  for (const opt of opts) {
    if (targetIds.includes(opt.id)) {
      opt.isSelected = true;
    }
  }
};

// This function is identical to multiSelect except it accepts Maybe values
// For each element in opts, this function sets element.isSelected to true if the element is also an element of targets
// This function necessarily modifies opts. If you don't want the original array to be modified, make a deep copy before giving it to this function.
export const multiSelectMaybe = (
  opts: UniqueSelectable[] | undefined,
  targets: Identifiable[] | undefined
) => {
  if (opts === undefined || targets || undefined) {
    return;
  }

  const targetIds = targets!.map((tar) => tar.id);
  opts!.forEach((opt) => {
    if (targetIds.includes(opt.id)) {
      opt.isSelected = true;
    }
  });
};

// ------------------ Clonable & Identifiable Arrays ------------------
type UniqueClonable<T extends Identifiable & Clonable<T>> = Identifiable &
  Clonable<T>;
export const deleteElementIC = <T extends Identifiable & Clonable<T>>(
  arr: UniqueClonable<T>[],
  targetId: string
) => {
  return arr.filter((elem) => elem.id !== targetId).map((elem) => elem.clone());
};

/**
 * This function takes in an array of objects that implement both Identifiable and Cloneable, as well as a reducer, and the id of the reducer's target within the array. It then performs the following map on the array. For each element of the array:
 * - If the element has the targetId, apply the reducer to it.
 * - Otherwise, just clone the element.
 * This function then returns the resulting array of mapped values.
 *
 * @param items The array to transform
 * @param targetId The ID of the element to transform
 * @param reducer Used to transform the target element
 * @returns A transformed deep copy of the given array.
 */
export const cloneTransformArray = <
  ThisType extends Identifiable & Clonable<ThisType>
>(
  items: ThisType[],
  targetId: string,
  reducer: Reducer<ThisType>
): typeof items => {
  let transformed: ThisType[] = [];
  for (const item of items) {
    if (targetId === item.id) {
      transformed.push(reducer(item));
    } else {
      transformed.push(item.clone());
    }
  }

  return transformed;
};

// Return a clone of a given array where the indicated element is moved up by one position
// If the index is zero or invalid, then the array is cloned unchanged
export const moveElemUpIC = <T extends UniqueClonable<T>>(
  arr: UniqueClonable<T>[],
  targetId: string
) => {
  const index = getIndex(arr, targetId);
  if (!index) {
    return arr.map((elem) => elem.clone());
  }

  const newHead = arr.slice(0, index - 1);
  const newTail = arr.slice(index + 1);

  const newArray = [...newHead, arr[index], arr[index - 1], ...newTail];
  return newArray.map((elem) => elem.clone());
};

// Return a clone of a given array where the indicated element is moved down by one position
// If the index is invalid or if the indicated element is already last, then the array is returned unchanged
export const moveElemDownIC = <T extends UniqueClonable<T>>(
  arr: UniqueClonable<T>[],
  targetId: string
) => {
  const index = getIndex(arr, targetId);
  if (!index) {
    return arr.map((elem) => elem.clone());
  }

  const newHead = arr.slice(0, index);
  const newTail = arr.slice(index + 2);

  const newArray = [...newHead, arr[index + 1], arr[index], ...newTail];
  return newArray.map((elem) => elem.clone());
};
