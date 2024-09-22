import React, { useState, useEffect} from 'react';
import { Row, Col, Typography, Input, Button, theme, message, Layout, Breadcrumb, Tooltip, Form, DatePicker } from 'antd';
import { SaveOutlined, EditOutlined, HomeOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';

import {useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/LoadingSpinner';

const { Title, Text } = Typography;
const { Content } = Layout;

const AdminNewsletterDetail = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [editNewsletter, setEditNewsletter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sendloading, setSendLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: "",
        title: '',
        message: '',
        is_sent: true,
        created_at: null,
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [newsletterResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/newsletters/${id}`),
                ]);

                const newsletterData = newsletterResponse.data.data;

                setFormData({
                    id: newsletterData.id || '',
                    title: newsletterData.title || '',
                    message: newsletterData.message || '',
                    is_sent: newsletterData.is_sent || false,
                    created_at: newsletterData.created_at ? dayjs(newsletterData.created_at) : null,
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
            created_at: date
        }));
    };

    const saveEdit = async () => {
        setLoading(true);
        try {
            await axios.put(`${API_URL}/api/newsletters/${formData.id}`, 
                {
                    ...formData,
                    created_at: formData.created_at ? formData.created_at.format('YYYY-MM-DD') : null,
                });
            setEditNewsletter(false);
            message.success('Newsletter details saved successfully');
        } catch (error) {
            console.error('Failed to save newsletter details:', error);
            message.error('Failed to save newsletter details');
        } finally {
            setLoading(false);
        }
    };

    const sendletter = async()=>{
        setSendLoading(true);

        // Execute saveEdit before trying to send the newsletter
        saveEdit(); 
        
        console.log(formData,'---')
        try {
            await axios.post(`${API_URL}/api/send-newsletter`, 
                {
                    newsletter:formData.id? formData.id: id
                });
            message.success('Newsletter sent successfully');
        } catch (error) {
            console.error('Failed to send newsletter :', error);
            message.error('Failed to send newsletter ');
        } finally {
            setSendLoading(false);
        }
        
    }

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
                        { title: (<span>{formData.title}</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    
                    {sendloading ? <div className='spinnersmall'></div> : null}
                    <Tooltip title='Send Newsletter' className='mx-2 text-success'>
                        <SendOutlined onClick={sendletter} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title='Edit Newsletter' className='mx-2'>
                        <EditOutlined
                            onClick={() => setEditNewsletter(!editNewsletter)}
                            style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }}
                        />
                    </Tooltip>
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
                        <Title level={3}>{formData.title}</Title>
                        <Text className='m-4'>{formData.id}</Text>

                        <Form.Item label="Title" className='mt-4'>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                disabled={!editNewsletter}
                            />
                        </Form.Item>

                        <Form.Item label="Message">
                            <Input.TextArea
                                id="message"
                                value={formData.message}
                                rows={7}
                                onChange={handleInputChange}
                                disabled={!editNewsletter}
                            />
                        </Form.Item>

                        <Form.Item label="Created At">
                            <DatePicker
                                id="created_at"
                                value={formData.created_at}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                                disabled={!editNewsletter}
                            />
                        </Form.Item>
                        

                        {editNewsletter && (
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

export default AdminNewsletterDetail;
