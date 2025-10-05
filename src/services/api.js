import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecosnap_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Cannot connect to backend server at http://localhost:5000');
      console.error('Make sure the backend server is running with: cd server && npm run dev');
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('ecosnap_token');
      localStorage.removeItem('ecosnap_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getProfile: () => API.get('/auth/me'),
  updateProfile: (userData) => API.put('/auth/profile', userData),
};

// Reports API calls
export const reportsAPI = {
  // Get all reports (admin) or user's reports
  getReports: (params = {}) => API.get('/reports', { params }),
  
  // Get single report
  getReport: (id) => API.get(`/reports/${id}`),
  
  // Create new report with image
  createReport: (formData) => API.post('/reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // Update report status (admin only)
  updateReportStatus: (id, statusData) => API.patch(`/reports/${id}`, statusData),
  
  // Delete report (admin only)
  deleteReport: (id) => API.delete(`/reports/${id}`),
  
  // Get nearby reports for map
  getNearbyReports: (lat, lng, radius = 5000) => 
    API.get('/reports/nearby', { params: { lat, lng, radius } }),
  
  // Get report statistics
  getReportStats: () => API.get('/reports/stats'),
};

// Utility functions
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return `http://localhost:5000/uploads/${imagePath}`;
};

export const handleApiError = (error) => {
  if (error.code === 'ERR_NETWORK') {
    return 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000';
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export default API;
