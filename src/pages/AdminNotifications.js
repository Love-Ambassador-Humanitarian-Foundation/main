import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Row, Col, theme, Button, message, Layout, Breadcrumb } from 'antd';
import { DeleteOutlined, FilterOutlined, BellOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationDetail from './AdminNotificationDetail'; // Assume you have this component
import { Link } from 'react-router-dom';
const { Content } = Layout;

const Notifications = ({ onSetContent,API_URL  }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editpage, SetEditPage] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/notifications`)
            .then(response => {
                const fetchedNotifications = response.data.data;
                setNotifications(fetchedNotifications);
                setFilteredNotifications(fetchedNotifications);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the notifications!", error);
                message.error("There was an error fetching the notifications!", 5);
                setIsLoading(false);
            });
    }, [API_URL]);

    const deleteNotification = (id) => {
        axios.delete(`${API_URL}/api/notifications/${id}`)
            .then(response => {
                const newNotifications = notifications.filter(notification => notification._id !== id);
                setNotifications(newNotifications);
                setFilteredNotifications(newNotifications);
                message.success("Notification deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the notification!", error);
                message.error("There was an error deleting the notification!", 5);
            });
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Link to={`/admin/notifications/${record._id}`} className='text-decoration-none'>
                    <Button type="primary" className='text-white' onClick={() => onSetContent({ url: `/admin/notifications/${record._id}`, display: <NotificationDetail />, icon: <BellOutlined />, label: record.title })}>
                        {record.title}
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
            title: 'Sender',
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deleteNotification(record._id)} />
            ),
        },
    ];

    const filterNotifications = ({ itemName, dateRange }) => {
        let filtered = notifications;

        if (itemName) {
            filtered = filtered.filter(notification =>
                notification.title.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(notification => {
                const notificationDate = new Date(notification.date);
                return notificationDate >= dateRange[0] && notificationDate <= dateRange[1];
            });
        }

        setFilteredNotifications(filtered);
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
                        { title: (<><BellOutlined /><span>Notifications</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => SetEditPage(!editpage)} />
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
                    <FilterComponent onSearch={filterNotifications} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Notifications" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredNotifications}
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
            </Content>
        </Layout>
    );
};

export default Notifications;
