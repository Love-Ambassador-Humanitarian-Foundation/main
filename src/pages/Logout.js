import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col, Typography, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const { Title } = Typography;

const LogoutPage = ({API_URL}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //const logindetails = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl;

    useEffect(() => {
        if (redirectUrl) {
            console.log('Redirect URL:', redirectUrl);
        }
    }, [redirectUrl]);

    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');

        try {
            // Remove tokens from local storage
            localStorage.removeItem('lahf_access_token');
            localStorage.removeItem('lahf_refresh_token');
            localStorage.removeItem('lahf_user_id');
    
            // Clear authorization header
            delete axios.defaults.headers.common['Authorization'];
    
            // Navigate to the redirect URL
            //console.log('Redirect URL:====', redirectUrl);
            //const token = localStorage.getItem('lahf_access_token');
            const userId = localStorage.getItem('lahf_user_id');
            console.log("UserId:",userId);
            navigate(-1);
    
            // Show success message
            message.success('Logged out successfully');
        } catch (error) {
            // Set error message state
            setError('Unable to log out. Please try again.');
            
            // Show error message
            message.error('Unable to log out. Please try again.');
        } finally {
            // Set loading state to false
            setLoading(false);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col xs={24} sm={16} md={12} lg={8} xl={6} style={{ padding: '20px', backgroundColor: '#ececec', borderRadius: '8px' }}>
                <Title level={2} className="text-center">Log Out</Title>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
                <Form
                    name="logout"
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ maxWidth: '100%' }}
                >
                    
                    <Form.Item>
                        Changed your mind? <Link to={redirectUrl} onClick={()=>{navigate(-1)}} >Go back</Link>
                    </Form.Item>

                    <Form.Item className='px-5'>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            {loading ? 'Login Out...' : 'Logout'}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LogoutPage;
