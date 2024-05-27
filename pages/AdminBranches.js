import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Button, message, theme } from 'antd';
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendUrl } from '../utils/utils';

const Branches = () => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
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
    );
};

export default Branches;