import React, { useEffect, useState } from 'react';
import { getPosts, updatePost, deletePost } from '../api/postApi.js'; // Assuming deletePost API is available
import { getMediaLibrary, deleteMedia } from '../api/mediaApi.js'; // Assuming deleteMedia API is available
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DashboardPage = () => {
    const [posts, setPosts] = useState([]);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        // Fetch posts and media library when component mounts
        const fetchData = async () => {
            try {
                const postsData = await getPosts();
                const mediaData = await getMediaLibrary();
                setPosts(postsData);
                setMedia(mediaData);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    const handleEditPost = (postId) => {
        const postToEdit = posts.find(post => post._id === postId);

        MySwal.fire({
            title: 'Edit Post',
            input: 'text',
            inputLabel: 'Post Title',
            inputValue: postToEdit.title,
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            preConfirm: (newTitle) => {
                return updatePost(postId, { title: newTitle })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        MySwal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    });
            },
            allowOutsideClick: () => !MySwal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedPosts = posts.map(post =>
                    post._id === postId ? { ...post, title: result.value.title } : post
                );
                setPosts(updatedPosts);

                MySwal.fire(
                    'Saved!',
                    'Your post has been updated.',
                    'success'
                );
            }
        });
    };

    const handleDeleteMedia = (mediaId) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with the delete action
                deleteMedia(mediaId)
                    .then(() => {
                        const updatedMedia = media.filter(item => item._id !== mediaId);
                        setMedia(updatedMedia);

                        MySwal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        MySwal.fire(
                            'Error!',
                            `Failed to delete the file: ${error.message}`,
                            'error'
                        );
                    });
            }
        });
    };

    const handleDeletePost = (postId) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "This post will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePost(postId)
                    .then(() => {
                        const updatedPosts = posts.filter(post => post._id !== postId);
                        setPosts(updatedPosts);

                        MySwal.fire(
                            'Deleted!',
                            'Your post has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        MySwal.fire(
                            'Error!',
                            `Failed to delete the post: ${error.message}`,
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <Container>
            <h1>Dashboard</h1>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Posts</Card.Title>
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <Card key={post._id} className="mb-3">
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <Card.Text>{post.content}</Card.Text>
                                            <Button 
                                                variant="primary" 
                                                onClick={() => handleEditPost(post._id)}>
                                                Edit
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                onClick={() => handleDeletePost(post._id)}>
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No posts available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Media Library</Card.Title>
                            {media.length > 0 ? (
                                media.map(item => (
                                    <Card key={item._id} className="mb-3">
                                        <Card.Body>
                                            <Card.Title>{item.filename}</Card.Title>
                                            <Button 
                                                variant="danger" 
                                                onClick={() => handleDeleteMedia(item._id)}>
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No media available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;
