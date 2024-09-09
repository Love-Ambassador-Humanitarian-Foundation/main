import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    DeleteOutlined, HomeOutlined, UserOutlined, PlusOutlined, CalendarOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb, Tooltip, Avatar } from 'antd';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getRandomBgColorClass } from '../utils/helper';
import FilterComponent from '../components/Filter';

const { Content } = Layout;

const EventParticipants = ({ API_URL }) => {
    const { id: eventid } = useParams(); // Extracting the event id
    const navigate = useNavigate();
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [participants, setParticipants] = useState([]);
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/events/${eventid}`);
                const data = response.data.data;
                setEvent(data);
                if (data.participants && data.participants.length > 0) {
                    const fetchParticipants = async () => {
                        try {
                            const promises = data.participants.map(id =>
                                axios.get(`${API_URL}/api/users/${id}`)
                            );
                            const responses = await Promise.all(promises);
                            const fetchedParticipants = responses.map(response => response.data.data);
                            setParticipants(fetchedParticipants);
                            setFilteredParticipants(fetchedParticipants);
                        } catch (error) {
                            console.error('Error fetching participants:', error);
                            message.warning('Error fetching participants', 5);
                        } finally {
                            setIsLoading(false);
                        }
                    };

                    fetchParticipants();
                } else {
                    //message.warning('No participants found', 5);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching event details:', error);
                setIsLoading(false);
            }
        };

        fetchEventDetails();
    }, [API_URL, eventid]);

    const deleteParticipant = async (id) => {
        setIsLoading(true);
        try {
            const updatedParticipants = event.participants.filter(participantId => participantId !== id);
            await axios.put(`${API_URL}/api/events/${eventid}`, {
                ...event,
                participants: updatedParticipants,
            });
            message.success('Participant removed successfully');
            // Optionally refetch participants if needed
            const responses = await Promise.all(updatedParticipants.map(id => axios.get(`${API_URL}/api/users/${id}`)));
            const updatedParticipantList = responses.map(response => response.data.data);
            setParticipants(updatedParticipantList);
            setFilteredParticipants(updatedParticipantList);
        } catch (error) {
            console.error('Error updating event details:', error);
            message.error('Error updating event details');
        } finally {
            setIsLoading(false);
            navigate(`/admin/events/${eventid}/participants`)
        }
    };

    const handleRowClick = (record) => {
        navigate(`/admin/users/${record.id}`);
    };

    const columns = [
        {
            title: 'Profile Pic',
            dataIndex: 'profileImage',
            key: 'profileImage',
            render: (text, record) => (
                <>{record.profileImage ? (
                    <Avatar src={record.profileImage} />
                ) : (
                    <div className={`rounded-5 ${getRandomBgColorClass()} m-0 p-0`} style={{ textAlign: 'center', color: getRandomBgColorClass().includes('dark') ? 'white' : 'black' }}>
                        {record.email.slice(0, 1).toUpperCase()}
                    </div>
                )}</>
            ),
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (text, record) => (
                <>{record.is_active ? <span className='text-success'>Active</span> : <span className='text-secondary'>Inactive</span>}</>
            ),
        },
        {
            title: 'Admin',
            dataIndex: 'is_staff',
            key: 'is_staff',
            render: (text, record) => (
                <>{record.is_staff ? <span className='text-success'>Admin</span> : <span className='text-secondary'>Non Admin</span>}</>
            ),
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-danger' />} onClick={() => deleteParticipant(record.id)} />
            ),
        },
    ];

    const filterParticipants = ({ itemName, dateRange }) => {
        let filtered = participants;

        if (itemName) {
            const lowerItemNames = itemName.toLowerCase().split(' ').filter(item => item);

            filtered = filtered.filter(user => {
                const lowerFirstName = user.firstname ? user.firstname.toLowerCase() : '';
                const lowerLastName = user.lastname ? user.lastname.toLowerCase() : '';
                const lowerEmail = user.email ? user.email.toLowerCase() : '';
                const lowerAddress = user.address ? user.address.toLowerCase() : '';
                const phoneNumber = user.number ? String(user.number) : '';
                const lowerPosition = user.position ? user.position.toLowerCase() : '';

                return lowerItemNames.every(lowerItemName =>
                    lowerFirstName.includes(lowerItemName) ||
                    lowerLastName.includes(lowerItemName) ||
                    lowerEmail.includes(lowerItemName) ||
                    lowerAddress.includes(lowerItemName) ||
                    phoneNumber.includes(lowerItemName) ||
                    lowerPosition.includes(lowerItemName)
                );
            });
        }

        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;

            filtered = filtered.filter(user => {
                const joinedDate = new Date(user.joined_date);
                return joinedDate >= startDate && joinedDate <= endDate;
            });
        }

        setFilteredParticipants(filtered);
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
                        { href: '/#/admin/events', title: (<><CalendarOutlined /><span style={{ textDecoration: 'none' }}>Events</span></>) },
                        { href: `/#/admin/events/${eventid}`, title: (<><ClockCircleOutlined /><span style={{ textDecoration: 'none' }}>{event?.title}</span></>) },
                        { title: (<><UserOutlined /><span>Participants</span></>) },
                    ]}
                />
                <Tooltip title='Add Participant'>
                    <Link to={`/admin/events/${eventid}/participants/add`} state={{ event: event }} style={{ textDecoration: 'none' }}>
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
                    <FilterComponent onSearch={filterParticipants} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Participants" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredParticipants}
                                        columns={columns}
                                        pagination={{ pageSize: 10 }}
                                        rowClassName="clickable-row"
                                        scroll={{ x: 'max-content' }}
                                        onRow={(record) => ({
                                            onClick: () => handleRowClick(record),
                                        })}
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

export default EventParticipants;
