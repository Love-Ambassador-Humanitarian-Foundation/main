import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';
import { DeleteOutlined, HomeOutlined, EditOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message,Layout, Breadcrumb } from 'antd';
import Achievement from './AdminAchievementdetail';

const { Content} = Layout;



const Achievements = ({onSetContent}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    
    const [editpage,SetEditPage] = useState(false);
    const [achievements, setAchievements] = useState([]);
    const [filteredAchievements, setFilteredAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/achievements`)
            .then(response => {
                const fetchedAchievements = response.data.data;
                setAchievements(fetchedAchievements);
                setFilteredAchievements(fetchedAchievements);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the achievements!", error);
                setIsLoading(false);
                setAchievements([{_id:'53545',name:"sfsdf",date:'2022-01-03'}]);
                setFilteredAchievements([{_id:'53545',name:"sfsdf",date:'2022-01-03'}]);
                message.error("There was an error fetching the achievements!", 5);
            });
    }, []);

    const deleteAchievement = (id) => {
        axios.delete(`${backendUrl}/api/v1/achievements/${id}`)
            .then(response => {
                const newAchievements = achievements.filter(achievement => achievement._id !== id);
                setAchievements(newAchievements);
                setFilteredAchievements(newAchievements);
                message.success("Achievement deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the achievement!", error);
                message.error("There was an error deleting the achievement!", 5);
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={() => onSetContent({ url: '/admin/achievements/23243', display: <Achievement />, icon: <UserOutlined />, label: '354544' })}>
                        {record.name}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            key: 'actions',
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => deleteAchievement(record._id)} />
            ),
        },
    ];

    const filterAchievements = ({ itemName, dateRange }) => {
        let filtered = achievements;

        if (itemName) {
            filtered = filtered.filter(achievement =>
                achievement.name.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(achievement => {
                const achievementDate = new Date(achievement.date);
                return achievementDate >= dateRange[0] && achievementDate <= dateRange[1];
            });
        }

        setFilteredAchievements(filtered);
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
                        { title: (<><StarOutlined /><span>Achievements</span></>) },
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
                    <FilterComponent onSearch={filterAchievements} name={true} date={true} />
                        <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                            <Row style={{ marginTop: 1 }}>
                                <Col span={24}>
                                    <Card title="Achievements" bordered={true} style={{ borderRadius: '2px' }}>
                                        <Table
                                            dataSource={filteredAchievements}
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

export default Achievements;
