import { sendRequest } from '../../request.builder';

const prefix = 'http://127.0.0.1:5000/api/good/';

export const good = {
  getGoodByCategory: (category) => {
    const options = {
      url: `${prefix}${category}`,
      method: 'GET',
    };

    return sendRequest(options);
  },
};
