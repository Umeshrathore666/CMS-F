// Frontend/api/mediaApi.js

import axios from 'axios';

// Base URL for API
const API_URL = '/api/media';

// Upload media file
export const uploadMedia = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};

// Get media library
export const getMediaLibrary = async () => {
    try {
        const response = await axios.get(`${API_URL}/library`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};

// Delete media file
export const deleteMedia = async (mediaId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${mediaId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Network error');
    }
};
