//import axios from './api'; // Ensure this path points to where your axios instance is configured
import axiosApiInstance from '../api/axios';
// Since axios instance is already configured with baseURL, we don't prepend API_URL to paths

// Function to check if the user is in a group
export const checkGroupMembership = async (userId) => {
  try {
    const response = await axiosApiInstance.get(`/groups/check-membership/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking group membership:', error);
    throw error;
  }
};

export const createGroup = async(groupName) =>
{
  try {
    const response = await axiosApiInstance.post(`/groups`, { groupName });
    return response.data;  // This should include { id, invitationCode }
  } catch (error) {
      console.error('Error creating group:', error);
      throw error;  // Optionally, handle this more gracefully
  }
}
// Function to join a group using an invitation code
export const joinGroupWithCode = async (invitationCode) => {
  try {
    const response = await axiosApiInstance.post(`/groups/join`, { invitationCode });
    return response.data;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};

// Function to get the statuses of group members
export const getGroupStatuses = async (groupId) => {
  try {
    const response = await axiosApiInstance.get(`/groups/${groupId}/statuses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group statuses:', error);
    throw error;
  }
};

// Function to get the grocery list of the group
export const getGroupGroceryList = async (groupId) => {
  try {
    const response = await axiosApiInstance.get(`/groups/${groupId}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group grocery list:', error);
    throw error;
  }
};
