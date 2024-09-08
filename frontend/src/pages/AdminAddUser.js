import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, Checkbox, message, Upload, Select,  } from 'antd';
import { HomeOutlined, UserAddOutlined, SaveOutlined, UploadOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { countryCodes, OFFICER_ROLES } from '../utils/utils'; // Adjust the path as necessary

const { Content } = Layout;
const { Option } = Select;

const AddUser = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const fullDomain = window.location.origin;
    console.log(fullDomain);


    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                ...values,
                url:fullDomain,
                profileImage: profileImage ? profileImage : null,
            };
            await axios.post(`${API_URL}/api/adminusers`, payload);
            message.success('User added successfully!');
            navigate('/admin/users');
        } catch (error) {
            console.error('There was an error adding the user!', error.response?.data || error.message);
            message.error('Failed to add user. Please try again.');

            if (error.response && error.response.data && error.response.data.errors) {
                // Iterate over the errors and display each one
                Object.keys(error.response.data.errors).forEach((key) => {
                    const messages = error.response.data.errors[key];
                    messages.forEach((msg) => {
                        message.error(`${msg} for ${key}`);
                    });
                });
            } else {
                // If there's no specific error format, show a generic error message
                message.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfileImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error('There was an error uploading the file!', error);
            message.error('Failed to upload image. Please try again.');
        };
    };

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/users', title: (<><UsergroupAddOutlined /><span style={{textDecoration:'none'}}>Users</span></>) },
                        { title: (<><UserAddOutlined /><span>Add User</span></>) },
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
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please enter the username' }]}
                        >
                            <Input placeholder="Enter Username" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter a password' }]}
                        >
                            <Input.Password placeholder="Enter Password" />
                        </Form.Item>

                        <Form.Item
                            label="First Name"
                            name="firstname"
                            rules={[{ required: true, message: 'Please enter the first name' }]}
                        >
                            <Input placeholder="Enter First Name" />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            rules={[{ required: true, message: 'Please enter the last name' }]}
                        >
                            <Input placeholder="Enter Last Name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter the email' }, { type: 'email', message: 'Please enter a valid email' }]}
                        >
                            <Input placeholder="Enter Email" />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                        >
                            <Input placeholder="Enter Address" />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="position"
                            rules={[{ required: true, message: 'Please enter the role/position' }]}
                        >
                            <Select placeholder="Enter Role/Position" >
                                {OFFICER_ROLES.map((position) => (
                                    <Option key={position.value} value={position.value}>
                                        {position.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* Phone Number Input with Country Code Prefix */}
                        <Form.Item
                            label="Phone Number"
                            name="number"
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name="numberpre"
                                    noStyle
                                    initialValue="+234"
                                >
                                    <Select style={{ width: '20%' }}>
                                        {countryCodes.map((code) => (
                                            <Option key={code.code} value={code.code}>
                                                {code.code} ({code.name})
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="number"
                                    noStyle
                                    rules={[{ required: true, message: 'Please enter the phone number' }]}
                                >
                                    <Input style={{ width: '80%' }} placeholder="Enter Phone Number" />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item
                            label="Facebook"
                            name="facebook"
                        >
                            <Input placeholder="Enter Facebook Profile" />
                        </Form.Item>

                        <Form.Item
                            label="Instagram"
                            name="instagram"
                        >
                            <Input placeholder="Enter Instagram Profile" />
                        </Form.Item>

                        <Form.Item
                            label="Twitter"
                            name="twitter"
                        >
                            <Input placeholder="Enter Twitter Profile" />
                        </Form.Item>

                        <Form.Item
                            label="LinkedIn"
                            name="linkedIn"
                        >
                            <Input placeholder="Enter LinkedIn Profile" />
                        </Form.Item>

                        <Form.Item
                            label="WhatsApp"
                            name="whatsapp"
                        >
                            <Input placeholder="Enter WhatsApp Profile" />
                        </Form.Item>

                        <Form.Item
                            label="Active"
                            name="is_active"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Checkbox>Active</Checkbox>
                        </Form.Item>

                        <Form.Item
                            label="Admin"
                            name="is_staff"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>Admin</Checkbox>
                        </Form.Item>

                        <Form.Item label="Profile Image">
                            <Upload
                                listType="picture"
                                beforeUpload={() => false} // Prevent auto upload
                                onChange={handleUpload}
                            >
                                <Button className='text-white' icon={<UploadOutlined className='text-white' />}>Upload Profile Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                                Add User
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AddUser;
