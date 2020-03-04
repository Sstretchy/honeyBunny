import Constants from '../../consts';

/**
 * Check empty string or not
 * @param {string} value
 * @returns {Object} validationResult
 * @returns {boolean} validationResult.valid
 * @returns {string} [validationResult.message]
 */
export const isNotEmpty = (value) => {
  const valid = value.trim().length > 0;

  return {
    valid,
    message: !valid && Constants.messages.emptyValueError,
  };
};
