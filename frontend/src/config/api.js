const API_URL = process.env.REACT_APP_API_URL || "https://fitness-web-app-w4ry.onrender.com";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { ...defaultHeaders, "Authorization": `Bearer ${token}` } : defaultHeaders;
};

export const api = {
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(credentials)
      });
      return response.json();
    },
    signup: async (userData) => {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(userData)
      });
      return response.json();
    }
  },
  workouts: {
    getAll: async (userId) => {
      const response = await fetch(`${API_URL}/api/workouts?user_id=${userId}`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },
    create: async (workoutData) => {
      const response = await fetch(`${API_URL}/api/workouts`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(workoutData)
      });
      return response.json();
    },
    delete: async (id) => {
      const response = await fetch(`${API_URL}/api/workouts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      return response.json();
    }
  },
  progress: {
    getAll: async (userId) => {
      const response = await fetch(`${API_URL}/api/progress?user_id=${userId}`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },
    create: async (progressData) => {
      const response = await fetch(`${API_URL}/api/progress`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(progressData)
      });
      return response.json();
    },
    delete: async (id) => {
      const response = await fetch(`${API_URL}/api/progress/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      return response.json();
    }
  }
}; 