import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';
import { DeleteOutlined,HomeOutlined, EditOutlined,TeamOutlined} from '@ant-design/icons';
import { Card, Table, Row, Col, theme, message, Layout, Breadcrumb, Button} from 'antd';
import { Link } from 'react-router-dom';
const { Content} = Layout;

const Partners = ({onSetContent}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    
    const [editpage,SetEditPage] = useState(false);
    const [partners, setPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/partners`)
            .then(response => {
                const fetchedPartners = response.data.data;
                setPartners(fetchedPartners);
                setFilteredPartners(fetchedPartners);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the partners!", error);
                setPartners([{_id:'53545',name:"sfsdf",dateStarted:'2022-01-03', location:'cdfsc'}]);
                setFilteredPartners([{_id:'53545',name:"sfsdf",dateStarted:'2022-01-03', location:'cdfsc'}]);
                setIsLoading(false);
                message.error("There was an error fetching the partners!", 5);
            });
    }, []);

    const deletePartner = (id) => {
        axios.delete(`${backendUrl}/api/v1/partners/${id}`)
            .then(response => {
                const newPartners = partners.filter(partner => partner._id !== id);
                setPartners(newPartners);
                setFilteredPartners(newPartners);
                message.success("Partner deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the partner!", error);
                message.error("There was an error deleting the partner!", 5);
            });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/admin/partners/${record._id}`} className='text-decoration-none'>
                    <Button type="primary" className='text-white'>
                        {record.name}
                    </Button>
                </Link>
            ),
        },
        {
            title: 'Date Started',
            dataIndex: 'dateStarted',
            key: 'dateStarted',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deletePartner(record._id)} />
            ),
        },
    ];

    const filterPartners = ({ itemName, dateRange }) => {
        let filtered = partners;

        if (itemName) {
            filtered = filtered.filter(partner => 
                partner.name.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(partner => {
                const partnerDateStarted = new Date(partner.dateStarted);
                return partnerDateStarted >= dateRange[0] && partnerDateStarted <= dateRange[1];
            });
        }

        setFilteredPartners(filtered);
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
                        { title: (<><TeamOutlined /><span>Partners</span></>) },
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
                    <FilterComponent onSearch={filterPartners} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Partners" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredPartners}
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

export default Partners;
