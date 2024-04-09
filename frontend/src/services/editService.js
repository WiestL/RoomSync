import axiosApiInstance from '../api/axios'

// Function to add a new grocery item
export const addGroceryItem = async (groupId, itemName, quantity) => {
  try {
    const response = await axiosApiInstance.post(`/groups/${groupId}/items`, { itemName, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding grocery item:', error);
    throw error;
  }
};

// Function to post a new status update
export const postStatusUpdate = async (statusText, wantVisitors) => {
  try {
    const response = await axiosApiInstance.post(`/status`, { statusText, wantVisitors });
    return response.data;
  } catch (error) {
    console.error('Error posting status update:', error);
    throw error;
  }
};

// Function to delete a grocery item
export const deleteGroceryItem = async (groupId, itemId) => {
  try {
    const response = await axiosApiInstance.delete(`/groups/${groupId}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting grocery item:', error);
    throw error;
  }
};

export default {
  addGroceryItem,
  postStatusUpdate,
  deleteGroceryItem
};
