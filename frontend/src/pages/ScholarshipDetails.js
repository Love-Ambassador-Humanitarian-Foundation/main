import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row,Timeline, Tag, message, Affix, Layout, Typography } from 'antd';
import { CalendarOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
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
                const today = dayjs(); 
                const response = await getScholarshipbyId(API_URL, id, today.format('YYYY-MM-DD HH:mm:ss'));
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
    // Format the event dates
    const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Calculate expiration status and deadline
    const expired = isExpired(scholarship.created_date, scholarship.duration);
    const deadline = getDeadline(scholarship.created_date, scholarship.duration);

    return (
        <Layout id='scholarships'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Header component */}
            <Content style={{ padding: '2px', background: '#fff', marginTop: '70px' }}>
                <div style={{ padding: 8, backgroundColor: '#f0f2f5' }}>
                    {/* Main Layout */}
                    <Row gutter={24}>
                        {/* Scholarship Details */}
                        <Col xs={24} md={16}>
                            <Title level={3} className="text-left">Scholarship - {scholarship.name}</Title>
                            <Card title={scholarship.name} bordered={false}>
                                <div>
                                    Name:
                                    <strong>
                                    {scholarship.name}
                                    </strong>
                                </div>
                                <div
                                    style={{ textAlign: 'justify' }}
                                    className="description-item">Description: <p>{renderTextWithBold(scholarship.description)}</p>
                                </div>
                                <div>
                                    Year:<p>{scholarship.year}</p>
                                </div>
                                <div>
                                    Amount:<p><span className='text-dark'>{scholarship.currency} {scholarship.amount_approved}</span></p>
                                </div>
                                <div>
                                    Duration:<p>{scholarship.duration}</p>
                                </div>
                                <div>
                                    Created Date:<p><span className='text-success'><CalendarOutlined /> {dayjs(scholarship.created_date).format('YYYY-MM-DD')}</span></p>
                                </div>
                                <div>
                                    Deadline:<p>
                                    <span className='text-danger'><CalendarOutlined /> {formatDate(deadline)}</span>
                                    </p>
                                </div>
                                <div>
                                    Status:{expired ? <Tag color="red">Expired</Tag> : <Tag color="green">Ongoing</Tag>}
                                </div>
                                
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
            <Footer Companyname={Companyname} API_URL={API_URL}/> {/* Footer component */}
        </Layout>
    );
};

export default ScholarshipDetail;
