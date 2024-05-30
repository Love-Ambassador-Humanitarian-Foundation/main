import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Alert, Row, Col, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username: values.email,
                password: values.password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col xs={24} sm={16} md={12} lg={8} xl={6} style={{ padding: '20px', backgroundColor: '#ececec', borderRadius: '8px' }}>
                <Title level={2} className="text-center">Login</Title>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ maxWidth: '100%' }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password disabled={loading} />
                    </Form.Item>

                    <Form.Item>
                        <Link to='/signup'>Not yet joined? Sign up</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            {loading ? <div className="spinner"></div> : 'Login'}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginPage;
