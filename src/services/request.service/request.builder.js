import axios from 'axios';

const requestInstance = axios.create({
  baseURL: 'http://honeybunnycandyshop.herokuapp.com/api/'
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
