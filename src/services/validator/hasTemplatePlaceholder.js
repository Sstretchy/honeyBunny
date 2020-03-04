import Constants from '../../consts';

/**
 * Checks string for placeholder
 * @param {string} value input string
 * @returns {Object} validationResult
 * @returns {boolean} validationResult.valid
 * @returns {string} [validationResult.message]
 */
export const hasTemplatePlaceholder = (value) => {
  const valid = value.search(Constants.validation.templatePlaceholderRegexp) !== -1;

  return {
    valid,
    message: !valid && Constants.messages.templatePlaceholderWarning,
  };
};
