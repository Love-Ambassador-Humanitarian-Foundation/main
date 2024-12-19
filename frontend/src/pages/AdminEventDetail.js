import React, { useEffect, useState, useCallback } from 'react';
import {
    HomeOutlined,
    EditOutlined,
    SaveOutlined,
    FilePdfOutlined,
    UserOutlined,
    CalendarOutlined,
    EyeOutlined
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import {
    Row, Col, Typography, Input, Button, message,
    Breadcrumb, Layout, Form, DatePicker, Tooltip, Checkbox, Upload, Modal, List,
    Image, Select
} from 'antd';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import dayjs from 'dayjs';
import { eventTypes } from '../utils/helper';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash'; // lodash for debounce
import { getEventbyId, updateEventbyId } from '../services/api';

const { Title, Text } = Typography;
const { Content } = Layout;
const { Dragger } = Upload;
const {Option} = Select;

const AdminEvent = ({ API_URL }) => {
    const { id } = useParams();
    const [editEvent, setEditEvent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [mediaModalVisible, setMediaModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        eventtype: '',
        participants: [],
        start_date: null,
        end_date: null,
        media: {
            images: [],
            videos: []
        },
        ongoing: false,
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const data = await getEventbyId(API_URL, id);

                setFormData({
                    id: data.id || '',
                    title: data.title || '',
                    description: data.description || '',
                    eventtype: data.eventtype || '',
                    participants: data.participants || [],
                    start_date: data.start_date ? data.start_date : null,
                    end_date: data.end_date ? data.end_date : null,
                    media: data.media || { images: [], videos: [] },
                    ongoing: data.ongoing || false,
                });
            } catch (error) {
                console.error('Error fetching event details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventDetails();
    }, [API_URL, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (name, date, dateString) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: date ? dayjs(dateString) : null,
        }));
    };

    const saveEdit = async () => {
        setLoading(true);
        try {
            await updateEventbyId(API_URL, id,{
                ...formData,
                start_date: formData.start_date ? formData.start_date.format("YYYY-MM-DD HH:mm:ss") : null,
                end_date: formData.end_date ? formData.end_date.format("YYYY-MM-DD HH:mm:ss") : null,
            })
            message.success('Event details updated');
            setEditEvent(false);
        } catch (error) {
            console.error('Error updating event details:', error);
            message.error('Error updating event details');
        } finally {
            setLoading(false);
        }
    };

    const generatePdf = async () => {
        setPdfLoading(true);
        try {
            const doc = new jsPDF();
            const logoWidth = 34;
            const logoHeight = 30;
            const companyNameFontSize = 17;
            const titleFontSize = 14;

            doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);
            doc.setFontSize(companyNameFontSize);
            doc.setFont('Helvetica', 'bold');
            doc.text('LOVE AMBASSADORS HUMANITARIAN', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            doc.text('FOUNDATION (LAHF)', doc.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
            doc.setFont('Arial', 'normal');
            doc.setFontSize(titleFontSize);
            doc.text('Event Details', doc.internal.pageSize.getWidth() / 2, 38, { align: 'center' });
            doc.text(`Title: ${formData.title}`, 20, 60);
            doc.text(`Type: ${formData.eventtype}`, 20, 70);
            doc.text(`Description: ${formData.description}`, 20, 80);
            doc.text(`Participants: ${formData.participants.length}`, 20, 90);
            doc.text(`Start Date: ${formData.start_date ? formData.start_date : ''}`, 20, 100);
            doc.text(`End Date: ${formData.end_date ? formData.end_date : ''}`, 20, 110);
            doc.text(`Ongoing: ${formData.ongoing ? 'Yes' : 'No'}`, 20, 120);
            doc.save(`event_${formData.title}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setPdfLoading(false);
        }
    };

    const handleMediaUpload = useCallback(async (info, type) => {
        if (info.file.status === 'done') {
            const url = info.file.response.url;
            setFormData(prevData => {
                const newMedia = {
                    ...prevData.media,
                    [type]: _.uniq([...prevData.media[type], url])
                };
                return { ...prevData, media: newMedia };
            });
            message.success(`${type === 'images' ? 'Image' : 'Video'} uploaded successfully.`);
        } else if (info.file.status === 'error') {
            message.error(`${type === 'images' ? 'Image' : 'Video'} upload failed.`);
        }
    }, []);

    const handleMediaDelete = async (url, type) => {
        try {
            await axios.put(`${API_URL}/api/events/${id}`, {
                ...formData,
                media: {
                    ...formData.media,
                    [type]: formData.media[type].filter(mediaUrl => mediaUrl !== url)
                }
            });
            setFormData(prevData => ({
                ...prevData,
                media: {
                    ...prevData.media,
                    [type]: prevData.media[type].filter(mediaUrl => mediaUrl !== url)
                }
            }));
            message.success(`${type === 'images' ? 'Image' : 'Video'} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting media:', error.response?.data || error);
            message.error('Error deleting media.');
        }
    };
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
    const customRequestHandler = async ({ file, onSuccess, onError }, type) => {
        const formData = new FormData();
        formData.append('file', file);
        try { 
            const base64 = await fileToBase64(file);
            handleMediaUpload({ file: { status: 'done', response: {url:base64}} }, type);
            onSuccess();
        } catch (error) {
            handleMediaUpload({ file: { status: 'error' } }, type);
            onError(error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/events', title: (<><CalendarOutlined /><span style={{ textDecoration: 'none' }}>Events</span></>) },
                        { title: (<span>{formData.title}</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <Tooltip title="View Participants">
                        <Link to={`/admin/events/${formData.id}/participants`} state={{event:formData}} style={{ textDecoration: 'none' }}>
                            <UserOutlined className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                        </Link>
                    </Tooltip>

                    {pdfLoading && <div className='spinnersmall'></div>}
                    <Tooltip title='Generate PDF'>
                        <FilePdfOutlined onClick={generatePdf} className='mx-2 text-danger' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title='Edit Event'>
                        <EditOutlined onClick={() => setEditEvent(!editEvent)} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                </span>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                    }}
                >
                    <Form layout="vertical">
                        <Title level={3}>{formData.title}</Title>
                        <Text className='m-4'>{formData.id}</Text>
                        <Form.Item label="Event Title" className='mt-4' rules={[{ required: true, message: 'Please enter the event title' }]}>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                disabled={!editEvent}
                            />
                        </Form.Item>
                        <Form.Item label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
                            <Input.TextArea
                                name="description"
                                value={formData.description}
                                rows={7}
                                onChange={handleInputChange}
                                disabled={!editEvent}
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
                        <Form.Item label="Start Date" rules={[{ required: true, message: 'Please select the start date and time' }]}>
                            <DatePicker
                                name="start_date"
                                value={dayjs(formData.start_date)}
                                onChange={(date, dateString) => handleDateChange('start_date', date, dateString)}
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime
                                disabled={!editEvent}
                            />
                        </Form.Item>
                        <Form.Item label="End Date" rules={[{ required: true, message: 'Please select the end date and time' }]}>
                            <DatePicker
                                name="end_date"
                                value={dayjs(formData.end_date)}
                                onChange={(date, dateString) => handleDateChange('end_date', date, dateString)}
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime
                                disabled={!editEvent}
                            />
                        </Form.Item>
                        <Form.Item label="Participants">
                            <Text>{formData.participants.length} participants 
                                <Tooltip title="View Participants">
                                    <Link to={`/admin/events/${formData.id}/participants`} style={{ textDecoration: 'none' }}>
                                        <EyeOutlined className='mx-2' style={{ fontSize: '20px', color: '#34356b', cursor: 'pointer' }} />
                                    </Link>
                                </Tooltip>
                            </Text>
                        </Form.Item>
                        <Form.Item label="Ongoing">
                            <Checkbox
                                checked={formData.ongoing}
                                disabled
                            >
                                {formData.ongoing ? <span className='text-success'>Ongoing</span> : <span className='text-danger'>Not Ongoing</span>}
                            </Checkbox>
                        </Form.Item>

                        {/* Media Section */}
                        <Form.Item label="Media">
                            <div>
                                <Title level={5} className='mt-2'>Images</Title>
                                <div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {formData.media.images.length > 0 ? (
                                        formData.media.images.map((img, index) => (
                                            <div key={index} style={{ position: 'relative', margin: '5px' }}>
                                                <Image
                                                    src={img}
                                                    alt={`image-${index}`}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                {editEvent && (
                                                    <DeleteOutlined className='text-danger'
                                                        onClick={() => handleMediaDelete(img, 'images')}
                                                        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                                                    />
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <Text>No images available</Text>
                                    )}
                                    </div>
                                    {editEvent && (
                                        <Dragger
                                            name="file"
                                            multiple={false}
                                            showUploadList={false}
                                            customRequest={(options) => customRequestHandler(options, 'images')}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <UploadOutlined />
                                            </p>
                                            <p className="ant-upload-text">Click or drag image to upload</p>
                                        </Dragger>
                                    )}
                                </div>
                                <Title level={5} className='mt-4'>Videos</Title>
                                <div>
                                    {formData.media.videos.length > 0 ? (
                                        formData.media.videos.map((video, index) => (
                                            <div key={index} style={{ position: 'relative', margin: '5px' }}>
                                                <video
                                                    src={video}
                                                    controls
                                                    style={{ width: '200px', height: '150px' }}
                                                />
                                                {editEvent && (
                                                    <DeleteOutlined className='text-danger'
                                                        onClick={() => handleMediaDelete(video, 'videos')}
                                                        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                                                    />
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <Text>No videos available</Text>
                                    )}
                                    {editEvent && (
                                        <Dragger
                                            name="file"
                                            multiple={false}
                                            showUploadList={false}
                                            customRequest={(options) => customRequestHandler(options, 'videos')}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <UploadOutlined />
                                            </p>
                                            <p className="ant-upload-text">Click or drag video to upload</p>
                                        </Dragger>
                                    )}
                                </div>
                            </div>
                        </Form.Item>

                        {editEvent && (
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

            {/* Media Modal for Viewing */}
            <Modal
                visible={mediaModalVisible}
                title="Media"
                onCancel={() => setMediaModalVisible(false)}
                footer={null}
                width={800}
            >
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={formData.media.images.concat(formData.media.videos)}
                    renderItem={item => (
                        <List.Item>
                            {item.endsWith('.mp4') || item.endsWith('.avi') ? (
                                <video src={item} controls style={{ width: '100%' }} />
                            ) : (
                                <Image src={item} alt={item} style={{ width: '100%' }} />
                            )}
                        </List.Item>
                    )}
                />
            </Modal>
        </Layout>
    );
};

export default AdminEvent;
