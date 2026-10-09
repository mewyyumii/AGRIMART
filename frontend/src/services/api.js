import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getMe: (token) =>
    api.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const productsAPI = {
  getAll: () => api.get('/api/products'),
  getFarmerProducts: (token) =>
    api.get('/api/products/farmer', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  createProduct: (productData, token) =>
    api.post('/api/products', productData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default api;
