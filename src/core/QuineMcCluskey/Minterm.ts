/**
 * A class to hold information about a minterm when using the Quine-McCluskey Algorithm
 */
export default class Minterm {
  values: number[];

  value: string;

  used: boolean;

  /**
   * Creates a new minterm object
   */
  constructor(values: number[], value: string) {
    this.values = values;
    this.value = value;
    this.used = false;

    this.values.sort();
  }

  /**
   * Returns a String representation of the Minterm
   */
  toString() {
    const values = this.values.join(', ');
    return `m(${values}) = ${this.value}`;
  }

  /**
   * Determines if this Minterm object is equal to another object
   */
  equals(minterm: Minterm) {
    if (!(minterm instanceof Minterm)) {
      return false;
    }

    return (
      this.value === minterm.value
      && this.values.length === minterm.values.length
      && this.values.every((u, i) => u === minterm.values[i])
    );
  }

  /**
   * Returns the values in this Minterm
   */
  getValues() {
    return this.values;
  }

  /**
   * Returns the binary value of this Minterm
   */
  getValue() {
    return this.value;
  }

  /**
   * Returns whether or not this Minterm has been used
   */
  isUsed() {
    return this.used;
  }

  /**
   * Labels this Minterm as "used"
   */
  use() {
    this.used = true;
  }

  /**
   * Combines 2 Minterms together if they can be combined
   */
  combine(minterm: Minterm) {
    // Check if this value is this same; If so, do nothing
    if (this.value === minterm.value) {
      return null;
    }

    // Check if the values are the same; If so, do nothing
    if (
      this.values.length === minterm.values.length
      && this.values.every((u, i) => u === minterm.values[i])
    ) {
      return null;
    }

    // Keep track of the difference between the minterms
    let diff = 0;
    let result = '';

    // Iterate through the bits in this Minterm's value
    for (let i = 0; i < this.value.length; i += 1) {
      // Check if the current bit value differs from the minterm's bit value
      if (this.value.charAt(i) !== minterm.value.charAt(i)) {
        diff += 1;
        result += '-';
      } else {
        // There is no difference
        result += this.value.charAt(i);
      }

      // The difference has exceeded 1
      if (diff > 1) {
        return null;
      }
    }

    return new Minterm(this.values.concat(minterm.values), result);
  }
}
