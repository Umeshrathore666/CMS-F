import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const MediaUpload = ({ token }) => {
    const [file, setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:5001/api/upload-media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setUploadSuccess(true);
            setFile(null);
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }
    };

    return (
        <Container>
            <h2>Upload Media</h2>
            {uploadSuccess && <Alert variant="success">File uploaded successfully!</Alert>}
            <Form onSubmit={handleUpload}>
                <Form.Group controlId="formFile">
                    <Form.Label>Choose File</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        </Container>
    );
};

export default MediaUpload;
