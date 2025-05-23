// src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api', // 🔁 Change this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token from localStorage automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
