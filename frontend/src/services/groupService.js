import axios from './api';

const API_URL = `${process.env.REACT_APP_API_URL}/groups`;

// Function to check if the user is in a group
export const checkGroupMembership = async (userId) => {
    try {
      const response = await axios.get(`/check-membership/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking group membership:', error);
      throw error;
    }
  };
  

// Function to join a group using an invitation code
export const joinGroupWithCode = async (invitationCode) => {
  try {
    const response = await axios.post(`${API_URL}/join`, { invitationCode });
    return response.data; // Expected to return some success message or new group details
  } catch (error) {
    console.error('Error joining group:', error);
    throw error; // Rethrow the error for handling by the caller
  }
};

// Function to get the statuses of group members
export const getGroupStatuses = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/${groupId}/statuses`);
    return response.data; // Expected to return a list of statuses
  } catch (error) {
    console.error('Error fetching group statuses:', error);
    throw error; // Rethrow the error for handling by the caller
  }
};

// Function to get the grocery list of the group
export const getGroupGroceryList = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/${groupId}/groceries`);
    return response.data; // Expected to return a list of grocery items
  } catch (error) {
    console.error('Error fetching group grocery list:', error);
    throw error; // Rethrow the error for handling by the caller
  }
};
