import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, message, Upload,DatePicker } from 'antd';
import { HomeOutlined, SaveOutlined, UploadOutlined, TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;

const AddAdminPartner = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                ...values,
                logo: logoImage ? `data:image/jpeg;base64,${logoImage}` : null, // Assuming JPEG image
                created_date: values.created_date ? values.created_date.format('YYYY-MM-DD') : null,
            };

            await axios.post(`${API_URL}/api/partners`, payload);
            message.success('Partner added successfully!');
            navigate('/admin/partners');
        } catch (error) {
            console.error('There was an error adding the partner!', error.response?.data || error.message);
            //message.error(error.message);

            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach((key) => {
                    const messages = error.response.data[key];
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

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLogoImage(reader.result.split(',')[1]); // Only keep the base64 part
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
                        { href: '/#/admin/partners', title: (<><TeamOutlined /><span style={{textDecoration:'none'}}>Partners</span></>) },
                        { title: (<span>Add Partner</span>) },
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
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Partner Title"
                            name="title"
                            rules={[{ required: true, message: 'Please enter the partner title' }]}
                        >
                            <Input placeholder="Enter Partner Title" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <Input.TextArea placeholder="Enter Description" rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Link"
                            name="link"
                        >
                            <Input placeholder="Enter Partner Link eg https://www.loveworld.com" />
                        </Form.Item>

                        <Form.Item
                            label="Created Date"
                            name="created_date"
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>

                        <Form.Item label="Logo">
                            <Upload
                                listType="picture"
                                beforeUpload={() => false} // Prevent auto upload
                                onChange={handleUpload}
                            >
                                <Button className='text-white' icon={<UploadOutlined className='text-white' />}>Upload Logo</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AddAdminPartner;
