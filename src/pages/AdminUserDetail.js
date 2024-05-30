import React, { useState } from 'react';
import { Row, Col, Typography, Input, Upload, Button as AntButton, theme, message, Layout, Breadcrumb, Avatar } from 'antd';
import { Button } from '../components/button';
//import { useParams } from 'react-router-dom';
import { backendUrl } from '../utils/utils';
import { SaveOutlined, HomeOutlined, EditOutlined, UserOutlined, UploadOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;
const { Content } = Layout;

const User = ({ item }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    //const { userDetails } = useParams();
    const navigate = useNavigate();
    const [editpage, setEditPage] = useState(false);

    const [name, setName] = useState('User Name');
    const [location, setLocation] = useState('123 User St, User City');
    const [date, setDate] = useState('March 15th, 2024');
    const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?img=1');

    const [email, setEmail] = useState('john@email.com');
    const [phonenumber, setPhonenumber] = useState('08012345678');
    const [address, setAddress] = useState('Lagos state');
    const [phonenumberpre, setPhonenumberpre] = useState('+234');
    const [facebook, setFacebook] = useState('facebook.com/john');
    const [instagram, setInstagram] = useState('instagram.com/john');
    const [twitter, setTwitter] = useState('twitter.com/john');
    const [linkedIn, setLinkedIn] = useState('linkedin.com/in/john');
    const [whatsapp, setWhatsapp] = useState('whatsapp.com/john');

    const saveEdit = () => {
        setEditPage(false);
        message.success('User details saved successfully');
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'name':
                setName(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'date':
                setDate(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phonenumber':
                setPhonenumber(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'phonenumberpre':
                setPhonenumberpre(value);
                break;
            case 'facebook':
                setFacebook(value);
                break;
            case 'instagram':
                setInstagram(value);
                break;
            case 'twitter':
                setTwitter(value);
                break;
            case 'linkedin':
                setLinkedIn(value);
                break;
            case 'whatsapp':
                setWhatsapp(value);
                break;
            default:
                break;
        }
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            setAvatarUrl(info.file.response.url); // Adjust this based on your server response
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate('/admin/profiles')}>
                        <UserOutlined />
                        <span>Users</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>{name}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setEditPage(!editpage)} />
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
                                <Avatar src={avatarUrl} style={{ fontSize: 300, color: '#FFD700' }} size={100} />
                                <Title level={3}>User Details</Title>
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
                                    Email: <Input id="email" type="text" className="form-control" placeholder="Email" value={email} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Phone Number: <Input id="phonenumber" type="text" className="form-control" placeholder="Phone Number" value={phonenumber} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Address: <Input id="address" type="text" className="form-control" placeholder="Address" value={address} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Phone Number Prefix: <Input id="phonenumberpre" type="text" className="form-control" placeholder="Phone Number Prefix" value={phonenumberpre} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Facebook: <Input id="facebook" type="text" className="form-control" placeholder="Facebook" value={facebook} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Instagram: <Input id="instagram" type="text" className="form-control" placeholder="Instagram" value={instagram} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Twitter: <Input id="twitter" type="text" className="form-control" placeholder="Twitter" value={twitter} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    LinkedIn: <Input id="linkedin" type="text" className="form-control" placeholder="LinkedIn" value={linkedIn} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    WhatsApp: <Input id="whatsapp" type="text" className="form-control" placeholder="WhatsApp" value={whatsapp} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Avatar: 
                                    {editpage ? (
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
                                        avatarUrl && <Avatar src={avatarUrl} alt="User Avatar" size={64} style={{ marginTop: '10px' }} />
                                    )}
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editpage ? (
                            <Col>
                                <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                            </Col>
                        ) : (
                            <Col>
                                <Button text="Edit User" onClick={() => setEditPage(true)} />
                            </Col>
                        )}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default User;
