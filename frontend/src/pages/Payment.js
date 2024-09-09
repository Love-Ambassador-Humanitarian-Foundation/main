import React, { useState} from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Button } from '../components/button';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useUpdateLoginStatus } from '../hooks/hooks';

const PaymentPage = ({Companyname, API_URL}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [cardname, setCardName] = useState('');
    const [reason, setReason] = useState('');
    const [saveDetails, setSaveDetails] = useState(false);
    const [error, setError] = useState('');
    const {variable} = useParams();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform payment processing logic here
        // This is just a placeholder for demonstration
        if (!cardNumber || !expiryDate || !cvv || !name || !cardname || !reason) {
            setError('Please fill in all fields.');
        } else {
            setError('');
            console.log('Payment submitted!');
            if (saveDetails) {
                // Save payment details logic here
                console.log('Payment details saved!');
            }
        }
    };

    const {isLoggedIn,userDetails} = useUpdateLoginStatus(API_URL);
    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Include the header component */}
        <Container className="py-5">
                <Row className="justify-content-center mt-4">
                    <Col md={6} style={{ maxWidth: '380px' }}>
                        <h2 className="text-center mb-4 fs-5">Payment: <small className='text-success fs-6'>({variable})</small></h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                            <Form.Group controlId="formName" style={{ margin: '10px' }}>
                                <Form.Label>Name </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={{ borderColor: error && !name ? 'red' : '' }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCardNumber" style={{ margin: '10px' }}>
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter card number"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                    style={{ borderColor: error && !cardNumber ? 'red' : '' }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formExpiryDate" style={{ margin: '10px' }}>
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                    style={{ borderColor: error && !expiryDate ? 'red' : '' }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCVV" style={{ margin: '10px' }}>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                    style={{ borderColor: error && !cvv ? 'red' : '' }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCardName" style={{ margin: '10px' }}>
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name on card"
                                    value={cardname}
                                    onChange={(e) => setCardName(e.target.value)}
                                    required
                                    style={{ borderColor: error && !cardname ? 'red' : '' }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formReason" style={{ margin: '10px' }}>
                                <Form.Label>Reason</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                    style={{ borderColor: error && !reason ? 'red' : '' }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formSaveDetails" style={{ margin: '10px' }}>
                                <Form.Check
                                    type="checkbox"
                                    label="Save payment details"
                                    checked={saveDetails}
                                    onChange={(e) => setSaveDetails(e.target.checked)}
                                />
                                <Link to='/about#accountdetails' className='text-success'>View Account Details</Link>
                            </Form.Group>

                            <Button text="Pay Now" style={{ margin: '20px', alignSelf: 'center' }} onClick={(e)=>(handleSubmit(e))} />
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </>
    );
};

export default PaymentPage;
