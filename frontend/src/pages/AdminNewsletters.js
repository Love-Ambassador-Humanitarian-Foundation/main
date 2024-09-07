import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, Table, Row, Col, theme, Button, message, Layout, Breadcrumb, Tooltip, Badge } from 'antd';
import { DeleteOutlined, FilterOutlined, HomeOutlined, MailOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
const { Content } = Layout;

const Newsletters = ({ onSetContent,API_URL  }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();
    const [newsletters, setNewsletters] = useState([]);
    const [newsletterReceipients, setNewsletterReceipients] = useState([]);
    const [filteredNewsletters, setFilteredNewsletters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/newsletters`)
            .then(response => {
                const fetchedNewsletters = response.data.data;
                setNewsletters(fetchedNewsletters);
                setFilteredNewsletters(fetchedNewsletters);
            })
            .catch(error => {
                console.error("There was an error fetching the newsletters!", error);
                message.error("There was an error fetching the newsletters!", 5);
            });
        axios.get(`${API_URL}/api/newsletter-recipients`)
            .then(response => {
                const fetchedNewsletterReceipients = response.data.data;
                setNewsletterReceipients(fetchedNewsletterReceipients);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the newsletters Receipients!", error);
                message.error("There was an error fetching the newsletters Receipients!", 5);
                setIsLoading(false);
            });
    }, [API_URL]);

    const deleteNewsletter = (id) => {
        axios.delete(`${API_URL}/api/newsletters/${id}`)
            .then(response => {
                const newNewsletters = newsletters.filter(newsletter => newsletter.id !== id);
                setNewsletters(newNewsletters);
                setFilteredNewsletters(newNewsletters);
                message.success("Newsletter deleted successfully!", 5);
                navigate('/admin/newsletters/');
            })
            .catch(error => {
                console.error("There was an error deleting the Newsletter!", error);
                message.error("There was an error deleting the Newsletter!", 5);
            });
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-danger' />} onClick={() => deleteNewsletter(record.id)} />
            ),
        },
    ];

    const filterNewsletters = ({ itemName, dateRange }) => {
        let filtered = newsletters;

        if (itemName) {
            filtered = filtered.filter(newsletter =>
                newsletter.title.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(newsletter => {
                const newsletterDate = new Date(newsletter.date);
                return newsletterDate >= dateRange[0] && newsletterDate <= dateRange[1];
            });
        }

        setFilteredNewsletters(filtered);
    };
    const handleRowClick = useCallback((record) => {
        navigate(`/admin/newsletters/${record.id}`);
    }, [navigate]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><MailOutlined /><span>Newsletters</span></>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <Tooltip title="View Subscribers">
                    <Link to={`/admin/newsletters/receipients`} style={{ textDecoration: 'none' }}>
                        <Badge count={newsletterReceipients.length} className="me-2" style={{ fontSize: '8px', padding: '0 4px', height: '12px', minWidth: '12px', lineHeight: '12px' }}>
                            <UserOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                        </Badge>
                    </Link>
                </Tooltip>
                
                <Tooltip title='Add Newsletter'>
                    <Link to='/admin/newsletters/add' className='ms-2' style={{textDecoration:'none'}}>
                        <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Link>
                </Tooltip>
                </span>
                
                     
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS
                    }}
                >
                    <FilterComponent onSearch={filterNewsletters} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Newsletters" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredNewsletters}
                                        columns={columns}
                                        pagination={true}
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

export default Newsletters;
