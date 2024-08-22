import React, { useState, useEffect } from 'react';
import {
    HomeOutlined, EditOutlined, SaveOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import {Typography, Input, Button, Form, message,
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
                setAboutData(response.data.response);
                form.setFieldsValue(response.data.response);
            } catch (error) {
                console.error('Error fetching the about data:', error);
            }
        };
        fetchAboutData();
        setIsLoading(false);
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
            }
        }
    };

    const saveEdit = async (values) => {
        setLoading(true);
        const token = localStorage.getItem('lahf_access_token');
        try {
            if (aboutData.id) {
                await axios.put(`${API_URL}/api/about`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                await axios.post(`${API_URL}/api/about`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            setEditAbout(false);
            message.success('About data has been saved successfully!');
        } catch (error) {
            console.error('Error saving about data:', error);
            message.error('Failed to save about data.');
        }
        setLoading(false);
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
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setEditAbout(!editAbout)} />
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
                            <Form.Item label="Company Name" name="company_name">
                                <Input placeholder="Enter Company Name" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Story" name="story">
                                <Input.TextArea rows={4} placeholder="Enter Company Story" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phonenumber">
                                <Input placeholder="Enter Phone Number" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Email One" name="emailone">
                                <Input placeholder="Enter Email One" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Email Two" name="emailtwo">
                                <Input placeholder="Enter Email Two" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Email Three" name="emailthree">
                                <Input placeholder="Enter Email Three" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Address" name="address">
                                <Input placeholder="Enter Address" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Mission" name="mission">
                                <Input.TextArea rows={4} placeholder="Enter Mission Statement" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Values" name="values">
                                <Input.TextArea rows={4} placeholder="Enter Company Values" disabled={!editAbout} />
                            </Form.Item>
                            <Form.Item label="Policies" name="policies">
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
                            <Text>Branches</Text>
                            <Form.List name="branches">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <div key={key} style={{ display: 'flex' }} className='m-0'>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    fieldKey={[fieldKey, 'name']}
                                                    rules={[{ required: true, message: 'Missing branch name' }]}
                                                >
                                                    <Input placeholder="Branch Name" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'location']}
                                                    fieldKey={[fieldKey, 'location']}
                                                    rules={[{ required: true, message: 'Missing branch location' }]}
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
                            <Text>Account Details</Text>
                            <Form.List name="account_details">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <div key={key} style={{ display: 'flex' }} className='m-0'>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'currency']}
                                                    fieldKey={[fieldKey, 'currency']}
                                                    rules={[{ required: true, message: 'Missing currency' }]}
                                                >
                                                    <Input placeholder="Currency" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'number']}
                                                    fieldKey={[fieldKey, 'number']}
                                                    rules={[{ required: true, message: 'Missing account number' }]}
                                                >
                                                    <Input placeholder="Account Number" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'sortcode']}
                                                    fieldKey={[fieldKey, 'sortcode']}
                                                    rules={[{ required: true, message: 'Missing sort code' }]}
                                                >
                                                    <Input placeholder="Sort Code" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'bankname']}
                                                    fieldKey={[fieldKey, 'bankname']}
                                                    rules={[{ required: true, message: 'Missing bank name' }]}
                                                >
                                                    <Input placeholder="Bank Name" disabled={!editAbout} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'holdername']}
                                                    fieldKey={[fieldKey, 'holdername']}
                                                    rules={[{ required: true, message: 'Missing account holder name' }]}
                                                >
                                                    <Input placeholder="Account Holder Name" disabled={!editAbout} />
                                                </Form.Item>
                                                {editAbout && (
                                                    <Button type="link" className='m-2 mt-1 text-white' onClick={() => remove(name)}>Remove</Button>
                                                )}
                                            </div>
                                        ))}
                                        {editAbout && (
                                            <Button type="dashed" className='m-2 mt-1 text-white' onClick={() => add()} block icon={<SaveOutlined  className='text-white' />}>
                                                Add Account Detail
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Form.List>
                            {editAbout && (
                                <Form.Item style={{ marginTop: '30px' }}>
                                    <Button type="primary" className='text-white' htmlType="submit" loading={loading} icon={<SaveOutlined  className='text-white' />} style={{ marginRight: '10px' }}>Save Changes</Button>
                                </Form.Item>
                            )}
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default About;
