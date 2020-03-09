import { sendRequest } from '../../request.builder';

const prefix = 'http://honeybunnycandyshop.herokuapp.com/api/good/';

export const good = {
  getGoodByCategory: (category) => {
    const options = {
      url: `${prefix}${category}`,
      method: 'GET',
    };

    return sendRequest(options);
  },
};
