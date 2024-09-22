import React, { useState, useEffect} from 'react';
import { Row, Col, Typography, Input, Button, theme, message, Layout, Breadcrumb, Tooltip, Form, DatePicker } from 'antd';
import { SaveOutlined, EditOutlined, HomeOutlined, MailOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';

import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/LoadingSpinner';

const { Text } = Typography;
const { Content } = Layout;

const AdminNewsletterReceipientDetail = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [editNewsletterReceipient, setEditNewsletterReceipient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        joined_at: null,
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [newsletterReceipientResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/newsletter-recipients/${id}`),
                ]);

                const newsletterReceipientData = newsletterReceipientResponse.data.data;
                
                setFormData({
                    ...newsletterReceipientData,
                    joined_at: newsletterReceipientData.joined_at ? dayjs(newsletterReceipientData.joined_at) : null,
                });
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
        setIsLoading(false);
    }, [API_URL, id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            joined_at: date
        }));
    };

    const saveEdit = async () => {
        setLoading(true);
        try {
            await axios.put(`${API_URL}/api/newsletter-recipients/${formData.id}`, 
                {
                    ...formData,
                    joined_at: formData.joined_at ? formData.joined_at.format('YYYY-MM-DD HH:mm:ss') : null,
                });
            setEditNewsletterReceipient(false);
            message.success('Newsletter recipients details saved successfully');
        } catch (error) {
            console.error('Failed to save newsletter recipients details:', error);
            message.error('Failed to save newsletter recipients details');
        } finally {
            setLoading(false);
        }
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
                        { href: '/#/admin/newsletters', title: (<><MailOutlined /><span>Newsletters</span></>) },
                        { href: '/#/admin/newsletters/receipients', title: (<><UserOutlined /><span>Newsletter Receipients</span></>) },
                        { title: (<span>{formData.id}</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <Tooltip title='View User' className='mx-2'>
                        <EyeOutlined
                            onClick={() => navigate(`/admin/users/${formData.id}`)}
                            style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }}
                        />
                    </Tooltip>
                    {!formData.last_login
                    ?
                    <Tooltip title='Edit NewsletterReceipient' className='mx-2'>
                        <EditOutlined
                            onClick={() => setEditNewsletterReceipient(!editNewsletterReceipient)}
                            style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }}
                        />
                    </Tooltip>:null}
                    
                </span>
                
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
                    <Form layout="vertical">
                        {/* <Title level={3}>{formData.title}</Title> */}
                        <Text className='m-4'>{formData.id}</Text>

                        <Form.Item label="Id" className='mt-4'>
                            <Input
                                id="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                disabled={true}
                            />
                        </Form.Item>

                        <Form.Item label="Email">
                            <Input
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!editNewsletterReceipient}
                            />
                        </Form.Item>

                        <Form.Item label="Joined At">
                            <DatePicker
                                id="joined_at"
                                value={formData.joined_at ? dayjs(formData.joined_at) : null}  // Convert to dayjs object if not null
                                onChange={handleDateChange}
                                showTime={true}
                                format="YYYY-MM-DD HH:mm:ss"  // Correct format for displaying date and time
                                disabled={!editNewsletterReceipient}
                            />
                        </Form.Item>

                        

                        {editNewsletterReceipient && (
                            <Row justify="center">
                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={saveEdit}
                                        loading={loading}
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AdminNewsletterReceipientDetail;
