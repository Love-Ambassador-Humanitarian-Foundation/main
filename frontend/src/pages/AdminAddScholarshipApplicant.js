import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, DatePicker, message,Select } from 'antd';
import { HomeOutlined, ProfileOutlined, SaveOutlined, SolutionOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams , useLocation, Link} from 'react-router-dom';
import dayjs from 'dayjs';  // Import dayjs for date handling

const { Content } = Layout;
const { Option } = Select;

const CLASS_LEVEL_CHOICES = [
    { value: 'Nursery', label: 'Nursery' },
    { value: 'Primary', label: 'Primary' },
    { value: 'JSS', label: 'Junior Secondary School' },
    { value: 'SSS', label: 'Senior Secondary School' },
    { value: 'Tertiary', label: 'Tertiary' },
];

const AddScholarshipApplicant = ({ API_URL }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const scholarship = location?.state?.scholarship;
    // console.log(location,scholarship)
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const [formData, setFormData] = useState({
        scholarship:id,
        first_name: "",
        middle_name: "",
        last_name: "",
        birthday: "",
        home_address: "",
        email: "",
        phone_number: "",
        guardian_parent_name: "",
        guardian_parent_home_address: "",
        guardian_parent_email: "",
        guardian_parent_phone_number: "",
        name_of_institution: "",
        address_of_institution: "",
        class_level: "",
        candidate_signature_date: currentDate
    });

    const navigate = useNavigate();
    const [form] = Form.useForm();


    const onFinish = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/scholarshipapplicants`, formData);
            message.success('Application submitted successfully!');
            navigate(`/admin/scholarships/${id}/applicants`, {state:{scholarship:scholarship}});

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
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date, dateString) => {
        setFormData({
            ...formData,
            birthday: dateString,
        });
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            class_level: value,
        });
    };

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/scholarships', title: (<><ProfileOutlined /><span style={{textDecoration:'none'}}>Scholarships</span></>) },
                        { href: `/#/admin/scholarships/${id}`, title: (<span style={{textDecoration:'none'}}>{scholarship?.name}</span>) },
                        {
                            title: (
                                <Link
                                    to={`/admin/scholarships/${id}/applicants`}
                                    state={{ scholarship: scholarship }}
                                    style={{ textDecoration: 'none' }}
                                    >
                                    <SolutionOutlined />
                                    <span>Applicants</span>
                                </Link>
                            )
                            },
                        { title: (<span style={{textDecoration:'none'}}>Add Application</span>) },
                    ]}
                />
            </div>
            <Content className='m-2'>
                <div
                    className='mb-5'
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[{ required: true, message: 'Please enter the first name' }]}
                        >
                            <Input 
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                placeholder="Enter First Name" 
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Middle Name" 
                            name="middle_name">
                            <Input
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleInputChange}
                                placeholder="Enter Middle Name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[{ required: true, message: 'Please enter the last name' }]}
                        >
                            <Input 
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                placeholder="Enter Last Name" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Birthday"
                            name="birthday"
                            rules={[{ required: true, message: 'Please select the birthday' }]}
                        >
                            <DatePicker
                                value={dayjs(formData.birthday)}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Home Address"
                            name="home_address"
                            rules={[{ required: true, message: 'Please enter the home address' }]}
                        >
                            <Input 
                                name="home_address"
                                value={formData.home_address}
                                onChange={handleInputChange}
                                placeholder="Enter Home Address" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
                        >
                            <Input 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter Email" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[{ required: true, message: 'Please enter the phone number' }]}
                        >
                            <Input 
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                placeholder="Enter Phone Number" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Guardian/Parent Name"
                            name="guardian_parent_name"
                            rules={[{ required: true, message: 'Please enter the guardian/parent name' }]}
                        >
                            <Input 
                                name="guardian_parent_name"
                                value={formData.guardian_parent_name}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian/Parent Name" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Guardian/Parent Home Address"
                            name="guardian_parent_home_address"
                            rules={[{ required: true, message: 'Please enter the guardian/parent home address' }]}
                        >
                            <Input 
                                name="guardian_parent_home_address"
                                value={formData.guardian_parent_home_address}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian/Parent Home Address" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Guardian/Parent Email"
                            name="guardian_parent_email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
                        >
                            <Input 
                                name="guardian_parent_email"
                                value={formData.guardian_parent_email}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian/Parent Email" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Guardian/Parent Phone Number"
                            name="guardian_parent_phone_number"
                            rules={[{ required: true, message: 'Please enter the guardian/parent phone number' }]}
                        >
                            <Input 
                                name="guardian_parent_phone_number"
                                value={formData.guardian_parent_phone_number}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian/Parent Phone Number" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Name of Institution"
                            name="name_of_institution"
                            rules={[{ required: true, message: 'Please enter the name of the institution' }]}
                        >
                            <Input 
                                name="name_of_institution"
                                value={formData.name_of_institution}
                                onChange={handleInputChange}
                                placeholder="Enter Name of Institution" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Address of Institution"
                            name="address_of_institution"
                            rules={[{ required: true, message: 'Please enter the address of the institution' }]}
                        >
                            <Input 
                                name="address_of_institution"
                                value={formData.address_of_institution}
                                onChange={handleInputChange}
                                placeholder="Enter Address of Institution" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Class Level"
                            name="class_level"
                            rules={[{ required: true, message: 'Please select the class level' }]}
                        >
                            <Select
                                value={formData.class_level}
                                onChange={handleSelectChange}
                                placeholder="Select Class Level"
                            >
                                {CLASS_LEVEL_CHOICES.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading} 
                                icon={<SaveOutlined />}
                            >
                                Submit Application
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AddScholarshipApplicant;
