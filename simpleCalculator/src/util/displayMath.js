/**
 * Formats a result for the calculator screen.
 * @param {number|string} value - The value returned by calculate.
 * @returns {string} 'Error', or the number with at most 4 decimal places.
 */
export const formatResult = (value) => {
  if (value === 'Error' || !Number.isFinite(value)) return 'Error';
  return String(parseFloat(value.toFixed(4)));
};