import React, { useState } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import AuthForm from './components/AuthForm.js';
import Dashboard from './components/Dashboard.js';
import PostForm from './components/PostForm.js';
import PostList from './components/PostList.js';
import MediaUpload from './components/MediaUpload.js';
import MediaLibrary from './components/MediaLibrary.js';
import Footer from './components/Footer.js';  
import NotFoundPage from './pages/NotFoundPage .js';
import NavigationBar from './components/Navbar.js';
import RegisterPage from './pages/RegisterPage.js';
// import { MAX_UPLOAD_SIZE } from './utils/config.js';
function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <>
         <NavigationBar token={token} setToken={setToken} />
        <Routes>
             
            <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/login" element={<AuthForm mode="login" setToken={setToken} />} />
                    <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
                    <Route path="/create-post" element={token ? <PostForm token={token} /> : <Navigate to="/login" />} />
                    <Route path="/edit-post/:id" element={token ? <PostForm token={token} /> : <Navigate to="/login" />} />
                    <Route path="/posts" element={token ? <PostList token={token} /> : <Navigate to="/login" />} />
                    <Route path="/upload-media" element={token ? <MediaUpload token={token} /> : <Navigate to="/login" />} />
                    <Route path="/media-library" element={<MediaLibrary />} />
                    <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
            <Footer />
        </>
          
    );
}

export default App;
