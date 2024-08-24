import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { DeleteOutlined, HomeOutlined, PlusOutlined, SolutionOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Scholarships = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();

    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/scholarships`)
            .then(response => {
                const fetchedScholarships = response.data.data;
                setScholarships(fetchedScholarships);
                setFilteredScholarships(fetchedScholarships);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the scholarships!", error);
                setIsLoading(false);
                message.error("There was an error fetching the scholarships!", 5);
            });
    }, [API_URL]);

    const deleteScholarship = (id) => {
        axios.delete(`${API_URL}/api/scholarships/${id}`)
            .then(response => {
                const newScholarships = scholarships.filter(scholarship => scholarship.id !== id);
                setScholarships(newScholarships);
                setFilteredScholarships(newScholarships);
                message.success("Scholarship deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the scholarship!", error.response);
                message.error("There was an error deleting the scholarship!", 5);
            });
    };

    const handleRowClick = (record) => {
        navigate(`/admin/scholarships/${record.id}`);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Organisation Approved',
            dataIndex: 'organisation_approved',
            key: 'organisation_approved',
            render: (approved) => (
                <span>{approved ? <span className='text-success'>Approved</span> : 'Not Approved'}</span>
            ),
        },
        {
            title: 'Class Level',
            dataIndex: 'class_level',
            key: 'class_level',
        },
        {
            title: 'Amount',
            dataIndex: 'amount_approved',
            key: 'amount_approved',
            render: (amount, record) => (
                <span>{record.currency} {amount}</span>
            ),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            key: 'actions',
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering row click
                    deleteScholarship(record._id);
                }} />
            ),
        },
    ];

    const filterScholarships = ({ itemName, dateRange }) => {
        let filtered = scholarships;

        if (itemName) {
            filtered = filtered.filter(scholarship =>
                (scholarship.first_name + ' ' + scholarship.last_name).toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(scholarship => {
                const scholarshipDate = new Date(scholarship.year);
                return scholarshipDate >= dateRange[0] && dateRange[1] >= scholarshipDate;
            });
        }

        setFilteredScholarships(filtered);
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
                        { title: (<><SolutionOutlined /><span>Scholarships</span></>) },
                    ]}
                />
                <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
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
                    <FilterComponent onSearch={filterScholarships} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Scholarships" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredScholarships}
                                        columns={columns}
                                        pagination={{pageSize: 10 }}
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

export default Scholarships;
