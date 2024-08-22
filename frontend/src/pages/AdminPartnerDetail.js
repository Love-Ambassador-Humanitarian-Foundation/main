import React, { useState } from 'react';
import { Row, Col, Typography, Input, Upload, Button as AntButton, theme, message, Layout, Breadcrumb } from 'antd';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined, HomeOutlined, EditOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const Partner = ({ item, API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    //const { partnerDetails } = useParams();
    const [editpage, setEditPage] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState('Partner Company');
    const [location, setLocation] = useState('123 Partner St, Partner City');
    const [date, setDate] = useState('January 1st, 2024');
    const [imageUrls, setImageUrls] = useState([]);

    const saveEdit = () => {
        setEditPage(false);
        message.success('Partner details saved successfully');
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

    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            // Assuming the server returns the image URL after upload
            setImageUrls(prevUrls => [...prevUrls, info.file.response.url]);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleRemoveImage = (url) => {
        setImageUrls(prevUrls => prevUrls.filter(imageUrl => imageUrl !== url));
    };

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<div onClick={navigate(`/admin/partners/`)}><TeamOutlined /><span>Partners</span></div>) },
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
                    height: 'calc(100vh - 140px)'
                }}>
                    <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                        <Col xs={24} sm={24} md={16} lg={12} xl={12} style={{ backgroundColor: '#d7d7e9' }}>
                            <div className='d-flex flex-column justify-content-between align-items-center p-2'>
                                <TeamOutlined style={{ fontSize: 100, color: '#FFD700' }} />
                                <Title level={3}>Partner Details</Title>
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
                                    Images: 
                                    {editpage ? (
                                        <Upload
                                            name="image"
                                            action={`${API_URL}/api/upload`} // Update with your actual upload URL
                                            listType="picture"
                                            multiple={true}
                                            showUploadList={false}
                                            onChange={handleImageUpload}
                                        >
                                            <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                                        </Upload>
                                    ) : (
                                        imageUrls.map((url, index) => (
                                            <div key={index} style={{ marginTop: '10px', position: 'relative' }}>
                                                <img src={url} alt="Partner" style={{ maxWidth: '100%' }} />
                                                {editpage && (
                                                    <AntButton
                                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                                        icon={<UploadOutlined />}
                                                        onClick={() => handleRemoveImage(url)}
                                                    />
                                                )}
                                            </div>
                                        ))
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
                                <Button text="Edit Partner" onClick={() => setEditPage(true)} />
                            </Col>
                        )}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Partner;
