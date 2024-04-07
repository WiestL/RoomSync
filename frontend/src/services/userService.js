// src/services/userService.js

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`;

// In userService.js
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        if (response.data) {
            return response.data; // Return the user data, handle the rest in the component
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Propagate error to be handled in the component
    }
};



export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  };