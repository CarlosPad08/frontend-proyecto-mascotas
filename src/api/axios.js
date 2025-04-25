import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-proyecto-mascotas.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;