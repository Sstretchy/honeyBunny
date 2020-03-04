import Constants from '../../consts';

/**
 * Validate length
 * @param {string} value
 * @param {Object} options
 * @param {number} options.min
 * @param {number} options.max
 * @returns {Object} validationResult
 * @returns {boolean} validationResult.valid
 * @returns {string} [validationResult.message]
 */
export const isValidLength = (value, options) => {
  const valid = value.length >= options.min && value.length <= options.max;

  return {
    valid,
    message: !valid && Constants.messages.invalidLength(options),
  };
};
