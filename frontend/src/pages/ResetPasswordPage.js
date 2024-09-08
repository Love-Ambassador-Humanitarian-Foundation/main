import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button, Input, Alert, message } from 'antd';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = ({ API_URL }) => {
    const {uid, token} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        if (values.newPassword !== values.confirmNewPassword) {
            setError('New passwords do not match. Please try again.');
            message.error('New passwords do not match. Please try again.');
        } else {
            if (!token) {
                message.error('Invalid or missing reset token.');
                return;
            }

            // Submit reset password request
            setLoading(true);
            setError('');

            try {
                await axios.get(`${API_URL}/api/password/reset/confirm/${uid}/${token}?new_password=${values.newPassword}`);

                message.success('Password reset successfully!');
                navigate('/login');
                
            } catch (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);

                // Iterate over the errors object
                for (let k in error.response.data.errors) {
                    if (error.response.data.errors.hasOwnProperty(k)) {
                        message.error(error.response.data.errors[k].join('\n'));
                    }
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center mt-4">
                <Col md={6} style={{ maxWidth: '380px', backgroundColor: '#ececec' }}>
                    <h2 className="text-center mb-4 mt-3">Reset Password</h2>
                    {error && <Alert message={error} type="error" showIcon />}
                    <Form onFinish={handleSubmit} className="d-flex flex-column w-100">
                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Please enter a new password!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input.Password placeholder="New Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmNewPassword"
                            rules={[{ required: true, message: 'Please confirm your new password!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input.Password placeholder="Confirm New Password" />
                        </Form.Item>

                        <Form.Item className='px-5'>
                            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPasswordPage;
