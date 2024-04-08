// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        // Retrieve token from local storage
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (token) {
            // Attach the token as a Bearer token in the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle errors with the request config
        return Promise.reject(error);
    }
);

export default instance;
