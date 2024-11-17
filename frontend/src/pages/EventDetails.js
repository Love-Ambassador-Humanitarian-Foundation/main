import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row,Timeline, Tag, message, Layout, Typography, Modal } from 'antd';
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
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility
    const [selectedVideo, setSelectedVideo] = useState(null); // Selected video for the modal
    const [imgmodalVisible, setImgModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
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
        if (mediaItem.startsWith('data:video/mp4') || mediaItem.startsWith('data:video/avi') || mediaItem.startsWith('data:video/webm')|| mediaItem.startsWith('data:video/mov')) {
            return (
                <div
                    key={index}
                    className='ms-1'
                    onClick={() => {
                        setSelectedVideo(mediaItem); // Set the selected video
                        setModalVisible(true); // Open the modal
                    }}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                    <video
                        width={140}
                        height={100}
                        src={mediaItem}
                        controls={false}
                        style={{ maxWidth: '140px', maxHeight: '140px' }}
                    />
                </div>
            );
        }
        if (mediaItem.startsWith('data:image/jpg') || mediaItem.startsWith('data:image/jpeg') || mediaItem.startsWith('data:image/png') || mediaItem.startsWith('data:image/gif')) {
            return <div
                key={index}
                className='ms-1'
                onClick={() => {
                    setSelectedImage(mediaItem); // Set the selected video
                    setImgModalVisible(true); // Open the modal
                }}
                style={{ cursor: 'pointer', display: 'inline-block' }}
            >
                <img width={130} height={100} src={mediaItem} alt={`Event media ${index}`} style={{ maxWidth: '140px', maxHeight: '140px' }}/>
            </div>
            ;
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
    const renderTextWithBold = (text) => {
        // Split text based on asterisks
        const parts = text.split('**');
    
        return parts.map((part, index) => {
          // If the part is at an odd index, it was inside an asterisk and should be bold
          if (index % 2 !== 0) {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
      };
    return (
        <Layout id='event-detail'>
            <HeaderComponent Companyname={Companyname} isLoggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '2px', background: '#fff', marginTop: '70px' }}>
                <div style={{ padding: 8, backgroundColor: '#f0f2f5' }}>
                    <Row gutter={24}>
                        {/* Event Details */}
                        <Col xs={24} md={16}>
                            
                            <Card title={<Title level={4} className="text-left">{event.title}</Title>} bordered={false}>
                                <div>
                                    Title:
                                    <strong>
                                    {event.title}
                                    </strong>
                                </div>
                                <div>Event Type:<Tag color="orange">{event.eventtype}</Tag><p></p></div>
                                <div
                                    style={{ textAlign: 'justify' }}
                                    className="description-item">Description: <p>{renderTextWithBold(event.description)}</p>
                                </div>
                                <div>
                                    Start Date:<p>
                                    <span className='text-success'><CalendarOutlined /> {formatDate(event.start_date)}</span>
                                    </p>
                                </div>
                                <div>
                                    End Date: <p>
                                    <span className='text-danger'><CalendarOutlined /> {formatDate(event.end_date)}</span>
                                    </p>
                                </div>
                                <div>
                                    Status:{statusTag}
                                </div>
                                
                                
                            </Card>

                            {/* Media Section */}
                            <Card title='Media' style={{ marginTop: '16px' }}>
                                {event.media && event.media.images.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '400px', maxWidth:'100%' }}>
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

            {/* Video Modal */}
            <Modal
                title=" "
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
                centered
            >
                {selectedVideo && (
                    <video src={selectedVideo} controls style={{ width: '100%' }} />
                )}
            </Modal>
            {/* Image Modal */}
            <Modal
                title=" "
                visible={imgmodalVisible}
                footer={null}
                onCancel={() => setImgModalVisible(false)}
                centered
            >
                {selectedImage && (
                    <img src={selectedImage}  style={{ width: '100%' }} alt='preview'  />
                )}
            </Modal>
        </Layout>
    );
};

export default EventDetail;
