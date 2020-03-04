import Constants from '../../consts';

/**
 * Validate email
 * @param {string} value email
 * @returns {Object} validationResult
 * @returns {boolean} validationResult.valid
 * @returns {string} [validationResult.message]
 */
export const isEmail = (value) => {
  const valid = value.search(Constants.validation.emailRegexp) !== -1;

  return {
    valid,
    message: !valid && Constants.messages.invalidEmail,
  };
};
