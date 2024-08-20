import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar1 from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  return (
    <Navbar1 bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar1.Brand href="/">CMS</Navbar1.Brand>
        <Navbar1.Toggle aria-controls="basic-navbar-nav" />
        <Navbar1.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="">Dashboard</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something else</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {token ? (
        <Button variant="danger" as={Link} to="/logout" className="mr-2">
          Logout
        </Button>
      ) : (
        <>
          <Button variant="success" as={Link} to="/register" className="mr-2">
          Register  
          </Button>
          <Button variant="secondary" as={Link} to="/login" className="mr-2">
            Login
          </Button>
        </>
        )}
        </Navbar1.Collapse>
      </Container>
    </Navbar1>
  );
}

export default Navbar;
