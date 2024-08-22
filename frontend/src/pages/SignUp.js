import React,{useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Input, Alert, message } from 'antd';

const SignUpPage = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl || '/'; // Default redirect URL

    const handleSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match. Please try again.');
            message.error('Passwords do not match. Please try again.');
        } else {
            // Submit sign up form
            setLoading(true);
            setError('');

            try {
                const response = await axios.post(`${API_URL}/api/users`, {
                    email: values.email,
                    password: values.password,
                    username: values.username,
                    firstname: values.firstName,
                    lastname: values.lastName,
                    is_active: false,
                    position: 'Volunteer'
                });

                localStorage.setItem('lahf_access_token', response.data.access);
                localStorage.setItem('lahf_refresh_token', response.data.refresh);
                localStorage.setItem('lahf_user_id', response.data.userid); // Assuming the user ID is in response.data.user.id

                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

                const token = localStorage.getItem('lahf_access_token');
                const userId = localStorage.getItem('lahf_user_id');
                console.log("UserId:",userId);
                console.log(token)
                // Navigate to another page and pass the user details as state
                navigate('/email/verify');
                message.success(response.data.message || 'Sign up successful!');
                
            } catch (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);

                // Iterate over the errors object
                for (let k in error.response.data.errors) {
                    if (error.response.data.errors.hasOwnProperty(k)) {
                        // Join the error messages into a single string with each message on a new line
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
                    <h2 className="text-center mb-4 mt-3">Sign Up</h2>
                    {error && <Alert message={error} type="error" showIcon />}
                    <Form onFinish={handleSubmit} className="d-flex flex-column w-100">
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input placeholder="Enter Username" />
                        </Form.Item>

                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter your first name!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter your last name!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                            style={{ margin: '10px' }}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>

                        <div style={{ margin: '10px' }}>
                            Already joined? <Link to='/login' state={{ redirectUrl }} className='text-danger'>Log In</Link>
                        </div>

                        <Form.Item className='px-5'>
                            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                                {loading ? 'Registering...' : 'Sign Up'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpPage;
