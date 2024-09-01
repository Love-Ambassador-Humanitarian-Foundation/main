import React, { useEffect, useState } from 'react';
import {
    HomeOutlined,
    PlusOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    UserOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import {
    Row, Col, Breadcrumb, Layout, Button, message, Avatar, Card, Table, Tooltip
} from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterComponent from '../components/Filter'; // Assuming you have this component

const { Content } = Layout;

const AddEventParticipant = ({ API_URL }) => {
    const { id } = useParams();
    const location = useLocation();
    const event = location.state?.event; // Default to empty participants if no event
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(event);
    const [usersData, setUsersData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users`);
                // Ensure each user object has a unique key
                const usersWithKeys = response.data.data.map(user => ({
                    ...user,
                    key: user.id, // or another unique identifier from your data
                }));
                setUsersData(usersWithKeys);
                setFilteredUsers(usersWithKeys);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchUsers();
    }, [API_URL]);

    const saveEdit = async (currentformData) => {
        
        try {
            await axios.put(`${API_URL}/api/events/${id}`, currentformData);
            message.success('Event details updated');
            
            navigate(`/admin/events/${id}/participants`);
        } catch (error) {
            console.error('Error updating participants details:', error);
            message.error('Error updating participants details');
        } finally {
            setLoading(false);
        }
    };

    const addUser = (userId) => {

        if (!formData.participants.includes(userId)) {
            setLoading(true);
            const updatedParticipants = Array.from(new Set([
                ...formData.participants,
                ...[userId]
            ]));
            const currentformData = {...formData,
                participants: updatedParticipants,
            }
    
            setFormData(currentformData);
            saveEdit(currentformData)
        }
    };

    const addUsers = () => {
        setLoading(true);
        const updatedParticipants = Array.from(new Set([
            ...formData.participants,
            ...selectedRowKeys
        ]));
        const currentformData = {...formData,
            participants: updatedParticipants,
        }

        setFormData(currentformData);
        // Call saveEdit separately after state has been updated
        saveEdit(currentformData);
    };

    const handleSelectedItems = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };
    
    const columns = [
        {
            title: 'Profile Pic',
            dataIndex: 'profileImage',
            key: 'profileImage',
            render: (text, record) => (
                record.profileImage ? (
                    <Avatar src={record.profileImage} />
                ) : (
                    <div style={{ textAlign: 'center', backgroundColor: '#f56a00', color: '#fff', borderRadius: '50%', width: 32, height: 32, lineHeight: '32px' }}>
                        {record.email[0].toUpperCase()}
                    </div>
                )
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
                record.is_active ? <span className='text-success'>Active</span> : <span className='text-secondary'>Inactive</span>
            ),
        },
        {
            title: 'Admin',
            dataIndex: 'is_staff',
            key: 'is_staff',
            render: (text, record) => (
                record.is_staff ? <span className='text-success'>Admin</span> : <span className='text-secondary'>Non Admin</span>
            ),
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<PlusOutlined />} onClick={() => addUser(record.id)} />
            ),
        },
    ];

    const filterUsers = ({ itemName, dateRange }) => {
        let filtered = usersData;

        if (itemName) {
            const lowerItemNames = itemName.toLowerCase().split(' ').filter(Boolean);

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
                    phoneNumber.includes(itemName) ||
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

        setFilteredUsers(filtered);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/events', title: (<><CalendarOutlined /><span>Events</span></>) },
                        { href: `/#/admin/events/${event?.id}`, title: (<><ClockCircleOutlined /><span style={{ textDecoration: 'none' }}>{event?.title}</span></>) },
                        { href: `/#/admin/events/${event?.id}/participants`, title: (<><UserOutlined /><span>Participants</span></>) },
                        { title: <><UserAddOutlined /><span>Add Participant</span></> },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    {loading && <div className='spinnersmall'></div>}
                    {selectedRowKeys.length > 0 && (
                        <Tooltip title='Add Selected Participants'>
                            <PlusOutlined onClick={addUsers} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                        </Tooltip>
                    )}
                </span>
            </div>
            <Content className='m-2'>
                <div style={{ padding: 12, minHeight: 360, background: '#fff', borderRadius: '4px' }}>
                    <FilterComponent onSearch={filterUsers} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 2, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }} className='p-0 m-0'>
                            <Col span={24} className='p-0 m-0'>
                                <Card title="Users" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredUsers}
                                        columns={columns}
                                        pagination={{ pageSize: 10 }}
                                        rowClassName="editable-row"
                                        scroll={{ x: 'max-content' }}
                                        rowSelection={{
                                            selectedRowKeys: selectedRowKeys,
                                            onChange: handleSelectedItems,
                                        }}
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

export default AddEventParticipant;
