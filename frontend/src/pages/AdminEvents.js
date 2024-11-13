import React, { useState, useEffect } from 'react';
import { DeleteOutlined, HomeOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb, Tooltip } from 'antd';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEvent, getEvents } from '../services/api';

const { Content } = Layout;

const AdminEvents = ({ onSetContent, API_URL }) => {
    const navigate = useNavigate();
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
                const fetchedEvents = await getEvents(API_URL, currentDate);
                setEvents(fetchedEvents);
                setFilteredEvents(fetchedEvents);
            } catch (error) {
                console.error("Error fetching events!", error);
                message.error("There was an error fetching the events!", 5);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEvents();
    }, [API_URL]);

    // Function to delete an event
    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(API_URL, id);  // Make sure API_URL is passed here
            const updatedEvents = events.filter(event => event.id !== id);
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents);
            navigate('/admin/events');
            message.success("Event deleted successfully!", 5);
        } catch (error) {
            console.error("Error deleting event!", error);
            message.error("There was an error deleting the event!", 5);
        }
    };

    // Columns definition for Table
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Event Type',
            dataIndex: 'eventtype',
            key: 'eventtype',
            render: (text) => text.charAt(0).toUpperCase() + text.slice(1),  // Capitalize first letter
        },
        {
            title: 'Participants',
            dataIndex: 'participants',
            key: 'participants',
            render: (participants) => participants ? participants.length : 0,
        },
        {
            title: 'Ongoing',
            dataIndex: 'ongoing',
            key: 'ongoing',
            render: (ongoing) => ongoing ? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>,
        },
        {
            title: 'Media',
            dataIndex: 'media',
            key: 'media',
            render: (media) => {
                if (!media) return 0;
                const imageCount = media.images ? media.images.length : 0;
                const videoCount = media.videos ? media.videos.length : 0;
                return imageCount + videoCount;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-danger' />} onClick={() => handleDeleteEvent(record.id)} />
            ),
        },
    ];

    // Filter events based on user input
    const filterEvents = ({ itemName, dateRange }) => {
        let filtered = events;

        if (itemName) {
            const searchTerm = itemName.toLowerCase();
            filtered = filtered.filter(event => 
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.eventtype.toLowerCase().includes(searchTerm)
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.start_date);
                return eventDate >= dateRange[0] && eventDate <= dateRange[1];
            });
        }

        setFilteredEvents(filtered);
    };

    // Handle row click to navigate to event details
    const handleRowClick = (record) => {
        navigate(`/admin/events/${record.id}`);
    };

    // Loading spinner while data is being fetched
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><CalendarOutlined /><span>Events</span></>) },
                    ]}
                />
                <Tooltip title='Add Event'>
                    <Link to='/admin/events/add' style={{ textDecoration: 'none' }}>
                        <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Link>
                </Tooltip>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
                    <FilterComponent onSearch={filterEvents} name={true} eventType={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Events" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredEvents}
                                        columns={columns}
                                        pagination={{ pageSize: 10 }}
                                        rowClassName="clickable-row"
                                        scroll={{ x: 'max-content' }}
                                        onRow={(record) => ({
                                            onClick: () => handleRowClick(record),
                                        })}
                                        rowKey="id"  // Make sure to provide a unique key prop for each row
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default AdminEvents;
