import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Card, Button, Layout, message, Radio } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useUpdateLoginStatus } from '../hooks/hooks';
import { getEvents } from '../services/api';  // Assuming you have a similar API service for events
import LoadingSpinner from '../components/LoadingSpinner';
import FilterComponent from '../components/Filter';

const { Content } = Layout;

const EventPage = ({ Companyname, API_URL }) => {
    const navigate = useNavigate();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Fetch events from the API
    const fetchEvents = useCallback(async () => {
        try {
            const fetchedEvents = await getEvents(API_URL);
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);
        } catch (error) {
            console.error("Error fetching events", error);
            message.error("There was an error fetching the events!", 5);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Filter events based on search criteria
    const filterEvents = useCallback(({ itemName, dateRange }) => {
        let filtered = events;

        if (itemName) {
            const searchTerm = itemName.toLowerCase();
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toString().includes(searchTerm) ||
                event.eventtype.toLowerCase().includes(searchTerm) ||
                event.currency.toLowerCase().includes(searchTerm) ||
                event.duration.toLowerCase().includes(searchTerm)
            );
        }
        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(event => {
                const eventstartDate = new Date(event.start_date);
                const eventendDate = new Date(event.end_date);
                return (eventstartDate >= startDate && eventstartDate <= endDate) || (eventendDate >= startDate && eventendDate <= endDate);
            });

        }
        setFilteredEvents(filtered);
    }, [events]);
    

    // Render events in grid layout
    const renderGridLayout = () => (
        <Row gutter={[16, 16]}>
            {filteredEvents.map(event => (
                <Col xs={24} sm={12} md={8} lg={6} key={event.id}>
                    <Card
                        title={event.title}
                        hoverable
                        // Add click handler if you have event details page
                        onClick={() => handleRowClick(event)}
                    >
                        <p>{event.eventtype}</p>
                        <p>{event.description}</p>
                        <p>Start Date: {new Date(event.start_date).toLocaleDateString()}</p>
                        <p>End Date: {new Date(event.end_date).toLocaleDateString()}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    // Render events in list layout
    const renderListLayout = () => (
        <Row gutter={[16, 16]}>
            {filteredEvents.map(event => (
                <Col xs={24} key={event.id}>
                    <Card
                        hoverable
                        onClick={() => handleRowClick(event)}
                    >
                        <Row>
                            <Col span={8}>
                                <strong>{event.title}</strong>
                            </Col>
                            <Col span={4}>
                                {event.eventtype}
                            </Col>
                            <Col span={4}>
                                {event.description}
                            </Col>
                            <Col span={4}>
                                Start Date: {new Date(event.start_date).toLocaleDateString()}
                            </Col>
                            <Col span={4}>
                                End Date: {new Date(event.end_date).toLocaleDateString()}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
    // Handle row click to navigate to scholarship details
    const handleRowClick = (record) => {
        navigate(`/events/${record.id}`);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout id='events'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '24px', background: '#fff', marginTop: '60px' }}>
                <div style={{ padding: 24, minHeight: 360, borderRadius: 8 }}>
                    
                    <FilterComponent onSearch={filterEvents} name date />
                    <div style={{ marginBottom: 16, textAlign: 'right' }}>
                        <Radio.Group value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
                            <Radio.Button value="grid">
                                <AppstoreOutlined /> Grid
                            </Radio.Button>
                            <Radio.Button value="list">
                                <UnorderedListOutlined /> List
                            </Radio.Button>
                        </Radio.Group>
                    </div>

                    {viewMode === 'grid' ? renderGridLayout() : renderListLayout()}
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL}  />
        </Layout>
    );
};

export default EventPage;
