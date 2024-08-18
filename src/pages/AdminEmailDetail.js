import React, { useState } from 'react';
import { Row, Col, Typography, Input, Upload, Button as AntButton, theme, message, Layout, Breadcrumb, Avatar } from 'antd';
import { SaveOutlined, MailOutlined, UploadOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../utils/utils';

const { Title, Text } = Typography;
const { Content } = Layout;

const AdminEmailDetail = () => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [editPage, setEditPage] = useState(false);
    const navigate = useNavigate();
    const [subject, setSubject] = useState('Email Subject');
    const [body, setBody] = useState('This is the body of the email...');
    const [date, setDate] = useState('February 20th, 2024');
    const [avatarUrl, setAvatarUrl] = useState('');

    const saveEdit = () => {
        setEditPage(false);
        message.success('Email details saved successfully');
    };

    const handleInputChange = (e) => {
        if (e.target.id === 'subject') {
            setSubject(e.target.value);
        } else if (e.target.id === 'body') {
            setBody(e.target.value);
        } else if (e.target.id === 'date') {
            setDate(e.target.value);
        }
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            setAvatarUrl(info.file.response.url);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<div onClick={() => navigate(`/admin/emails/`)}><MailOutlined /><span>Emails</span></div>) },
                        { title: (<><span>{subject}</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setEditPage(!editPage)} />
            </div>
            <Content className='m-2'>
                <div style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusXS,
                    height: 'calc(100vh - 140px)'
                }}>
                    <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                        <Col xs={24} sm={24} md={16} lg={12} xl={12} style={{ backgroundColor: '#d7d7e9' }}>
                            <div className='d-flex flex-column justify-content-between align-items-center p-2'>
                                <MailOutlined style={{ fontSize: 100, color: '#FFD700' }} />
                                <Title level={3}>Email Details</Title>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col xs={24} sm={24} md={16} lg={12} xl={12}>
                            <div className='d-flex flex-column justify-content-left p-2'>
                                <Text strong>
                                    Subject: <Input id="subject" type="text" className="form-control" placeholder="Subject" value={subject} onChange={handleInputChange} disabled={!editPage} />
                                </Text>
                                <Text strong>
                                    Body: <Input.TextArea id="body" className="form-control" placeholder="Body" value={body} onChange={handleInputChange} rows={4} disabled={!editPage} />
                                </Text>
                                <Text strong>
                                    Date: <Input id="date" type="text" className="form-control" placeholder="Date" value={date} onChange={handleInputChange} disabled={!editPage} />
                                </Text>
                                <Text strong>
                                    Avatar: 
                                    {editPage ? (
                                        <Upload
                                            name="avatar"
                                            action={`${backendUrl}/api/v1/upload`} // Update with your actual upload URL
                                            listType="picture"
                                            showUploadList={false}
                                            onChange={handleAvatarUpload}
                                        >
                                            <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                                        </Upload>
                                    ) : (
                                        avatarUrl && <Avatar src={avatarUrl} alt="Email Avatar" size={64} style={{ marginTop: '10px' }} />
                                    )}
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editPage ? (
                            <Col>
                                <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                            </Col>
                        ) : (
                            <Col>
                                <Button text="Edit Email" onClick={() => setEditPage(true)} />
                            </Col>
                        )}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default AdminEmailDetail;
