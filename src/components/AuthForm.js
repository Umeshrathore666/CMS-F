import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ mode, setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
        const payload = mode === 'register' ? { name, email, password } : { email, password };
        alert(endpoint)
        try {
            const response = await axios.post(`http://localhost:5001${endpoint}`, payload);
            setToken(response.data.token)
            navigate('/dashboard'); 
        } catch (error) {
            console.log(error);
               
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {mode === 'register' && (
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </Form.Group>
            )}
            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {mode === 'register' ? 'Register' : 'Login'}
            </Button>
        </Form>
    );
};

export default AuthForm;