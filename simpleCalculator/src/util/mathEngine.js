/**
 * Adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum.
 */
export const add = (a, b) => a + b;

/**
 * Subtracts the second number from the first.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The difference.
 */
export const subtract = (a, b) => a - b;

/**
 * Multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product.
 */
export const multiply = (a, b) => a * b;

/**
 * Divides the first number by the second.
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {number|string} The quotient, or 'Error' when dividing by zero.
 */
export const divide = (a, b) => (b === 0 ? 'Error' : a / b);

/**
 * Raises a number to a power.
 * @param {number} a - The base.
 * @param {number} b - The exponent.
 * @returns {number} a to the power of b.
 */
export const power = (a, b) => a ** b;

/**
 * Calculates the square root of a number.
 * @param {number} a - The number.
 * @returns {number|string} The square root, or 'Error' for a negative number.
 */
export const squareRoot = (a) => (a < 0 ? 'Error' : Math.sqrt(a));

/**
 * Picks the right operation for the operator and returns the result.
 * @param {string|number} a - The first value.
 * @param {string|number} b - The second value.
 * @param {string} operator - One of '+', '-', '*', '/' or '^'.
 * @returns {number|string} The result, or 'Error' if the input is not valid.
 */
export const calculate = (a, b, operator) => {
  const first = parseFloat(a);
  const second = parseFloat(b);

  if (isNaN(first) || isNaN(second)) return 'Error';

  switch (operator) {
    case '+':
      return add(first, second);
    case '-':
      return subtract(first, second);
    case '*':
      return multiply(first, second);
    case '/':
      return divide(first, second);
    case '^':
      return power(first, second);
    default:
      return 'Error';
  }
};