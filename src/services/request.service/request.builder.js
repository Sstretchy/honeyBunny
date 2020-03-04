import axios from 'axios';

const requestInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/'
});

export const sendRequest = async options => {
  const response = await requestInstance.request(options);

  return response.data;
};

export const addJWT = token => {
  requestInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('jwt', token);
};
