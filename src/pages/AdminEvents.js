import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Button, message, theme } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';

const Events = () => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/events`)
            .then(response => {
                const fetchedEvents = response.data.data;
                setEvents(fetchedEvents);
                setFilteredEvents(fetchedEvents);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the events!", error);
                setIsLoading(false);
                message.error("There was an error fetching the events!", 5);
            });
    }, []);

    const deleteEvent = (id) => {
        axios.delete(`${backendUrl}/api/v1/events/${id}`)
            .then(response => {
                const newEvents = events.filter(event => event._id !== id);
                setEvents(newEvents);
                setFilteredEvents(newEvents);
                message.success("Event deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the event!", error);
                message.error("There was an error deleting the event!", 5);
            });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => deleteEvent(record._id)} />
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
                return eventDate >= dateRange[0] && eventDate <= dateRange[1];
            });
        }
    
        setFilteredEvents(filtered);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
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
                                pagination={true}
                                rowClassName="editable-row"
                                scroll={{ x: 'max-content' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Events;
