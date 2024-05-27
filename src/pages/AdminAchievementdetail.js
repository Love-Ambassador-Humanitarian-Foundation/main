import React, { useState } from 'react';
import { SaveOutlined, TrophyOutlined, UploadOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Input, Upload, Button as AntButton, theme, message } from 'antd';
import { Button } from '../components/button';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../utils/utils';

const { Title, Text } = Typography;

const Achievement = ({ Companyname, isloggedIn }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const { achievementDetails } = useParams();
    console.log(achievementDetails + "==========");
    const [editAchievement, setEditAchievement] = useState(false);

    const [title, setTitle] = useState('Top Fundraiser');
    const [date, setDate] = useState('May 25th, 2023');
    const [description, setDescription] = useState('Achieved top fundraising position in May 2023');
    const [imageUrl, setImageUrl] = useState('');

    const saveEdit = () => {
        setEditAchievement(false);
        message.success('Achievement details saved successfully');
    }

    const handleInputChange = (e) => {
        if (e.target.id === 'title') {
            setTitle(e.target.value);
        } else if (e.target.id === 'date') {
            setDate(e.target.value);
        } else if (e.target.id === 'description') {
            setDescription(e.target.value);
        }
    };

    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            // Assuming the server returns the image URL after upload
            setImageUrl(info.file.response.url);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
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
                        <TrophyOutlined style={{ fontSize: 100, color: '#FFD700' }} />
                        <Title level={3}>Achievement Details</Title>
                    </div>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col xs={24} sm={24} md={16} lg={12} xl={12}>
                    <div className='d-flex flex-column justify-content-left p-2'>
                        <Text strong>
                            Title: <Input id="title" type="text" className="form-control" placeholder="Title" value={title} onChange={handleInputChange} disabled={!editAchievement} />
                        </Text>
                        <Text strong>
                            Date: <Input id="date" type="text" className="form-control" placeholder="Date" value={date} onChange={handleInputChange} disabled={!editAchievement} />
                        </Text>
                        <Text strong>
                            Description: <Input id="description" type="text" className="form-control" placeholder="Description" value={description} onChange={handleInputChange} disabled={!editAchievement} />
                        </Text>
                        <Text strong>
                            Image: 
                            {editAchievement ? (
                                <Upload
                                    name="image"
                                    action={`${backendUrl}/api/v1/upload`} // Update with your actual upload URL
                                    listType="picture"
                                    showUploadList={false}
                                    onChange={handleImageUpload}
                                >
                                    <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                                </Upload>
                            ) : (
                                imageUrl && <img src={imageUrl} alt="Achievement" style={{ maxWidth: '100%', marginTop: '10px' }} />
                            )}
                        </Text>
                    </div>
                </Col>
            </Row>
            <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                {editAchievement ? (
                    <Col>
                        <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                    </Col>
                ) : (
                    <Col>
                        <Button text="Edit Achievement" onClick={() => setEditAchievement(true)} />
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Achievement;
