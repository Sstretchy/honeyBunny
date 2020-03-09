import { sendRequest } from '../../request.builder';

const prefix = 'http://honeybunnycandyshop.herokuapp.com/api/auth/';

export const auth = {
  signIn: (data) => {
    const options = {
      url: `${prefix}sign-in`,
      method: 'POST',
      data,
    };

    return sendRequest(options);
  },
  signUp: (data) => {
    const options = {
      url: `${prefix}sign-up`,
      method: 'POST',
      data,
    };

    return sendRequest(options);
  },
};
