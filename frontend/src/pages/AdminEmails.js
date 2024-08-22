import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Row, Col, theme, Button, message, Layout, Breadcrumb } from 'antd';
import { DeleteOutlined, FilterOutlined, MailOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import EmailDetail from './AdminEmailDetail'; // Assume you have this component
import { Link } from 'react-router-dom';
const { Content } = Layout;

const Emails = ({ onSetContent,API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [emails, setEmails] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editpage, SetEditPage] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/emails`)
            .then(response => {
                const fetchedEmails = response.data.data;
                setEmails(fetchedEmails);
                setFilteredEmails(fetchedEmails);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the emails!", error);
                message.error("There was an error fetching the emails!", 5);
                setIsLoading(false);
            });
    }, [API_URL]);

    const deleteEmail = (id) => {
        axios.delete(`${API_URL}/api/emails/${id}`)
            .then(response => {
                const newEmails = emails.filter(email => email._id !== id);
                setEmails(newEmails);
                setFilteredEmails(newEmails);
                message.success("Email deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the email!", error);
                message.error("There was an error deleting the email!", 5);
            });
    }

    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (text, record) => (
                <Link to={`/admin/emails/${record._id}`} className='text-decoration-none'>
                    <Button type="primary" className='text-white' onClick={() => onSetContent({ url: `/admin/emails/${record._id}`, display: <EmailDetail />, icon: <MailOutlined />, label: record.subject })}>
                        {record.subject}
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
            title: 'Sender',
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deleteEmail(record._id)} />
            ),
        },
    ];

    const filterEmails = ({ itemName, dateRange }) => {
        let filtered = emails;

        if (itemName) {
            filtered = filtered.filter(email =>
                email.subject.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(email => {
                const emailDate = new Date(email.date);
                return emailDate >= dateRange[0] && emailDate <= dateRange[1];
            });
        }

        setFilteredEmails(filtered);
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
                        { title: (<><MailOutlined /><span>Emails</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => SetEditPage(!editpage)} />
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
                    <FilterComponent onSearch={filterEmails} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Emails" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredEmails}
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

export default Emails;
