import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-proyecto-mascotas.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // Esto es crucial para que las cookies se envíen automáticamente
  withCredentials: true
});

export default axiosInstance;