import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://YOUR_API_URL',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
