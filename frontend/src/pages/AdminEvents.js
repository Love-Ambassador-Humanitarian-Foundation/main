import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteOutlined, HomeOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb } from 'antd';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const Events = ({ onSetContent,API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [editPage, setEditPage] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/events`)
            .then(response => {
                const fetchedEvents = response.data.data;
                setEvents(fetchedEvents);
                setFilteredEvents(fetchedEvents);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the events!", error);
                const dummyData = [
                    { _id: '1', name: 'Dummy Event 1', date: '2023-01-01', location: 'Location 1' },
                    { _id: '2', name: 'Dummy Event 2', date: '2023-02-01', location: 'Location 2' },
                    { _id: '3', name: 'Dummy Event 3', date: '2023-03-01', location: 'Location 3' }
                ];
                setEvents(dummyData);
                setFilteredEvents(dummyData);
                setIsLoading(false);
                message.warning("Using dummy data due to error fetching events", 5);
            });
    }, [API_URL]);

    const deleteEvent = (id) => {
        axios.delete(`${API_URL}/api/events/${id}`)
            .then(response => {
                const newEvents = events.filter(event => event.id !== id);
                setEvents(newEvents);
                setFilteredEvents(newEvents);
                message.success("Event deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the event!", error);
                message.error("There was an error deleting the event!", 5);
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/admin/events/${record.id}`} className='text-decoration-none'>
                    <Button type="link" className='text-white'>
                        {record.name}
                    </Button>
                </Link>
                
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deleteEvent(record._id)} />
            ),
        },
    ];

    const filterEvents = ({ itemName, dateRange }) => {
        let filtered = events;

        if (itemName) {
            filtered = filtered.filter(event =>
                event.name.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= dateRange[0] && dateRange[1] >= eventDate;
            });
        }

        setFilteredEvents(filtered);
    };

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
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setEditPage(!editPage)} />
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <FilterComponent onSearch={filterEvents} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Events" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredEvents}
                                        columns={columns}
                                        pagination={{ pageSize: 10 }}
                                        rowClassName="editable-row"
                                        scroll={{ x: 'max-content' }}
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

export default Events;
