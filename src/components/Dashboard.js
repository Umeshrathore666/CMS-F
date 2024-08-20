import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Dashboard = ({ token }) => {
    if (!token) {
        return <p>You must be logged in to view this page.</p>;
    }
    return (
        <Container className="text-center">
            <h1>Dashboard</h1>
            <p>Manage your posts, media, and more.</p>
            <Button variant="primary" as={Link} to="/create-post">
                Create Post
            </Button>{' '}
            <Button variant="secondary" as={Link} to="/posts">
                Manage Posts
            </Button>{' '}
            <Button variant="info" as={Link} to="/upload-media">
                Upload Media
            </Button>{' '}
            <Button variant="warning" as={Link} to="/media-library">
                Media Library
            </Button>
        </Container>
    );
};

export default Dashboard;
