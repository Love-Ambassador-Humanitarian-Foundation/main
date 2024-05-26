import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Button, message, theme } from 'antd';
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';

const Payments = () => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/payments`)
            .then(response => {
                const fetchedPayments = response.data.data;
                setPayments(fetchedPayments);
                setFilteredPayments(fetchedPayments);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the payments!", error);
                setIsLoading(false);
                message.error("There was an error fetching the payments!", 5);
            });
    }, []);

    const deletePayment = (id) => {
        axios.delete(`${backendUrl}/api/v1/payments/${id}`)
            .then(response => {
                const newPayments = payments.filter(payment => payment._id !== id);
                setPayments(newPayments);
                setFilteredPayments(newPayments);
                message.success("Payment deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the payment!", error);
                message.error("There was an error deleting the payment!", 5);
            });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => deletePayment(record._id)} />
            ),
        },
    ];

    const filterPayments = ({ itemName, dateRange }) => {
        let filtered = payments;

        if (itemName) {
            filtered = filtered.filter(payment => 
                payment.name.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate >= dateRange[0] && paymentDate <= dateRange[1];
            });
        }

        setFilteredPayments(filtered);
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
            <FilterComponent onSearch={filterPayments} name={true} date={true} />
            <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                <Row style={{ marginTop: 1 }}>
                    <Col span={24}>
                        <Card title="Payments" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                            <Table
                                dataSource={filteredPayments}
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

export default Payments;
