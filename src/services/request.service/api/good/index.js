import { sendRequest } from '../../request.builder';

const prefix = 'https://honeybunnycandyshop.herokuapp.com/api/good/';

export const good = {
  getGoodByCategory: (category) => {
    const options = {
      url: `${prefix}${category}`,
      method: 'GET',
    };

    return sendRequest(options);
  },
};
