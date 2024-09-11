import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, Table, Row, Col, theme, Button, message, Layout, Breadcrumb, Tooltip } from 'antd';
import { DeleteOutlined,FilterOutlined, HomeOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Content } = Layout;

const AdminNewsletterReceipients = ({ onSetContent,API_URL  }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();
    const [newsletterReceipients, setNewsletterReceipients] = useState([]);
    const [filteredNewsletterReceipients, setFilteredNewsletterReceipients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/newsletter-recipients`)
            .then(response => {
                const fetchedNewsletterReceipients = response.data.data;
                setNewsletterReceipients(fetchedNewsletterReceipients);
                setFilteredNewsletterReceipients(fetchedNewsletterReceipients);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the newsletters Receipients!", error);
                message.error("There was an error fetching the newsletters Receipients!", 5);
                setIsLoading(false);
            });
    }, [API_URL]);

    const deleteNewsletterReceipient = (id) => {
        axios.delete(`${API_URL}/api/newsletter-recipients/${id}`)
            .then(response => {
                const newNewsletterReceipients = newsletterReceipients.filter(newsletter => newsletter.id !== id);
                setNewsletterReceipients(newNewsletterReceipients);
                setFilteredNewsletterReceipients(newNewsletterReceipients);
                message.success("NewsletterReceipient deleted successfully!", 5);
                navigate('/admin/newsletters/receipients');
            })
            .catch(error => {
                console.error("There was an error deleting the Newsletter Receipient!", error);
                message.error("There was an error deleting the Newsletter Receipient!", 5);
            });
    }
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date',
            dataIndex: 'joined_at',
            key: 'joined_at',
            render:(text, record) => (
                <span>{dayjs(record.joined_at).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-danger' />} onClick={() => deleteNewsletterReceipient(record.id)} />
            ),
        },
    ];

    const filterNewsletters = ({ itemName, dateRange }) => {
        let filtered = newsletterReceipients;

        if (itemName) {
            filtered = filtered.filter(Receipient =>
                Receipient.title.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(newsletter => {
                const newsletterDate = new Date(newsletter.joined_at);
                return newsletterDate >= dateRange[0] && newsletterDate <= dateRange[1];
            });
        }

        setFilteredNewsletterReceipients(filtered);
    };
    const handleRowClick = useCallback((record) => {
        navigate(`/admin/newsletters/receipients/${record.id}`);
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
                        { href: '/#/admin/newsletters', title: (<><MailOutlined /><span>Newsletters</span></>) },
                        { title: (<span>NewsletterReceipients</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <Tooltip title='Add NewsletterReceipient'>
                        <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
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
                                <Card title="Newsletter Receipients" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredNewsletterReceipients}
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

export default AdminNewsletterReceipients;
