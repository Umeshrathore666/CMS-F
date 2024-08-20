// Frontend/src/utils/config.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const APP_NAME = process.env.REACT_APP_APP_NAME;
const FEATURE_FLAG = process.env.REACT_APP_FEATURE_FLAG === 'true'; // Convert to boolean
const MAX_UPLOAD_SIZE = process.env.REACT_APP_MAX_UPLOAD_SIZE;
const ENV = process.env.REACT_APP_ENV;

export {
    API_BASE_URL,
    GOOGLE_CLIENT_ID,
    APP_NAME,
    FEATURE_FLAG,
    MAX_UPLOAD_SIZE,
    ENV
};
