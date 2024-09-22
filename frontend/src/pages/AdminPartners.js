import React, { useState, useEffect, useMemo, useCallback } from 'react';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { DeleteOutlined, HomeOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Table, Row, Col, theme, message, Layout, Breadcrumb, Button, Tooltip, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getPartners } from '../services/api';

const { Content } = Layout;

const Partners = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const fetchedPartners = await getPartners(API_URL);

                if (Array.isArray(fetchedPartners)) {
                    setPartners(fetchedPartners);
                    setFilteredPartners(fetchedPartners);
                } else {
                    console.error("The response data is not an array:", fetchedPartners.data);
                    message.error("There was an error fetching the partners!");
                }
            } catch (error) {
                console.error("There was an error fetching the partners!", error.response);
                message.error("There was an error fetching the partners!", 5);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPartners();
    }, [API_URL]);

    const deletePartner = useCallback(async (id) => {
        try {
            await deletePartner(API_URL, id);
            setPartners(prev => prev.filter(partner => partner.id !== id));
            setFilteredPartners(prev => prev.filter(partner => partner.id !== id));
            message.success("Partner deleted successfully!", 5);
        } catch (error) {
            console.error("There was an error deleting the partner!", error);
            message.error("There was an error deleting the partner!", 5);
        }
    }, [API_URL]);

    const filterPartners = useCallback(({ itemName, dateRange }) => {
        let filtered = partners;
    
        if (itemName) {
            filtered = filtered.filter(partner => 
                partner.title.toLowerCase().includes(itemName.toLowerCase())
            );
        }
    
        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(partner => {
                const partnerCreatedDate = new Date(partner.created_date);
                return partnerCreatedDate >= startDate && partnerCreatedDate <= endDate;
            });
        }
    
        setFilteredPartners(filtered);
    }, [partners]); // Removed the debounce duration since useCallback doesn't support it directly
    

    const columns = useMemo(() => [
        {
            dataIndex: 'logo',
            key: 'logo',
            render: (logo) => <Avatar src={logo} />
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Created Date',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            key: 'action',
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-danger' />} onClick={() => deletePartner(record.id)} />
            ),
        },
    ], [deletePartner]);

    const handleRowClick = useCallback((record) => {
        navigate(`/admin/partners/${record.id}`);
    }, [navigate]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <TeamOutlined />
                        <span>Partners</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Tooltip title='Add Partner'>
                    <Link to='/admin/partners/add' style={{ textDecoration: 'none' }}>
                        <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Link>
                </Tooltip>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
                    <FilterComponent onSearch={filterPartners} name date />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Partners" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredPartners}
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

export default Partners;
