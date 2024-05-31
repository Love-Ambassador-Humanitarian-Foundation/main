import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const EmailVerificationPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <Title level={2}>Email Verification</Title>
            <Paragraph>Please check your email for the verification link.</Paragraph>
            <Button type="primary" onClick={handleBackToHome} style={{ width: '100%' }}>
                Home Page
            </Button>
        </div>
    );
};

export default EmailVerificationPage;
