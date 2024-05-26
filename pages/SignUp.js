import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
        } else {
            // Submit sign up form
            // You can implement your sign up logic here
            console.log('Sign up successful!');
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center mt-4 " >
                <Col md={6} style={{ maxWidth: '380px',backgroundColor:'#ececec' }}>
                    <h2 className="text-center mb-4 mt-3">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                        <Form.Group controlId="formTitle" style={{ margin: '10px' }}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formFirstName" style={{ margin: '10px' }}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName" style={{ margin: '10px' }}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" style={{ margin: '10px' }}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{ margin: '10px' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" style={{ margin: '10px' }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div style={{margin:'10px'}}>
                            Already joined?, <Link to='/login' className='text-danger'>Log In</Link>
                        </div>
                        <Button text="Sign Up" style={{ margin: '20px', alignSelf: 'center' }} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpPage;
