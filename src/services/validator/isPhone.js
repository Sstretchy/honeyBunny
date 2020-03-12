import Constants from '../../consts';

export const isPhone = (value) => {
  const valid = value.search(Constants.validation.phoneRegexp) !== -1;

  return {
    valid,
    message: !valid && Constants.messages.invalidPhone,
  };
};
