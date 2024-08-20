import React from 'react';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <Container className="text-center">
      <h1>Welcome to the CMS</h1> 
      <Dashboard/>
    </Container>
  );
};

export default Home;
