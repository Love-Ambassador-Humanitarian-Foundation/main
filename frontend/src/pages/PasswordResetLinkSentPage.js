import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PasswordResetLinkSentPage = ({ API_URL }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login'); // Redirect to login page or any other appropriate page
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center mt-4">
                <Col md={6} style={{ maxWidth: '380px', backgroundColor: '#ececec' }}>
                    <Result
                        status="info"
                        title="Password Reset Link Sent!"
                        subTitle="Please check your email for a link to reset your password."
                        extra={[
                            <Button type="primary" key="login" onClick={handleRedirect}>
                                Go to Login
                            </Button>
                        ]}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default PasswordResetLinkSentPage;
