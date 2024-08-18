import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';
import { DeleteOutlined, HomeOutlined, EditOutlined,StarOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;

const Scholarships = ({ API_URL}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();

    const [isEditPage, setIsEditPage] = useState(false);
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
                setScholarships([{ _id: '53545', name: "Sample Scholarship", date: '2022-01-03', picture: 'url/to/sample.jpg' }]);
                setFilteredScholarships([{ _id: '53545', name: "Sample Scholarship", date: '2022-01-03', picture: 'url/to/sample.jpg' }]);
                message.error("There was an error fetching the scholarships!", 5);
            });
    }, [API_URL]);

    const deleteScholarship = (id) => {
        axios.delete(`${backendUrl}/api/v1/scholarships/${id}`)
            .then(response => {
                const newScholarships = scholarships.filter(scholarship => scholarship._id !== id);
                setScholarships(newScholarships);
                setFilteredScholarships(newScholarships);
                message.success("Scholarship deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the scholarship!", error);
                message.error("There was an error deleting the scholarship!", 5);
            });
    };

    const columns = [
        {
            title: 'Picture',
            dataIndex: 'picture',
            key: 'picture',
            render: (url) => (
                <img src={url} alt="scholarship" style={{ width: 50, height: 50 }} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/admin/scholarships/${record._id}`} className='text-decoration-none'>
                    <Button
                        type="primary"
                         className='text-white'
                    >
                        {record.name}
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
            key: 'actions',
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deleteScholarship(record._id)} />
            ),
        },
    ];

    const filterScholarships = ({ itemName, dateRange }) => {
        let filtered = scholarships;

        if (itemName) {
            filtered = filtered.filter(scholarship =>
                scholarship.name.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(scholarship => {
                const scholarshipDate = new Date(scholarship.date);
                return scholarshipDate >= dateRange[0] && scholarshipDate <= dateRange[1];
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
                        { title: (<><StarOutlined /><span>Scholarships</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setIsEditPage(!isEditPage)} />
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

export default Scholarships;
