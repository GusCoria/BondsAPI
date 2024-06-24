import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',  
  withCredentials: true  
});

// Interceptor para agregar el token JWT a las solicitudes
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default axiosInstance;
