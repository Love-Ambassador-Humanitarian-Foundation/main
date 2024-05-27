import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, theme, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';

const Achievements = () => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [achievements, setAchievements] = useState([]);
    const [filteredAchievements, setFilteredAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Use navigate for navigation

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
                    <Button type="primary" onClick={() => navigate(`/admin/achievements/${record._id}`)}>
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
    );
};

export default Achievements;
