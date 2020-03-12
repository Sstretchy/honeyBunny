import { sendRequest } from '../../request.builder';

const prefix = 'https://honeybunnycandyshop.herokuapp.com/api/order/';

export const order = {
    postOrder: (data) => {
        const options = {
            url: `${prefix}`,
            method: 'POST',
            data,
        };

        return sendRequest(options);
    },
};
