import axios from 'axios';
import { getJwt } from '../storage/authStorage';

const apiClient = axios.create({
  baseURL: 'https://api.ev-charge-sunpower.ampereenergy.tech',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    try {
      const token = getJwt();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('===== API AUTH ERROR =====');
      console.log(error);
    }

    return config;
  },
  error => Promise.reject(error),
);

export default apiClient;
