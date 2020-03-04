import { sendRequest } from '../../request.builder';

const prefix = 'http://127.0.0.1:5000/api/busket/';

export const basket = {
  getBasket: (userId) => {
    const options = {
      url: `${prefix}${userId}`,
      method: 'GET',
    };

    return sendRequest(options);
  },
  postBasket: (data) => {
    const options = {
      url: `${prefix}`,
      method: 'POST',
      data,
    };

    return sendRequest(options);
  },
};
