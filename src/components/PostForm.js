import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const PostForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate(); // corrected variable name

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setIsPublished(response.data.isPublished);
          setScheduledDate(response.data.scheduledDate || '');
        })
        .catch((error) => {
          console.error('Error:', error.response.data.message);
        });
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, content, isPublished, scheduledDate };

    try {
      if (id) {
        await axios.put(`http://localhost:5001/api/posts/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5001/api/create-post', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/posts'); // corrected variable name
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  return (
    <Container>
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
          />
        </Form.Group>
        <Form.Group controlId="formPublished">
          <Form.Check
            type="checkbox"
            label="Publish Now"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
          />
        </Form.Group>
        <Form.Group controlId="formScheduledDate">
          <Form.Label>Scheduled Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Update Post' : 'Create Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;