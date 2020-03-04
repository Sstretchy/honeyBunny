import Constants from '../../consts';
import { isNotEmpty } from './isNotEmpty';
import { isValidLength } from './isValidLength';

/**
 * Validate password
 * @param {string} password password
 * @returns {Object} validationResult
 * @returns {boolean} validationResult.valid
 * @returns {string} [validationResult.message]
 */
export const isValidPassword = (password) => {
  const notEmpty = isNotEmpty(password);

  const validLength = isValidLength(
    password,
    {
      min: Constants.validation.minPasswordLength,
      max: Constants.validation.maxPasswordLength,
    }
  );

  const correctLetters = {
    valid: Constants.validation.passwordRegexp.test(password),
    message: !Constants.validation.passwordRegexp.test(password) && Constants.messages.invalidLetters,
  };

  const valid = notEmpty.valid && validLength.valid && correctLetters.valid;
  const message = notEmpty.message || validLength.message || correctLetters.message;

  return {
    valid,
    message,
  };
};
