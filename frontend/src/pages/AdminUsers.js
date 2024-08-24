import React, { useState, useEffect } from 'react';
import { DeleteOutlined, HomeOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Card, Row, Col, Table, Avatar, Button, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';

const { Content } = Layout;

const Users = ({ API_URL }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRandomBgColorClass = () => {
        const colors = [
            'bg-primary',
            'bg-secondary',
            'bg-success',
            'bg-danger',
            'bg-warning',
            'bg-info',
            'bg-light',
            'bg-dark',
            'bg-white'
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    useEffect(() => {
        axios.get(`${API_URL}/api/users`)
            .then(response => {
                const fetchedUsers = response.data.data;
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
                setIsLoading(false);
                message.error("There was an error fetching the users!", 5);
            });
    }, [API_URL]);

    const deleteUser = (id) => {
        axios.delete(`${API_URL}/api/users/${id}`)
            .then(response => {
                const newUsers = users.filter(user => user.id !== id);
                setUsers(newUsers);
                setFilteredUsers(newUsers);
                message.success("User deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the user!", error);
                message.error("There was an error deleting the user!", 5);
            });
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
            )
        },
        {
            title: 'Admin',
            dataIndex: 'is_staff',
            key: 'is_staff',
            render: (text, record) => (
                <>{record.is_staff ? <span className='text-success'>Admin</span> : <span className='text-secondary'>Non Admin</span>}</>
            )
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deleteUser(record.id)} />
            ),
        },
    ];

    const filterUsers = ({ itemName, dateRange }) => {
        let filtered = users;

        if (itemName) {
            const lowerItemName = itemName.toLowerCase();

            filtered = filtered.filter(user => {
                const lowerFirstName = user.firstname ? user.firstname.toLowerCase() : '';
                const lowerLastName = user.lastname ? user.lastname.toLowerCase() : '';
                const lowerEmail = user.email ? user.email.toLowerCase() : '';
                const lowerAddress = user.address ? user.address.toLowerCase() : '';
                const phoneNumber = user.number ? String(user.number) : '';
                const lowerPosition = user.position ? user.position.toLowerCase() : '';

                return (
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
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><UsergroupAddOutlined /><span>Users</span></>) },
                    ]}
                />
                <Link to='/admin/users/add' style={{textDecoration:'none'}}>
                    <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </Link>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <FilterComponent onSearch={filterUsers} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 2, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }} className='p-0 m-0'>
                            <Col span={24} className='p-0 m-0'>
                                <Card title="Users" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredUsers}
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

export default Users;
