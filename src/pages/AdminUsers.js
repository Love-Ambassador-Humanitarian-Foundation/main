import React, { useState, useEffect } from 'react';
import { DeleteOutlined, HomeOutlined, PlusOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Table, theme, Avatar, Button, message } from 'antd';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';

const { Content } = Layout;

const Profiles = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    //const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editPage, setEditPage] = useState(false);
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
                //console.log(response);
                const fetchedUsers = response.data.data;
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
                setIsLoading(false);
                console.log(fetchedUsers)
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
                const dummyData = [
                    { id: '1', name: 'Oscar', email: 'oscar@example.com', role: 'admin', status: 'active', artworks: 5, phonenumber: '1234567890', address: '123 Street', image: 'https://i.pravatar.cc/150?img=1' },
                    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'inactive', artworks: 2, phonenumber: '0987654321', address: '456 Avenue', image: 'https://i.pravatar.cc/150?img=2' },
                    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'artist', status: 'active', artworks: 8, phonenumber: '5678901234', address: '789 Boulevard', image: 'https://i.pravatar.cc/150?img=3' }
                ];
                setUsers(dummyData);
                setFilteredUsers(dummyData);
                setIsLoading(false);
                message.error("There was an error fetching the users!", 5);
            });
    }, [API_URL]);

    const deleteUser = (id) => {
        axios.delete(`${API_URL}/api/users/${id}`)
            .then(response => {
                const newUsers = users.filter(user => user._id !== id);
                setUsers(newUsers);
                setFilteredUsers(newUsers);
                console.log(newUsers)
                message.success("User deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the user!", error);
                message.error("There was an error deleting the user!", 5);
            });
    };

    const columns = [
        {
            title: 'Profile Pic',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <Link to={`/admin/profiles/${record.id}`} className='text-decoration-none'>
                    <Button type="primary" className='p-1 m-0' style={{ width: '40px', backgroundColor: 'transparent', height: '40px' }}>
                        {record.profileImage ? (
                            <Avatar src={record.profileImage} />
                        ) : (
                            <div className={`rounded-5 ${getRandomBgColorClass()} m-0 p-0`} style={{ textAlign: 'center', color: getRandomBgColorClass().includes('dark') ? 'white' : 'black' }}>
                                {record.email.slice(0, 1).toUpperCase()}
                            </div>
                        )}
                    </Button>
                </Link>
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
                <>{record.is_active?<span className='text-success'>Active</span>:<span className='text-secondary'>In Active</span>}</>
            )
        },
        {
            title: 'Admin',
            dataIndex: 'is_staff',
            key: 'is_staff',
            render: (text, record) => (
                <>{record.is_staff?<span className='text-success'>Admin</span>:<span className='text-secondary'>Non Admin</span>}</>
            )
        },
        {
            render: (text, record) => (
                <div>
                    <Button type="primary" icon={<DeleteOutlined />} onClick={() => deleteUser(record._id)} />
                </div>
            ),
        },
    ];

    const filterUsers = ({ itemName, dateRange }) => {
        let filtered = users;

        if (itemName) {
            filtered = filtered.filter(user => {
                console.log(user,"====")
                const lowerName = user.name.toLowerCase();
                const lowerEmail = user.email.toLowerCase();
                const lowerRole = user.role.toLowerCase();
                const lowerAddress = user.address.toLowerCase();
                const phoneNumber = user.phonenumber; // Assuming phonenumber is a string

                return (
                    lowerName.includes(itemName.toLowerCase()) ||
                    lowerEmail.includes(itemName.toLowerCase()) ||
                    lowerRole.includes(itemName.toLowerCase()) ||
                    lowerAddress.includes(itemName.toLowerCase()) ||
                    phoneNumber.includes(itemName)
                );
            });
        }

        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(user => {
                const matchesDate = new Date(user.createdAt) >= dateRange[0] && new Date(user.createdAt) <= dateRange[1];
                return matchesDate;
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
                <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
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

export default Profiles;
