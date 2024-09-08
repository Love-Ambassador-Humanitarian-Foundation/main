import React, { useState, useEffect,useCallback  } from 'react';
import axios from 'axios';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, FilterOutlined , HomeOutlined, PlusOutlined, BankOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message,Layout, Breadcrumb  } from 'antd';

const { Content} = Layout;

const Branches = ({API_URL}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [about, setAbout]  = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/about`);
                const aboutData = response.data.data;
                
                console.log(aboutData);
                
                setAbout(aboutData);
    
                // Ensure branches exist in the response before setting the state
                if (aboutData.branches) {
                    const fetchedBranches = aboutData.branches;
                    setBranches(fetchedBranches);
                    setFilteredBranches(fetchedBranches);
                } else {
                    setBranches([]);  // Set empty array if no branches
                    setFilteredBranches([]);
                }
    
                setIsLoading(false);
            } catch (error) {
                console.error("There was an error fetching the branches!", error);
                setIsLoading(false);
                //message.error("There was an error fetching the branches!", 5);
            }
        };
    
        fetchAboutData();
    }, [API_URL]);
    

    const deleteBranch = async(id) => {
        setLoading(true);
        const formData = about;
        formData.branches = branches.filter(branch => branch.id !== id)
    
        // Log the formData content for debugging
        console.log(formData);
    
        try {
            const response = await axios.put(`${API_URL}/api/about`, formData, {

            });
            setAbout(response.data.data);
            const about = response.data.data.branches;
            setBranches(about);
            setFilteredBranches(about);
            message.success('branch details updated');
            //console.log('branch details updated:', about);
        } catch (error) {
            console.error('Error updating branch details:', error);
            message.error('Error updating branch details');
        }
        setLoading(false);
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
            dataIndex: 'date_created',
            key: 'date_created',
        },
        {
            render: (text, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-white' />} loading={loading && record.id} onClick={() => deleteBranch(record.id)} />
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
    const handleRowClick = useCallback((record) => {
        navigate(`/admin/branches/${record.name}`);
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
                        { title: (<><BankOutlined /><span>Branches</span></>) },
                    ]}
                />
                <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 10,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
            <FilterComponent onSearch={filterBranches} name={true} date={true} />
            <div className="site-layout-background" style={{ padding: 2, minHeight: 380 }}>
                <Row style={{ marginTop: 1 }}>
                    <Col span={24}>
                        <Card title="Branches" extra={<FilterOutlined style={{ cursor: 'pointer' }} />} bordered={true} style={{ borderRadius: '2px' }}>
                            <Table
                                dataSource={filteredBranches}
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

export default Branches;
