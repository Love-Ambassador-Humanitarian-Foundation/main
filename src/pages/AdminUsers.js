import React, { useState, useEffect } from 'react';
import { DeleteOutlined, HomeOutlined, EditOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, theme, Avatar, Button, message } from 'antd';
import FilterComponent from '../components/Filter';
import { backendUrl } from '../utils/utils'; // Import backendUrl for the API endpoint
import LoadingSpinner from '../components/LoadingSpinner';
const { Content} = Layout;
const Profiles = ({onSetContent}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editpage,SetEditPage] = useState(false);
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
        axios.get(`${backendUrl}/api/v1/users`)
            .then(response => {
                //console.log(response);
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
    }, []);

    const deleteUser = (id) => {
        axios.delete(`${backendUrl}/api/v1/users/harddelete/${id}`)
            .then(response => {
                const newUsers = users.filter(user => user._id !== id);
                setUsers(newUsers);
                setFilteredUsers(newUsers);
                message.success("User deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the user!", error);
                message.error("There was an error deleting the user!", 5);
            });
    }

    const columns = [
        {
            title: 'Profile Pic',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <div>
                    <Button type="primary" className='p-1 m-0' style={{ width: '40px', backgroundColor:'transparent', height:'40px'}} onClick={() => navigate(`/admin/users/${record._id}`)}>
                        {record.image ? (
                            <Avatar src={record.image} />
                        ) : (
                            <div className={`rounded-5 ${getRandomBgColorClass()} m-0 p-0`} style={{ textAlign: 'center', lineHeight: '30px', color: getRandomBgColorClass().includes('dark') ? 'white' : 'black' }}>
                                {record.email.slice(0, 1).toUpperCase()}
                            </div>
                        )}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        
        {
            title: 'Artworks Bought',
            dataIndex: 'artworks',
            key: 'artworks',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
        console.log(filtered);
        console.log(itemName);
    
        if (itemName) {
            filtered = filtered.filter(user => {
                const lowerName = user.name.toLowerCase();
                const lowerEmail = user.email.toLowerCase();
                const lowerRole = user.role.toLowerCase();
                const lowerStatus = user.status.toLowerCase();
                const lowerAddress = user.address.toLowerCase();
                const lowerFacebook = user.facebook ? user.facebook.toLowerCase() : '';
                const lowerInstagram = user.instagram ? user.instagram.toLowerCase() : '';
                const lowerTwitter = user.twitter ? user.twitter.toLowerCase() : '';
                const lowerLinkedin = user.linkedin ? user.linkedin.toLowerCase() : '';
                const phoneNumber = user.phonenumber; // Assuming phonenumber is a string
                const lowerTelegram = user.telegram ? user.telegram.toLowerCase() : '';
    
                const matchesName = !itemName || lowerName.includes(itemName.toLowerCase());
                const matchesEmail = !itemName || lowerEmail.includes(itemName.toLowerCase());
                const matchesRole = !itemName || lowerRole.includes(itemName.toLowerCase());
                const matchesStatus = !itemName || lowerStatus.includes(itemName.toLowerCase());
                const matchesAddress = !itemName || lowerAddress.includes(itemName.toLowerCase());
                const matchesFacebook = !itemName || lowerFacebook.includes(itemName.toLowerCase());
                const matchesInstagram = !itemName || lowerInstagram.includes(itemName.toLowerCase());
                const matchesTwitter = !itemName || lowerTwitter.includes(itemName.toLowerCase());
                const matchesLinkedin = !itemName || lowerLinkedin.includes(itemName.toLowerCase());
                const matchesPhoneNumber = !itemName || phoneNumber.includes(itemName);
                const matchesTelegram = !itemName || lowerTelegram.includes(itemName.toLowerCase());
                
                return (
                    matchesName ||
                    matchesEmail ||
                    matchesRole ||
                    matchesStatus ||
                    matchesAddress ||
                    matchesFacebook ||
                    matchesInstagram ||
                    matchesTwitter ||
                    matchesLinkedin ||
                    matchesPhoneNumber ||
                    matchesTelegram 
                );
                
            });
            
        }
        // Filter by date range
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(user => {
                const matchesDate = !dateRange || (new Date(user.createdAt) >= dateRange[0] && new Date(user.createdAt) <= dateRange[1]);

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
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={()=>SetEditPage(!editpage)} />
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
                    <FilterComponent onSearch={filterUsers} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Users" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredUsers}
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

export default Profiles;