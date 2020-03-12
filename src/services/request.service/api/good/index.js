import { sendRequest } from '../../request.builder';

const prefix = 'https://honeybunnycandyshop.herokuapp.com/api/good/';

export const good = {
  getGoodByCategory: (category) => {
    const options = {
      url: `${prefix}category/${category}`,
      method: 'GET',
    };

    return sendRequest(options);
  },

  getGood: (id) => {
    const options = {
      url: `${prefix}${id}`,
      method: 'GET',
    };

    return sendRequest(options);
  },
};
