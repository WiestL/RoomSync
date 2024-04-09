// src/services/userService.js

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${process.env.REACT_APP_API_URL}`;

// In userService.js
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        console.log("API Response:", response.data);
        const { token } = response.data;
        if (token) {
            const decoded = jwtDecode(token);
            console.log("Decoded JWT:", decoded);
            return {
                user: {
                    id: decoded.id,  // Assuming 'id' is part of the encoded token
                    email: decoded.email // Similarly, decode other needed properties
                },
                token
            };
        } else {
            throw new Error('No token received');
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
  
export const getUserProfileById = async (userId) => {
    try {
      const response = await axios.get(`/api/users/profile/${userId}`);
      return response.data; // This should contain the user profile data
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error; // You may want to handle this error in your component
    }
  };

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  };