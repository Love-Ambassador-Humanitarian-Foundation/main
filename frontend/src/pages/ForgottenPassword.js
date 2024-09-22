import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgottenPasswordPage = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');

        try {
            const protocol = window.location.protocol; // 'http:' or 'https:'
            const domain = window.location.host; // e.g., 'example.com' or 'localhost:3000'
            const url = `${protocol}//${domain}`;

            await axios.post(`${API_URL}/api/password/reset`, {
                email: values.email,
                url: url
            });

            message.success('Password reset link has been sent to your email!');
            navigate('/password/reset/sent'); // Redirect to login page or another page

        } catch (error) {
            console.error(error);
            setError('Failed to send password reset link. Please try again.');
            message.error('Failed to send password reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center mt-4">
                <Col md={6} style={{ maxWidth: '380px', backgroundColor: '#ececec' }}>
                    <h2 className="text-center mb-4 mt-3">Forgot Password</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onFinish={handleSubmit} className="d-flex flex-column w-100">
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item className="px-5">
                            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgottenPasswordPage;
