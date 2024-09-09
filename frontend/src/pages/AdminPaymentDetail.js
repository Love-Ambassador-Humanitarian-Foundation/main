import React, { useState } from 'react';
import { Row, Col, Typography, Input, Upload, Button as AntButton, theme, message, Layout, Breadcrumb, Avatar } from 'antd';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined, HomeOutlined, EditOutlined, DollarOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const AdminPayment = ({ item, API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    //const { paymentDetails } = useParams();
    const [editpage, setEditPage] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState('Payment Method');
    const [location, setLocation] = useState('123 Payment St, Payment City');
    const [date, setDate] = useState('February 20th, 2024');
    const [avatarUrl, setAvatarUrl] = useState('');

    const saveEdit = () => {
        setEditPage(false);
        message.success('Payment details saved successfully');
    };

    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'location') {
            setLocation(e.target.value);
        } else if (e.target.id === 'date') {
            setDate(e.target.value);
        }
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            // Assuming the server returns the avatar URL after upload
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
                        { title: (<div onClick={navigate(`/admin/events/`)}><DollarOutlined /><span>Payments</span></div>) },
                        { title: (<><span>{name}</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setEditPage(!editpage)} />
            </div>
            <Content className='m-2'>
                <div style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusXS,
                }}>
                    <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                        <Col xs={24} sm={24} md={16} lg={12} xl={12} style={{ backgroundColor: '#d7d7e9' }}>
                            <div className='d-flex flex-column justify-content-between align-items-center p-2'>
                                <DollarOutlined style={{ fontSize: 100, color: '#FFD700' }} />
                                <Title level={3}>Payment Details</Title>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col xs={24} sm={24} md={16} lg={12} xl={12}>
                            <div className='d-flex flex-column justify-content-left p-2'>
                                <Text strong>
                                    Name: <Input id="name" type="text" className="form-control" placeholder="Name" value={name} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Location: <Input id="location" type="text" className="form-control" placeholder="Location" value={location} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Date: <Input id="date" type="text" className="form-control" placeholder="Date" value={date} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Avatar: 
                                    {editpage ? (
                                        <Upload
                                            name="avatar"
                                            action={`${API_URL}/api/upload`} // Update with your actual upload URL
                                            listType="picture"
                                            showUploadList={false}
                                            onChange={handleAvatarUpload}
                                        >
                                            <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                                        </Upload>
                                    ) : (
                                        avatarUrl && <Avatar src={avatarUrl} alt="Payment Avatar" size={64} style={{ marginTop: '10px' }} />
                                    )}
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editpage ? (
                            <Col>
                                <Button text="Save Changes" icon={<SaveOutlined />} onClick={saveEdit} />
                            </Col>
                        ) : (
                            <Col>
                                <Button text="Edit Payment" onClick={() => setEditPage(true)} />
                            </Col>
                        )}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default AdminPayment;
