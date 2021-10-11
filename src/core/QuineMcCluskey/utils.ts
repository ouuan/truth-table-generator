import Minterm from './Minterm';

/**
 * Converts a value from decimal to binary
 *
 * @param value The value to convert to binary
 */
export function decToBin(value: number) {
  return (value >>> 0).toString(2);
}

/**
 * Returns whether or not a value is in an array
 *
 * @param value The value to look for in an array
 * @param array The array to look for a value in
 */
export function valueIn(value: number | Minterm, array: (number|Minterm)[]) {
  return Boolean(array.find((item) => {
    if (value instanceof Minterm && item instanceof Minterm) {
      return value.equals(item);
    }
    return item === value;
  }));
}
