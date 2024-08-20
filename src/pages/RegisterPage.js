import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/auth/register', formData);
            MySwal.fire({
                title: 'Registration Successful!',
                text: 'Please login to continue.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setFormData({ name: '', email: '', password: '' });
                navigate('/login'); // Redirect to login page after successful registration
            });
        } catch (error) {
            console.log(error);
            MySwal.fire({
                title: 'Registration Failed!',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // This line prevents the default form submission behavior
        handleRegister(); // Call the registration function
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Register</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button  variant="primary" type="submit" className="mt-3" block>
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
