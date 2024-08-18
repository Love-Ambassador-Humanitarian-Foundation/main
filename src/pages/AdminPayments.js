import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Row, Col, theme,Button, message, Layout, Breadcrumb} from 'antd';
import { DeleteOutlined, FilterOutlined, DollarOutlined, EditOutlined, HomeOutlined} from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';
import Payment from './AdminPaymentDetail';
import { Link } from 'react-router-dom';
const { Content} = Layout;

const Payments = ({onSetContent}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editpage,SetEditPage] = useState(false);

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
                setPayments([{_id:'53545',name:"sfsdf", amount:'80',date:'2022-01-03'}]);
                setFilteredPayments([{_id:'53545',name:"sfsdf", amount:'45',date:'2022-01-03'}]);
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
            render: (text, record) => (
                <Link to={`/admin/payments`} className='text-decoration-none'>
                    <Button type="primary" className='text-white' onClick={() => onSetContent({ url: '/admin/payments/23243', display: <Payment />, icon: <DollarOutlined />, label: record._id })}>
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
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} onClick={() => deletePayment(record._id)} />
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
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><DollarOutlined /><span>Payments</span></>) },
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
            </Content>
        </Layout>
        
    );
};

export default Payments;
