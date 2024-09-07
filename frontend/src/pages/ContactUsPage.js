import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button } from '../components/button';
import { SendOutlined, TwitterOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons'; // Import social icons from Ant Design
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateLoginStatus } from '../utils/hooks';
const ContactUsPage = ({Companyname,API_URL}) => {
    const {isLoggedIn,userDetails} = useUpdateLoginStatus(API_URL);
    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Include the header component */}
        
            <Container className="py-5">
                <h2 className="text-center mb-2 mt-5">Contact Us</h2>
                <Row style={{marginLeft:'1px', marginRight:'1px'}}>
                    <Col md={6}>
                        <h4>Send us a message</h4>
                        <Form>
                            <Form.Group controlId="formName"  style={{margin:'10px'}}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" />
                            </Form.Group>

                            <Form.Group controlId="formEmail"  style={{margin:'10px'}}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>

                            <Form.Group controlId="formMessage"  style={{margin:'10px'}}>
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                            </Form.Group>

                            <Button onClick={()=>({})} text="Submit" icon={<SendOutlined style={{ color: '#ec3237' }} />} style={{margin:'10px'}} />
                        </Form>
                    </Col>
                    <Col md={6}>
                        <h4 className='mt-4'>Contact Information</h4>
                        <p>
                            <strong>Address:</strong> Your Address Here<br />
                            <strong>Email:</strong> info@example.com<br />
                            <strong>Phone:</strong> +1 (123) 456-7890<br />
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <TwitterOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#1DA1F2' }} />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#E4405F' }} />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#1877F2' }} />
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                <WhatsAppOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#25D366' }} />
                            </a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                <LinkedinOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#0077B5' }} />
                            </a>
                        </p>


                    </Col>
                </Row>
            </Container>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </>
    );
};

export default ContactUsPage;
