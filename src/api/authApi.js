// Frontend/api/authApi.js

import axios from 'axios';
import Swal from 'sweetalert2';

// Base URL for API
const API_URL = 'http://localhost:5001/api/auth';

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    Swal.fire({
      title: 'Success!',
      text: 'User registered successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.response ? error.response.data.message : 'Network error',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    throw new Error(error.response ? error.response.data.message : 'Network error');
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    Swal.fire({
      title: 'Success!',
      text: 'Logged in successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.response ? error.response.data.message : 'Network error',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    throw new Error(error.response ? error.response.data.message : 'Network error');
  }
};

// Set the token in headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};