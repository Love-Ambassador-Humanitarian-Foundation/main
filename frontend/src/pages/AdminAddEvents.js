import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, Select, DatePicker, message, Upload, List } from 'antd';
import { HomeOutlined, CalendarOutlined, SaveOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { eventTypes } from '../utils/helper';
import axios from 'axios';

const { Content } = Layout;
const { Option } = Select;
const { Dragger } = Upload;

const AddAdminEvent = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventtype: '',
        participants: [],
        start_date: currentDate + ' 00:00:00',
        end_date: currentDate + ' 23:59:59',
        media: {
            images: [],
            videos: []
        },
    });

    const onFinish = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/events`, formData);
            message.success('Event added successfully!');
            navigate('/admin/events');
        } catch (error) {
            console.error('Error adding the event:', error.response?.data || error.message);
            message.error('Failed to add event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (name, date, dateString) => {
        if (date) {
            setFormData(prevData => ({
                ...prevData,
                [name]: dateString,
            }));
        }
    };

    const handleFileChange = (info, type) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();
            reader.onload = () => {
                const fileBase64 = reader.result;
                setFormData(prevData => ({
                    ...prevData,
                    media: {
                        ...prevData.media,
                        [type]: [...prevData.media[type], fileBase64]
                    }
                }));
            };
            reader.readAsDataURL(info.file.originFileObj);
        } else if (info.file.status === 'error') {
            message.error('File upload failed.');
        }
    };

    const removeFile = (file, type) => {
        setFormData(prevData => ({
            ...prevData,
            media: {
                ...prevData.media,
                [type]: prevData.media[type].filter(f => f !== file)
            }
        }));
    };

    const uploadProps = (type) => ({
        customRequest: ({ file, onSuccess, onError }) => {
            try {
                handleFileChange({ file: { ...file, status: 'done', originFileObj: file } }, type);
                onSuccess();
            } catch (err) {
                onError(err);
            }
        },
        onChange(info) {
            handleFileChange(info, type);
        },
    });

    const renderMediaList = (type) => (
        <List
            bordered
            dataSource={formData.media[type]}
            renderItem={(item, index) => (
                <List.Item
                    actions={[<Button onClick={() => removeFile(item, type)} type="link">Remove</Button>]}
                >
                    <img src={item} alt={`media-${type}-${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </List.Item>
            )}
        />
    );

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/events', title: (<><CalendarOutlined /><span style={{ textDecoration: 'none' }}>Events</span></>) },
                        { title: 'Add Event' },
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
                            label="Event Title"
                            name="title"
                            rules={[{ required: true, message: 'Please enter the event title' }]}
                        >
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter Event Title"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please enter the description' }]}
                        >
                            <Input.TextArea
                                name="description"
                                value={formData.description}
                                rows={7}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Event Type"
                            name="eventtype"
                            rules={[{ required: true, message: 'Please select the event type' }]}
                        >
                            <Select
                                name="eventtype"
                                value={formData.eventtype}
                                onChange={(value) => setFormData(prevData => ({ ...prevData, eventtype: value }))}
                            >
                                {eventTypes.map(eventType => (
                                    <Option key={eventType.value} value={eventType.value}>
                                        {eventType.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Start Date"
                            name="start_date"
                            rules={[{ required: true, message: 'Please select the start date and time' }]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={dayjs(formData.start_date)}
                                onChange={(date, dateString) => handleDateChange('start_date', date, dateString)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="End Date"
                            name="end_date"
                            rules={[{ required: true, message: 'Please select the end date and time' }]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={dayjs(formData.end_date)}
                                onChange={(date, dateString) => handleDateChange('end_date', date, dateString)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Images"
                            name="images"
                        >
                            <Dragger {...uploadProps('images')} multiple>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: '#34356b' }} />
                                </p>
                                <p className="ant-upload-text">Click or drag images to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Dragger>
                            {renderMediaList('images')}
                        </Form.Item>

                        <Form.Item
                            label="Videos"
                            name="videos"
                        >
                            <Dragger {...uploadProps('videos')} multiple>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: '#34356b' }} />
                                </p>
                                <p className="ant-upload-text">Click or drag videos to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Dragger>
                            {renderMediaList('videos')}
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                icon={<SaveOutlined  />}
                            >
                                Add Event
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AddAdminEvent;
