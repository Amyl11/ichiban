const API_BASE_URL = 'http://localhost:8080/api';
const USER_ID = 1; // You can replace this with actual logged-in user ID

export const addToFavorite = async (eventId) => {
  try {
   
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/favorites/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Added to favorite:', data);
    return data;
  } catch (error) {
    console.error('Error adding to favorite:', error);
    throw error;
  }
};

export const removeFromFavorite = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/favorites/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Removed from favorite:', data);
    return data;
  } catch (error) {
    console.error('Error removing from favorite:', error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/favorites`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Get favorites:', data);
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const checkIfFavorited = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/favorites/${eventId}/check`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.isFavorited;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};
