import React from 'react';
import { Container, Row, Col, Form} from 'react-bootstrap';
import {Button} from '../components/button';
import { SendOutlined} from '@ant-design/icons';

const ContactUsPage = () => {
    return (
        <Container className="py-5">
            <h2 className="text-center mb-5 mt-5">Contact Us</h2>
            <Row>
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
                    <h4>Contact Information</h4>
                    <p>
                        <strong>Address:</strong> Your Address Here<br />
                        <strong>Email:</strong> info@example.com<br />
                        <strong>Phone:</strong> +1 (123) 456-7890<br />
                    </p>
                    <p>
                        Feel free to contact us for any inquiries or assistance. Our team will be happy to help you.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUsPage;
