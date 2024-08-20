// Frontend/api/postApi.js

import axios from 'axios';

// Base URL for API
const API_URL = '/api/posts';

// Create a new post
export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, postData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};

// Get all posts
export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};

// Get a single post by ID
export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};

// Update a post by ID
export const updatePost = async (postId, postData) => {
    try {
        const response = await axios.put(`${API_URL}/${postId}`, postData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};

// Delete a post by ID
export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};
