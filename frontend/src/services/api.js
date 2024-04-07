// src/services/api.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/groups`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token'); // Make sure this is where you store the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
