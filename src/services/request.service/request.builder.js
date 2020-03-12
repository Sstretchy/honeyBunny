import axios from 'axios';

const requestInstance = axios.create({
  baseURL: 'https://honeybunnycandyshop.herokuapp.com/api/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export const sendRequest = async options => {
  const response = await requestInstance.request(options);

  return response.data;
};

export const addJWT = token => {
  requestInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (token) {
    localStorage.setItem('jwt', token);
  }
};
