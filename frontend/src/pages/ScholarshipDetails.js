import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Descriptions, Timeline, Tag, message, Affix, Layout, Typography } from 'antd';
import { DollarOutlined, CalendarOutlined, ShareAltOutlined, HeartOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getScholarshipbyId } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import relativeTime from 'dayjs/plugin/relativeTime';
import durationPlugin from 'dayjs/plugin/duration';
import { parseDuration } from '../utils/helper'; // A utility function to parse duration
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateLoginStatus } from '../hooks/hooks';

// Extend dayjs with required plugins
dayjs.extend(relativeTime);
dayjs.extend(durationPlugin);

const { Content } = Layout;
const { Title } = Typography;

const ScholarshipDetail = ({ API_URL, Companyname }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [scholarship, setScholarship] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const currentDate = dayjs();  // Use dayjs for current date formatting

    const handleApplyNow = () => {
        message.success('Redirecting to application page...');
        navigate(`/scholarships/${id}/apply`, {state:{scholarship:scholarship}});
    };

    // Check if the scholarship is expired based on created_date and duration
    const isExpired = (createdDate, duration) => {
        if (!createdDate || !duration) return false;

        const [amount, unit] = parseDuration(duration);  // Custom utility to parse "1 year", "6 months", etc.
        if (!amount || !unit) return false;

        const expirationDate = dayjs(createdDate).add(amount, unit);
        return currentDate.isAfter(expirationDate);  // Check if current date is after expiration date
    };

    // Calculate deadline for display
    const getDeadline = (createdDate, duration) => {
        if (!createdDate || !duration) return 'Unknown';

        const [amount, unit] = parseDuration(duration);  // Custom utility to parse "1 year", "6 months", etc.
        if (!amount || !unit) return 'Unknown';

        const expirationDate = dayjs(createdDate).add(amount, unit);
        return expirationDate.format('YYYY-MM-DD');
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getScholarshipbyId(API_URL, id, currentDate);
                setScholarship(response);
            } catch (error) {
                console.error('Error fetching scholarship details:', error);
                message.error('Error loading scholarship details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, id]);

    const handleCopy = () => {
        // Get the current URL
        const currentUrl = window.location.href;
    
        // Copy the URL to clipboard
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                message.success('Link copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
                message.error('Failed to copy link');
            });
    };
    

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Calculate expiration status and deadline
    const expired = isExpired(scholarship.created_date, scholarship.duration);
    const deadline = getDeadline(scholarship.created_date, scholarship.duration);

    return (
        <Layout id='scholarships'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Header component */}
            <Content style={{ padding: '24px', background: '#fff', marginTop: '60px' }}>
                <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
                    {/* Main Layout */}
                    <Row gutter={24}>
                        {/* Scholarship Details */}
                        <Col xs={24} md={16}>
                            <Title level={3} className="text-left">Scholarship - {scholarship.name}</Title>
                            <Card title={scholarship.name} bordered={false}>
                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="Name">{scholarship.name}</Descriptions.Item>
                                    <Descriptions.Item label="Description">{scholarship.description}</Descriptions.Item>
                                    <Descriptions.Item label="Year">{scholarship.year}</Descriptions.Item>
                                    <Descriptions.Item label="Amount">
                                        <span className='text-dark'>{scholarship.currency} {scholarship.amount_approved}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Duration">{scholarship.duration}</Descriptions.Item>
                                    <Descriptions.Item label="Created Date">
                                        <span className='text-success'><CalendarOutlined /> {dayjs(scholarship.created_date).format('YYYY-MM-DD')}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Deadline">
                                        <span className='text-danger'><CalendarOutlined /> {deadline}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                        {expired ? <Tag color="red">Expired</Tag> : <Tag color="green">Ongoing</Tag>}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            {/* Application Process Section */}
                            <Card title="Application Process" style={{ marginTop: '16px' }}>
                                <p>Click on the apply button and fill the form.</p>
                            </Card>

                            {/* Timeline Section */}
                            <Card title="Timeline" style={{ marginTop: '16px' }}>
                                <Timeline>
                                    <Timeline.Item>Application Open: <span className='text-success'>{scholarship.created_date}</span></Timeline.Item>
                                    <Timeline.Item>Deadline: <span className='text-danger'>{deadline}</span></Timeline.Item>
                                </Timeline>
                            </Card>
                        </Col>

                        {/* Sidebar: Actions */}
                        <Col xs={24} md={8}>
                            {/* Save and Share Buttons */}
                            <Card bordered={false}>
                                <Button type="dashed" icon={<CopyOutlined />} style={{ width: '100%', marginTop: '10px' }} onClick={handleCopy}>
                                    Copy Link
                                </Button>
                            </Card>
                        </Col>
                    </Row>

                    {/* Floating "Apply Now" Button */}
                    <Affix offsetBottom={20} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                        <Button type="primary" onClick={handleApplyNow} icon={<PlusOutlined />} className='pulse-animation' >
                            Apply Now
                        </Button>
                    </Affix>
                </div>
            </Content>
            <Footer Companyname={Companyname} /> {/* Footer component */}
        </Layout>
    );
};

export default ScholarshipDetail;
