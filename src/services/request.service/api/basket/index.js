import { sendRequest } from '../../request.builder';

const prefix = 'http://honeybunnycandyshop.herokuapp.com/api/busket/';

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

  clearBasket: () => {
    const options = {
      url: `${prefix}`,
      method: 'DELETE',
    };

    return sendRequest(options);
  },

  putBasket: (itemId, data) => {
    const options = {
      url: `${prefix}${itemId}`,
      method: 'PUT',
      data,
    };

    return sendRequest(options);
  },

  deleteFromBasket: (itemId) => {
    const options = {
      url: `${prefix}${itemId}`,
      method: 'DELETE',
      data: { item_id: itemId }
    };

    return sendRequest(options);
  },
}
