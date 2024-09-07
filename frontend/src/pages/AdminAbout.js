import React, { useState, useEffect } from 'react';
import {
    HomeOutlined, EditOutlined, SaveOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import {
    Typography, Input, Button, Form, message,
    Layout, Breadcrumb, Avatar
} from 'antd';
import { convertImageToBase64 } from '../utils/utils';

const { Content } = Layout;
const { Text } = Typography;

const About = ({ API_URL }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState('');
    const [aboutData, setAboutData] = useState({
        _id: '',
        logo: '',
        company_name: '',
        story: '',
        phonenumber: '',
        emailone: '',
        emailtwo: '',
        emailthree: '',
        address: '',
        mission: '',
        values: '',
        achievements: [],
        branches: [],
        policies: '',
        socials: {
            facebook: '',
            twitter: '',
            instagram: ''
        },
        account_details: []
    });
    const [editAbout, setEditAbout] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setIsLoading(true);
        const fetchAboutData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/about`);
                setAboutData(response.data.data);
                form.setFieldsValue(response.data.data);
            } catch (error) {
                console.error('Error fetching the about data:', error);
                message.error('Error fetching the about data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAboutData();
    }, [API_URL, form]);

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertImageToBase64(file);
                setLogo(base64);
                form.setFieldsValue({ logo: base64 });
            } catch (error) {
                console.error('Error converting file to Base64:', error);
                message.error('Error converting image.');
            }
        }
    };

    const saveEdit = async (values) => {
        setLoading(true);
        const token = localStorage.getItem('lahf_access_token');
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            if (aboutData._id) {
                await axios.put(`${API_URL}/api/about/${aboutData._id}`, values, { headers });
            } else {
                await axios.post(`${API_URL}/api/about`, values, { headers });
            }
            setAboutData(values);
            setEditAbout(false);
            message.success('About data saved successfully!');
        } catch (error) {
            console.error('Error saving about data:', error);
            message.error('Failed to save about data.');
        } finally {
            setLoading(false);
        }
    };

    const validatePhoneNumber = (_, value) => {
        if (!value || /^\d{10,15}$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Invalid phone number!'));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><InfoCircleOutlined /><span>About</span></>) },
                    ]}
                />
                <EditOutlined
                    style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }}
                    onClick={() => setEditAbout(!editAbout)}
                />
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 8,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <div style={{ padding: '14px' }} className='container-fluid bg-white'>
                        <Form
                            form={form}
                            layout="vertical"
                            initialValues={aboutData}
                            onFinish={saveEdit}
                        >
                            <Form.Item label="Logo" name="logo">
                                <Avatar size={150} src={aboutData.logo || logo} />
                                {editAbout && (
                                    <input type="file" accept="image/*" className='mt-2' onChange={handleLogoChange} />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="Company Name"
                                name="company_name"
                                rules={[{ required: true, message: 'Please enter the company name' }]}
                            >
                                <Input placeholder="Enter Company Name" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Story"
                                name="story"
                                rules={[{ required: true, message: 'Please enter the company story' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter Company Story" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Phone Number"
                                name="phonenumber"
                                rules={[
                                    { required: true, message: 'Please enter the phone number' },
                                    { validator: validatePhoneNumber }
                                ]}
                            >
                                <Input placeholder="Enter Phone Number" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Email One"
                                name="emailone"
                                rules={[
                                    { required: true, message: 'Please enter the first email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter Email One" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Email Two"
                                name="emailtwo"
                                rules={[
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter Email Two" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Email Three"
                                name="emailthree"
                                rules={[
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter Email Three" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please enter the address' }]}
                            >
                                <Input placeholder="Enter Address" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Mission"
                                name="mission"
                                rules={[{ required: true, message: 'Please enter the mission statement' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter Mission Statement" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Values"
                                name="values"
                                rules={[{ required: true, message: 'Please enter the company values' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter Company Values" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item
                                label="Policies"
                                name="policies"
                                rules={[{ required: true, message: 'Please enter the policies' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter Policies" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Facebook" name={['socials', 'facebook']}>
                                <Input placeholder="Enter Facebook URL" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Twitter" name={['socials', 'twitter']}>
                                <Input placeholder="Enter Twitter URL" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Instagram" name={['socials', 'instagram']}>
                                <Input placeholder="Enter Instagram URL" disabled={!editAbout} />
                            </Form.Item>
                            <Text>Branches: {aboutData.branches.length}</Text>
                            <Form.List name="branches">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <div key={key} style={{ display: 'flex' }} className='m-0'>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    fieldKey={[fieldKey, 'name']}
                                                    rules={[{ required: true, message: 'Please enter the branch name' }]}
                                                >
                                                    <Input placeholder="Branch Name" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'location']}
                                                    fieldKey={[fieldKey, 'location']}
                                                    rules={[{ required: true, message: 'Please enter the branch location' }]}
                                                >
                                                    <Input placeholder="Branch Location" disabled={!editAbout} />
                                                </Form.Item>
                                                {editAbout && (
                                                    <Button type="link" className='m-2 mt-1 text-white' onClick={() => remove(name)}>Remove</Button>
                                                )}
                                            </div>
                                        ))}
                                        {editAbout && (
                                            <Button type="dashed" className='m-2 mt-1 text-white' onClick={() => add()} block icon={<SaveOutlined className='text-white' />}>
                                                Add Branch
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Form.List>
                            <Text>Account Details: {aboutData.account_details.length}</Text>
                            <Form.List name="account_details">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <div key={key} style={{ display: 'flex' }} className='m-0'>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'currency']}
                                                    fieldKey={[fieldKey, 'currency']}
                                                    rules={[{ required: true, message: 'Please enter the currency' }]}
                                                >
                                                    <Input placeholder="Currency" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'number']}
                                                    fieldKey={[fieldKey, 'number']}
                                                    rules={[{ required: true, message: 'Please enter the account number' }]}
                                                >
                                                    <Input placeholder="Account Number" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'sortcode']}
                                                    fieldKey={[fieldKey, 'sortcode']}
                                                    rules={[{ required: true, message: 'Please enter the sort code' }]}
                                                >
                                                    <Input placeholder="Sort Code" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'bankname']}
                                                    fieldKey={[fieldKey, 'bankname']}
                                                    rules={[{ required: true, message: 'Please enter the bank name' }]}
                                                >
                                                    <Input placeholder="Bank Name" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'holdername']}
                                                    fieldKey={[fieldKey, 'holdername']}
                                                    rules={[{ required: true, message: 'Please enter the account holder name' }]}
                                                >
                                                    <Input placeholder="Account Holder Name" disabled={!editAbout} />
                                                </Form.Item>
                                                {editAbout && (
                                                    <Button type="link" className='m-2 mt-1 text-white' onClick={() => remove(name)}>Remove</Button>
                                                )}
                                            </div>
                                        ))}
                                        {editAbout && (
                                            <Button type="dashed" className='m-2 mt-1 text-white' onClick={() => add()} block icon={<SaveOutlined className='text-white' />}>
                                                Add Account Detail
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Form.List>
                            {editAbout && (
                                <Form.Item style={{ marginTop: '30px' }}>
                                    <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />} style={{ marginRight: '10px' }}>Save Changes</Button>
                                </Form.Item>
                            )}
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default About;
