import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Alert, Row, Col, Typography, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl || '/';
    
    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/api/users/login`, {
                email: values.email,
                password: values.password,
            });
            
            localStorage.setItem('lahf_access_token', response.data.access);
            localStorage.setItem('lahf_refresh_token', response.data.refresh);
            localStorage.setItem('lahf_user_id', response.data.userid);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            
            const url = redirectUrl.replace(':userid', response.data.userid);
            navigate(url);
            message.success('Login successful');
            
        } catch (error) {
            console.log(error,'=============');
            message.error(error.response.data.message);     
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
                        Not yet joined?, <Link to='/signup' state={{ redirectUrl }}>Sign up</Link>
                    </Form.Item>

                    <Form.Item className='px-5'>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            {loading ? 'Login...' : 'Login'}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginPage;
