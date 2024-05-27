import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Button, message, theme } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';

const Partners = () => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
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
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => deletePartner(record._id)} />
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
    );
};

export default Partners;
