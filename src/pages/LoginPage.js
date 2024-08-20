import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    console.log(formData.email);
    console.log(formData.password);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        console.log("in handelSubmit");
        
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token } = response.data;
            
            // Set token in headers
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            MySwal.fire({
                title: 'Success!',
                text: 'Login successful!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/dashboard'); // Redirect to dashboard on successful login
            });
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text: error.response ? error.response.data.message : 'Network error',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={4}>
                    <h1 className="text-center mb-4">Login</h1>
                    <Form>
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
                        <button variant="primary" type="submit" onClick={()=>handleSubmit()} className="mt-3" block>
                            Login
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
