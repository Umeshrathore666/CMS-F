import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, ListGroup } from 'react-bootstrap';

const MediaLibrary = ({ token }) => {
    const [mediaFiles, setMediaFiles] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5001/api/media-library', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setMediaFiles(response.data))
            .catch((error) => console.error('Error:', error.response.data.message));
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/media-library/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMediaFiles(mediaFiles.filter((file) => file._id !== id));
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }
    };

    return (
        <Container>
            <h2>Media Library</h2>
            <ListGroup>
                {mediaFiles.map((file) => (
                    <ListGroup.Item key={file._id}>
                        <a href={`http://localhost:5001/api/media-library/${file._id}`} target="_blank" rel="noopener noreferrer">
                            {file.filename}
                        </a>
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(file._id)}
                            style={{ float: 'right' }}
                        >
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default MediaLibrary;
