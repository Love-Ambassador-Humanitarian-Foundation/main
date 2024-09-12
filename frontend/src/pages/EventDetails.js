import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Descriptions, Timeline, Tag, message, Layout, Typography, Image } from 'antd';
import { CalendarOutlined, CopyOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getEventbyId } from '../services/api'; // Make sure to implement this function
import LoadingSpinner from '../components/LoadingSpinner';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateLoginStatus } from '../hooks/hooks';
import relativeTime from 'dayjs/plugin/relativeTime';
import durationPlugin from 'dayjs/plugin/duration';

// Extend dayjs with required plugins
dayjs.extend(relativeTime);
dayjs.extend(durationPlugin);

const { Content } = Layout;
const { Title } = Typography;

const EventDetail = ({ API_URL, Companyname }) => {
    const { id } = useParams();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const currentDate = dayjs();  // Use dayjs for current date formatting

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getEventbyId(API_URL, id);
                setEvent(response);
            } catch (error) {
                console.error('Error fetching event details:', error);
                message.error('Error loading event details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventDetails();
    }, [API_URL, id]);

    // Check the event status
    const getStatus = (startDate, endDate) => {
        if (!startDate || !endDate) return 'Unknown';

        const eventStart = dayjs(startDate);
        const eventEnd = dayjs(endDate);

        if (currentDate < eventStart) return 'Not Started';
        if (currentDate > eventStart && currentDate < eventEnd) return 'Ongoing';
        return 'Completed';
    };

    // Get status tag color
    const getStatusTag = (status) => {
        switch (status) {
            case 'Ongoing':
                return <Tag color="green">Ongoing</Tag>;
            case 'Not Started':
                return <Tag color="orange">Not Started</Tag>;
            case 'Completed':
                return <Tag color="red">Completed</Tag>;
            default:
                return <Tag color="grey">Unknown</Tag>;
        }
    };

    // Format the event dates
    const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');

    // Handle copying link
    const handleCopy = () => {
        const currentUrl = window.location.href;

        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                message.success('Link copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
                message.error('Failed to copy link');
            });
    };

    // Render media content based on type
    const renderMedia = (mediaItem, index) => {
        if (!mediaItem) return null;

        if (mediaItem.includes('jpg') || mediaItem.includes('jpeg') || mediaItem.includes('png') || mediaItem.includes('gif')) {
            return <Image className='ms-1' key={index} width={140} height={100} src={mediaItem} alt={`Event media ${index}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />;
        }

        if (mediaItem.includes('mp4') || mediaItem.includes('avi') || mediaItem.includes('webm')|| mediaItem.includes('mov')) {
            return <video className='ms-1' key={index} width={140} height={100} src={mediaItem} controls style={{ maxWidth: '100%' }} />;
        }

        if (mediaItem.includes('mp3') || mediaItem.includes('wav')) {
            return <audio className='ms-1' key={index} src={mediaItem} controls style={{ width: '100%' }} />;
        }

        return <a className='ms-1' key={index} href={mediaItem} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>Link: {mediaItem}</a>;
    };


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!event) {
        return <div>No event found.</div>;
    }

    const status = getStatus(event.start_date, event.end_date);
    const statusTag = getStatusTag(status);

    return (
        <Layout id='event-detail'>
            <HeaderComponent Companyname={Companyname} isLoggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '24px', background: '#fff', marginTop: '60px' }}>
                <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
                    <Row gutter={24}>
                        {/* Event Details */}
                        <Col xs={24} md={16}>
                            <Title level={3} className="text-left">Event - {event.title}</Title>
                            <Card title={event.title} bordered={false}>
                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="Title">{event.title}</Descriptions.Item>
                                    <Descriptions.Item label="Description">{event.description}</Descriptions.Item>
                                    <Descriptions.Item label="Type">{event.eventtype}</Descriptions.Item>
                                    <Descriptions.Item label="Start Date">
                                        <span className='text-success'><CalendarOutlined /> {formatDate(event.start_date)}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="End Date">
                                        <span className='text-danger'><CalendarOutlined /> {formatDate(event.end_date)}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">{statusTag}</Descriptions.Item>
                                </Descriptions>
                            </Card>

                            {/* Media Section */}
                            <Card title='Media' style={{ marginTop: '16px' }}>
                                {event.media && event.media.images.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '400px' }}>
                                        {event.media.images.map(renderMedia)}
                                    </div>
                                ) : (
                                    <Tag color="gray">No Media</Tag>
                                )}
                            </Card>
                            {/* Media Section */}
                            <Card title='Video' style={{ marginTop: '16px' }}>
                                {event.media && event.media.videos.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto',  maxHeight: '400px' }}>
                                        {event.media.videos.map(renderMedia)}
                                    </div>
                                ) : (
                                    <Tag color="gray">No Media</Tag>
                                )}
                            </Card>

                            {/* Timeline Section */}
                            <Card title="Timeline" style={{ marginTop: '16px' }}>
                                <Timeline>
                                    <Timeline.Item>Event Start: <span className='text-success'>{formatDate(event.start_date)}</span></Timeline.Item>
                                    <Timeline.Item>Event End: <span className='text-danger'>{formatDate(event.end_date)}</span></Timeline.Item>
                                </Timeline>
                            </Card>
                        </Col>

                        {/* Sidebar: Actions */}
                        <Col xs={24} md={8}>
                            <Card bordered={false}>
                                <Button type="dashed" icon={<CopyOutlined />} style={{ width: '100%', marginTop: '10px' }} onClick={handleCopy}>
                                    Copy Link
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL}  />
        </Layout>
    );
};

export default EventDetail;
