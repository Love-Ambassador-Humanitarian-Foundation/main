import React, { useState } from 'react';
import { Nav, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Button, NavLink } from './button';
import { MailOutlined, TwitterOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';
import { addnewsLetterReceipients } from '../services/api'; // Import your service for API calls

const Footer = ({ Companyname, API_URL }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const currentYear = new Date().getFullYear(); // Get the current year

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
    
        // Get the current date and time in 'YYYY-MM-DD hh:mm:ss' format
        const now = new Date();
        const currentDateTime = now.getFullYear() + '-' +
                                String(now.getMonth() + 1).padStart(2, '0') + '-' +
                                String(now.getDate()).padStart(2, '0') + ' ' +
                                String(now.getHours()).padStart(2, '0') + ':' +
                                String(now.getMinutes()).padStart(2, '0') + ':' +
                                String(now.getSeconds()).padStart(2, '0');
        const payload = {
            email,
            joined_at: currentDateTime, // Correct format YYYY-MM-DD hh:mm:ss
        };
    
        try {
            console.log(payload)
            //const response = await addnewsLetterReceipients(API_URL, payload);
    
            // Handle response if needed
            setMessage('You have successfully subscribed!');
            setEmail(''); // Clear the email field on success
        } catch (error) {
            setMessage('Error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const style = {
        backgroundColor: '#d7d7e9',
        color: 'white',
        padding: '10px',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    return (
        <Container fluid style={style}>
            <footer className="py-5">
                <Row className="m-0">
                    <Col className="col-6 col-md-2 mb-3">
                        <h4 className="text-dark">Contact Info</h4>
                        <Nav className="flex-column">
                            <NavLink to="/" text="Home" className="text-dark" style={{ margin: '0px', padding: '0px' }} />
                            <NavLink to="/about" text="About" className="text-dark m-0" />
                            <NavLink to="/events" text="Events" className="text-dark m-0" />
                            <NavLink to="/scholarships" text="Scholarships" className="text-dark m-0" />
                        </Nav>
                    </Col>

                    <Col className="col-6 col-md-2 mb-3">
                        <h4 className="text-dark">Our Support</h4>
                        <Nav className="flex-column p-0">
                            <NavLink to="/signup" text="Contribute" className="text-dark m-0" />
                            <NavLink to="/signup" text="Volunteer" className="text-dark m-0" />
                            <NavLink to="/contact" text="Contact us" className="text-dark m-0" />
                            <NavLink to="/contact" text="Partner with us" className="text-dark m-0" />
                        </Nav>
                    </Col>

                    <Col className="col-md-5 offset-md-1 mb-3">
                        <form onSubmit={handleSubmit}>
                            <h5 className="text-dark">Subscribe to our newsletter</h5>
                            <p className="text-dark">Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden text-dark">
                                    Email address
                                </label>
                                <input
                                    id="newsletter1"
                                    type="email"
                                    className="form-control"
                                    style={{ borderColor: '#d7d7e9' }}
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button
                                    type="submit"
                                    text={isSubmitting ? <Spinner animation="border" size="sm" /> : 'Subscribe'}
                                    className="text-dark border"
                                    style={{ border: '1px dotted #34356b', width: '155px', alignSelf: 'center' }}
                                    icon={<MailOutlined style={{ color: '#ec3237' }} />}
                                    disabled={isSubmitting}
                                />
                                {message && <p className="text-center text-success mt-2">{message}</p>}
                                <div className="d-flex flex-row m-auto mt-4" style={{ alignItems: 'center', margin: '20px' }}>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                        <TwitterOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#1DA1F2' }} />
                                    </a>
                                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                        <InstagramOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#E4405F' }} />
                                    </a>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                        <FacebookOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#1877F2' }} />
                                    </a>
                                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                        <WhatsAppOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#25D366' }} />
                                    </a>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                        <LinkedinOutlined style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: '#0077B5' }} />
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center border-top mt-4 pt-3">
                    <p className="text-dark text-center m-0" style={{ flexGrow: 1 }}>
                        © {currentYear} {Companyname}, Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </Container>
    );
};

export default Footer;
