import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <Container>
                <Row className="py-4">
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>
                            This CMS allows users to create, manage, and publish content with ease.
                            Built using the MERN stack, it offers powerful features for media management and more.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/" className="text-white">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/dashboard" className="text-white">
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/create-post" className="text-white">
                                Create Post
                            </Nav.Link>
                            <Nav.Link as={Link} to="/media-library" className="text-white">
                                Media Library
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>
                            Email: support@cmsproject.com
                            <br />
                            Phone: +1 234 567 890
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-3">
                        <p>&copy; {new Date().getFullYear()} CMS Project. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
