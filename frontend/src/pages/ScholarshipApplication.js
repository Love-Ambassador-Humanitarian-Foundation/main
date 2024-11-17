import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Card, Typography, Layout, message, DatePicker, Select, Checkbox, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateLoginStatus } from '../hooks/hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import durationPlugin from 'dayjs/plugin/duration';
import { addScholarshipApplication, getScholarshipbyId } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

// Extend dayjs with required plugins
dayjs.extend(relativeTime);
dayjs.extend(durationPlugin);

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const ScholarshipApplication = ({ API_URL, Companyname }) => {
    const { id } = useParams(); // Get scholarship ID from URL
    const navigate = useNavigate();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [scholarship, setScholarship] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = dayjs();  // Use dayjs for current date formatting
    const [modalVisible, setModalVisible] = useState(false);
    const [accepted, setAccepted]  = useState(false)

    useEffect(() => {
        const today = dayjs();  // Use dayjs for current date formatting
        const fetchScholarship = async () => {
            try {
                setIsLoading(true);
                const response = await getScholarshipbyId(API_URL, id,today.format('YYYY-MM-DD HH:mm:ss'));
                setScholarship(response);
            } catch (error) {
                console.error('Error fetching scholarship details:', error);
                message.error('Failed to fetch scholarship details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchScholarship();
    }, [API_URL, id]);

    const onFinish = async (values) => {
        setIsSubmitting(true);
        if (!accepted) {
            message.error('Terms and conditions must be accepted');
            setIsSubmitting(false);
            return;
        }
        try {
            await addScholarshipApplication(API_URL, {
                ...values,
                scholarship: id,  // Pass scholarship ID in the request
                birthday:values.birthday.format('YYYY-MM-DD'),
                candidate_signature_date: currentDate.format('YYYY-MM-DD'),
                termsandconditionsaccepted:accepted
            });
            message.success('Application submitted successfully!');
            navigate(`/scholarships/${id}`);

        } catch (error) {
            console.log('There was an error submitting the application!', error);
            message.error('Failed to submit the application. Please try again.');

            if (error.response && error.response.data && error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    const messages = error.response.data.errors[key];
                    messages.forEach((msg) => {
                        message.error(`${msg} for ${key}`);
                    });
                });
            } else {
                message.error('An unexpected error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    const showTermsModal = () => {
        setModalVisible(true);
    };

    const handleModalOk = () => {
        setModalVisible(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };
    const handleAcceptedChange = (e) => {
        
        setAccepted(e.target.checked)
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout id='application'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '2px', background: '#fff', marginTop: '70px' }}>
                <div style={{ padding: 8, backgroundColor: '#f0f2f5' }}>
                    <Title level={3}>Scholarship Application - {scholarship?.name}</Title>
                    <Card>
                        <Form
                            name="application"
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{ scholarship: id, candidate_signature_date: currentDate, termsandconditionsaccepted:false }} // Initialize form with values
                        >
                            <Form.Item
                                label="Scholarship ID"
                                name="scholarship"
                            >
                                <Input value={id} disabled placeholder={id} />
                            </Form.Item>
                            {/* Personal Information */}
                            <Title level={4}>Personal Information</Title>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Middle Name"
                                name="middle_name"
                                rules={[{ required: true, message: 'Please enter your middle name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input />
                            </Form.Item>
                            
                            <Form.Item
                                label="Email Address"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phone_number"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Birthday"
                                name="birthday"
                                rules={[{ required: true, message: 'Please select your birthday' }]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>

                            <Form.Item
                                label="Home Address"
                                name="home_address"
                                rules={[{ required: true, message: 'Please enter your home address' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* Guardian/Parent Information */}
                            <Title level={4}>Guardian/Parent Information</Title>
                            <Form.Item
                                label="Guardian/Parent Name"
                                name="guardian_parent_name"
                                rules={[{ required: true, message: 'Please enter guardian/parent name' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Guardian/Parent Email"
                                name="guardian_parent_email"
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Guardian/Parent Phone Number"
                                name="guardian_parent_phone_number"
                                rules={[{ required: true, message: 'Please enter guardian/parent phone number' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Guardian/Parent Home Address"
                                name="guardian_parent_home_address"
                                rules={[{ required: true, message: 'Please enter guardian/parent home address' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* Educational Background */}
                            <Title level={4}>Educational Background</Title>
                            <Form.Item
                                label="Name of Institution"
                                name="name_of_institution"
                                rules={[{ required: true, message: 'Please enter the name of the institution' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Address of Institution"
                                name="address_of_institution"
                                rules={[{ required: true, message: 'Please enter the address of the institution' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Class Level"
                                name="class_level"
                                rules={[{ required: true, message: 'Please select your class level' }]}
                            >
                                <Select>
                                    <Option value="Nursery">Nursery</Option>
                                    <Option value="Primary">Primary</Option>
                                    <Option value="JSS">Junior Secondary School</Option>
                                    <Option value="SSS">Senior Secondary School</Option>
                                    <Option value="Tertiary">Tertiary</Option>
                                </Select>
                            </Form.Item>

                            {/* Application Details */}
                            <Title level={4}>Application Date</Title>
                            <Form.Item
                                label="Current Date"
                                name="candidate_signature_date"
                                rules={[{ required: true, message: 'This must be filled' }]}
                            >
                                <DatePicker format="YYYY-MM-DD" value={currentDate} disabled />
                            </Form.Item>
                            <Form.Item 
                                label="Terms And Conditions "
                                name="termsandconditionsaccepted"
                                rules={[{ required: true, message: 'This must be accepted' }]}>
                                <span onClick={showTermsModal} className='mx-2 text-info' style={{cursor:'pointer'}}>View Terms and Conditions</span>
                                <Checkbox onChange={handleAcceptedChange}
                                >
                                    {accepted 
                                    ? <span className='text-success'>Accepted</span> 
                                    : <span className='text-danger'>Not Accepted</span>}
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmitting} >
                                    {isSubmitting ? <span>Applying ...</span> : <span>Submit Application</span>}
                                </Button>
                            </Form.Item>
                        </Form>
                        <Modal
                            title="Terms and Conditions"
                            visible={modalVisible}
                            onOk={handleModalOk}
                            onCancel={handleModalCancel}
                            footer={[
                                <Button key="back" onClick={handleModalCancel}>
                                    Close
                                </Button>,
                            ]}
                        >
                            <p>{scholarship?.termsandconditions}</p>
                        </Modal>
                    </Card>
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL} />
        </Layout>
    );
};

export default ScholarshipApplication;
