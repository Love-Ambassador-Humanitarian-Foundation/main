import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Input, Button, theme, message, Layout, Breadcrumb, Form } from 'antd';
import { useParams } from 'react-router-dom';
import DateTimeInput from '../components/DateTimeSetter';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { SaveOutlined, HomeOutlined, EditOutlined, EnvironmentOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const AdminBranch = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const { name } = useParams();
    const [editPage, setEditPage] = useState(false);
    const [about, setAbout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    
    useEffect(() => {
        axios.get(`${API_URL}/api/about`)
            .then(response => {
                const fetchedAbout = response.data.data;
                setAbout(fetchedAbout);
                const branch = fetchedAbout.branches.find(branch => branch.name === name);

                if (branch) {
                    form.setFieldsValue({
                        name: branch.name,
                        location: branch.location,
                        date_created: branch.date_created
                    });
                }

                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the branches!", error);
                setIsLoading(false);
                message.error("There was an error fetching the branches!", 5);
            });
    }, [API_URL, name, form]);

    const saveEdit = async (values) => {
        setLoading(true);
        const token = localStorage.getItem('lahf_access_token');

        try {
            const updatedBranches = about.branches.map(branch => 
                branch.name === name 
                ? { ...branch, ...values } 
                : branch
            );

            const response = await axios.patch(`${API_URL}/api/about`, {
                branches: updatedBranches
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setAbout(response.data.data);
            setEditPage(false);
            message.success('Branch details updated successfully!');
        } catch (error) {
            console.error('Error updating branch details:', error);
            message.error('Error updating branch details');
        } finally {
            setLoading(false);
        }
    }

    const handleFinish = (values) => {
        saveEdit(values);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/#/admin/branches' className='text-decoration-none'>
                        <BankOutlined />
                        <span>Branches</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>{form.getFieldValue('name')}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <EditOutlined 
                    style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} 
                    onClick={() => setEditPage(!editPage)} 
                />
            </div>
            <Content className='m-2'>
                <div style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusXS,
                }}>
                    <div className='d-flex flex-column justify-content-between align-items-center p-2'>
                        <EnvironmentOutlined style={{ fontSize: 100, color: '#FFD700' }} />
                        <Title level={3}>{name}</Title>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter the branch name' }]}
                        >
                            <Input placeholder="Name" disabled={!editPage} />
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[{ required: true, message: 'Please enter the branch location' }]}
                        >
                            <Input placeholder="Location" disabled={!editPage} />
                        </Form.Item>
                        <Form.Item
                            label="Date Created"
                            name="date_created"
                            rules={[{ required: true, message: 'Please enter the date created' }]}
                        >
                            <DateTimeInput date={true} disabled={!editPage} />
                        </Form.Item>
                        <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                            {editPage ? (
                                <Col>
                                    <Button type="primary" loading={loading} icon={<SaveOutlined />} htmlType="submit">Save Changes</Button>
                                </Col>
                            ) : null}
                        </Row>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AdminBranch;
