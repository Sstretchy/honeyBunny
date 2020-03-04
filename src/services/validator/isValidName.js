import Constants from '../../consts';
import { isNotEmpty } from './isNotEmpty';
import { isValidLength } from './isValidLength';

/**
 * Validate name
 * @param {string} name name
 * @returns {Object} validationResult
 * @returns {boolean} validationResult.valid
 * @returns {string} [validationResult.message]
 */
export const isValidName = (name) => {
  const notEmpty = isNotEmpty(name);

  const validLength = isValidLength(
    name,
    {
      min: Constants.validation.minNameLength,
      max: Constants.validation.maxNameLength,
    }
  );

  const correctLetters = {
    valid: Constants.validation.nameRegexp.test(name),
    message: !Constants.validation.nameRegexp.test(name) && Constants.messages.invalidLetters,
  };

  const valid = notEmpty.valid && validLength.valid && correctLetters.valid;
  const message = notEmpty.message || validLength.message || correctLetters.message;

  return {
    valid,
    message,
  };
};
