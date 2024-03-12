import React from 'react';
import { Container, Button } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <div style={{ backgroundImage: `url('https://example.com/cover-image.jpg')`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <Container className="py-5">
            <h1 className="text-center text-white mb-4">Welcome to Our Website</h1>
            <p className="text-center text-white mb-5">This is where you can introduce your application or website.</p>
            <div className="d-flex justify-content-center">
                <Button variant="primary" className="me-3">Get Started About</Button>
                <Button variant="outline-light">Learn More</Button>
            </div>
        </Container>
    </div>
  );
};

export default AboutPage;
