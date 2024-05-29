import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';
import { useNavigate, Link } from 'react-router-dom';
import { DeleteOutlined, FilterOutlined , HomeOutlined, EditOutlined, BranchesOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message,Layout, Breadcrumb  } from 'antd';

const { Content} = Layout;

const Branches = ({item}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    
    const [editpage,SetEditPage] = useState(false);
    const [branches, setBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${backendUrl}/api/v1/branches`)
            .then(response => {
                const fetchedBranches = response.data.data;
                setBranches(fetchedBranches);
                setFilteredBranches(fetchedBranches);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the branches!", error);
                setIsLoading(false);
                setBranches([{_id:'53545',name:"sfsdf",date:'2022-01-03'}]);
                setFilteredBranches([{_id:'53545',name:"sfsdf",date:'2022-01-03'}]);
                message.error("There was an error fetching the branches!", 5);
            });
    }, []);

    const deleteBranch = (id) => {
        axios.delete(`${backendUrl}/api/v1/branches/${id}`)
            .then(response => {
                const newBranches = branches.filter(branch => branch._id !== id);
                setBranches(newBranches);
                setFilteredBranches(newBranches);
                message.success("Branch deleted successfully!", 5);
            })
            .catch(error => {
                console.error("There was an error deleting the branch!", error);
                message.error("There was an error deleting the branch!", 5);
            });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/admin/branches/${record._id}`} className='text-decoration-none'>
                    <Button type="primary" >
                        {record.name}
                    </Button>
                </Link>
            ),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => deleteBranch(record._id)} />
            ),
        },
    ];

    const filterBranches = ({ itemName, dateRange }) => {
        let filtered = branches;

        if (itemName) {
            filtered = filtered.filter(branch => 
                branch.name.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(branch => {
                const branchDate = new Date(branch.date);
                return branchDate >= dateRange[0] && branchDate <= dateRange[1];
            });
        }

        setFilteredBranches(filtered);
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
                        { title: (<><BranchesOutlined /><span>Branches</span></>) },
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
            <FilterComponent onSearch={filterBranches} name={true} date={true} />
            <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                <Row style={{ marginTop: 1 }}>
                    <Col span={24}>
                        <Card title="Branches" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                            <Table
                                dataSource={filteredBranches}
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

export default Branches;
