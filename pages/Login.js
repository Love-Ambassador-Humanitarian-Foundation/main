import React, { useState} from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

import { Button} from '../components/button';
import { Link } from 'react-router-dom';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('Invalid email or password. Please try again.');
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center mt-4 ">
                <Col md={6} style={{ maxWidth: '380px',backgroundColor:'#ececec' }}>
                    <h2 className="text-center mb-4 mt-3">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                        <Form.Group controlId="formBasicEmail" style={{margin:'10px'}}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{margin:'10px'}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div style={{margin:'10px'}}>
                            Not yet joined?, <Link to='/signup' className='text-danger'>Sign up</Link>
                        </div>

                        <Button  text="Login"  style={{margin:'20px', alignSelf: 'center' }} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
