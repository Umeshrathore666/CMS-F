import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, ListGroup } from 'react-bootstrap';

const PostList = ({ token }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5001/api/posts', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setPosts(response.data))
            .catch((error) => console.error('Error:', error.response.data.message));
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(posts.filter((post) => post._id !== id));
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }
    };

    return (
        <Container>
            <h2>Your Posts</h2>
            <ListGroup>
                {posts.map((post) => (
                    <ListGroup.Item key={post._id}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(post._id)}
                            style={{ float: 'right' }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="primary"
                            as={Link}
                            to={`/edit-post/${post._id}`}
                            style={{ float: 'right', marginRight: '10px' }}
                        >
                            Edit
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="success" as={Link} to="/create-post">
                Create New Post
            </Button>
        </Container>
    );
};

export default PostList;
