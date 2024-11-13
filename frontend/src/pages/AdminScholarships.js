import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DeleteOutlined, HomeOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb, Tooltip } from 'antd';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { deleteScholarship, getScholarships } from '../services/api';

const { Content } = Layout;

const AdminScholarships = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();

    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch scholarships from the API
    
        const fetchScholarships = async () => {
            try {
                const currentDate = new Date().toISOString().split('T').join(' ').split('.')[0]; // Format as datetime.datetime
                //console.log(currentDate,'==========')
                const fetchedScholarships = await getScholarships(API_URL, currentDate);
    
                setScholarships(fetchedScholarships.map((item) => ({
                    key: item.id, // Unique key for each row
                    ...item,
                })));
                setFilteredScholarships(fetchedScholarships.map((item) => ({
                    key: item.id, // Unique key for each row
                    ...item,
                })));
            } catch (error) {
                console.error("Error fetching scholarships", error);
                message.error("There was an error fetching the scholarships!", 5);
            } finally {
                setIsLoading(false);
            }
        };
        fetchScholarships();
    }, [API_URL]);

    // Handle deletion of a scholarship
    const deletescholarship = async (id) => {
        try {
            await deleteScholarship(API_URL, id);
            const updatedScholarships = scholarships.filter(scholarship => scholarship.id !== id);
            // console.log(updatedScholarships,'=========')
            setScholarships(updatedScholarships);
            setFilteredScholarships(updatedScholarships);
            navigate(`/admin/scholarships`);
            message.success("Scholarship deleted successfully!", 5);
        } catch (error) {
            console.error("Error deleting scholarship", error, error.response);
            message.error("There was an error deleting the scholarship!", 5);
        }
    };

    // Handle row click to navigate to scholarship details
    const handleRowClick = (record) => {
        navigate(`/admin/scholarships/${record.id}`);
    };

    // Filter scholarships based on search criteria
    const filterScholarships = ({ itemName, dateRange }) => {
        let filtered = scholarships;

        if (itemName) {
            const searchTerm = itemName.toLowerCase();
            filtered = filtered.filter(scholarship =>
                scholarship.name.toLowerCase().includes(searchTerm) ||
                scholarship.year.toString().includes(searchTerm) ||
                scholarship.amount_approved.toLowerCase().includes(searchTerm) ||
                scholarship.currency.toLowerCase().includes(searchTerm) ||
                scholarship.duration.toLowerCase().includes(searchTerm)
            );
        }

        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(scholarship => {
                const scholarshipDate = new Date(scholarship.created_date);
                return scholarshipDate >= startDate && scholarshipDate <= endDate;
            });
        }

        setFilteredScholarships(filtered);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Amount',
            dataIndex: 'amount_approved',
            key: 'amount_approved',
            render: (amount, record) => `${record.currency} ${amount}`,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text, record) => (
                <span>
                    {record.is_expired ? <>
                        {text} ({<span className='text-danger'>Expired</span>})
                    </>
                        
                    : 
                        <>{text} ({<span className='text-success'>Ongoing</span>})</>
                    }
                </span>
            ),
        },
        {
            title: 'Created Date',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        {
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<DeleteOutlined className="text-danger" />}
                    onClick={(e) => {
                        e.stopPropagation();
                        deletescholarship(record.id);
                    }}
                />
            ),
        },
    ];
    const breadcrumbItems = [
        { title: <HomeOutlined />, href: '/' },
        { title: <><ProfileOutlined /><span>Scholarships</span></>, href: '/scholarships' },
    ];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center p-2 m-2" style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                
                <Breadcrumb items={breadcrumbItems} />
                
                <Tooltip title='Add Scholarship'>
                    <Link to='/admin/scholarships/add' style={{textDecoration:'none'}}>
                        <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Link>
                </Tooltip>
            </div>
            <Content className="m-2">
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
                    <FilterComponent onSearch={filterScholarships} name date />
                    <Row style={{ marginTop: 1 }}>
                        <Col span={24}>
                            <Card title="Scholarships" bordered style={{ borderRadius: '2px' }}>
                                <Table
                                    dataSource={filteredScholarships}
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
            </Content>
        </Layout>
    );
};

export default AdminScholarships;
