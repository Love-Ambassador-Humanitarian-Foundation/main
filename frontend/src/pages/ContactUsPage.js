import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { Button } from '../components/button';
import { SendOutlined, TwitterOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateLoginStatus } from '../hooks/hooks';
import { contactUs, getAbout } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactUsPage = ({ Companyname, API_URL }) => {
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for form submission

    // State to handle form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // State for form submission feedback
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting state to true
        setFeedbackMessage(''); // Clear feedback message on new submission

        try {
            const response = await contactUs(API_URL, formData); // Adjust the API endpoint
            if (response.status === 200) {
                setFeedbackMessage('Your message has been sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // Reset form after success
            }
        } catch (error) {
            setFeedbackMessage('Failed to send your message. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset submitting state to false
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const aboutResponse = await getAbout(API_URL);
                setData(aboutResponse);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [API_URL]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Include the header component */}

            <Container className="py-5">
                <h2 className="text-center mb-2 mt-5">Contact Us</h2>
                <Row style={{ marginLeft: '1px', marginRight: '1px' }}>
                    <Col md={6}>
                        <h4>Send us a message</h4>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" style={{ margin: '10px' }}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" style={{ margin: '10px' }}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formMessage" style={{ margin: '10px' }}>
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Enter your message"
                                    required
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                text={isSubmitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
                                icon={<SendOutlined style={{ color: '#ec3237' }} />}
                                style={{ margin: '10px' }}
                                disabled={isSubmitting} // Disable button while submitting
                            />
                        </Form>
                        {feedbackMessage && <p className="text-success mt-2">{feedbackMessage}</p>}
                    </Col>

                    <Col md={6}>
                        <h4 className='mt-4'>Contact Information</h4>
                        <p>
                            <strong>Address:</strong> {data.address}<br />
                            <strong>Email:</strong> {data.emailone}<br />
                            <strong>Phone:</strong>({data.phonenumberpre}) {data.phonenumber}<br />
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            {data.socials.map((social, index) => (
                                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                                    {social.name.includes('twitter') && (
                                        <TwitterOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#1DA1F2' }} />
                                    )}
                                    {social.name.includes('instagram') && (
                                        <InstagramOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#E4405F' }} />
                                    )}
                                    {social.name.includes('facebook') && (
                                        <FacebookOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#1877F2' }} />
                                    )}
                                    {social.name.includes('whatsapp') && (
                                        <WhatsAppOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#25D366' }} />
                                    )}
                                    {social.name.includes('linkedin') && (
                                        <LinkedinOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#0077B5' }} />
                                    )}
                                </a>
                            ))}
                        </p>
                    </Col>
                </Row>
            </Container>
            <Footer Companyname={Companyname} API_URL={API_URL} /> {/* Include the footer component */}
        </>
    );
};

export default ContactUsPage;
