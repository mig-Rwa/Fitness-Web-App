import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getWorkouts = async (token: string) => {
  const response = await axios.get(`${API_URL}/workouts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const addWorkout = async (token: string, name: string, description: string) => {
  const response = await axios.post(
    `${API_URL}/workouts`,
    { name, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}; 