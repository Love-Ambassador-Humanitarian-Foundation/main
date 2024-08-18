import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Input, Button , theme, message, Layout, Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import DateTimeInput from '../components/DateTimeSetter';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { SaveOutlined, HomeOutlined, EditOutlined, EnvironmentOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const Branch = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const { id } = useParams();
    //console.log("==========",id);
    const [editpage, setEditPage] = useState(false);
    const [about, setAbout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [name, setName] = useState('Main Branch');
    const [location, setLocation] = useState('123 Main Street, City, Country');
    const [date, setDate] = useState('2024-06-04T09:37:17.716028Z');
    useEffect(() => {
        axios.get(`${API_URL}/api/about`)
            .then(response => {
                //console.log(response.data.response)
                setAbout(response.data.response);
                const fetchedBranches = response.data.response.branches ||response.data.data.branches;
                const branches = fetchedBranches.filter(branch => branch.id === id);
                setBranches(branches)
                const branch = branches[0];
                
                setName(branch.name);
                setLocation(branch.location);
                setDate(branch.date_created);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the branches!", error);
                setIsLoading(false);
                message.error("There was an error fetching the branches!", 5);
            });
    }, [API_URL,id]);

    const saveEdit = async() => {
        setLoading(true);
        const token = localStorage.getItem('lahf_access_token');

        // Assuming 'about' is an object that contains 'formData'
        const formData = about;

        // Find the branch by id from the 'branches' array
        const branch = branches.find(branch => branch.id === id);

        if (branch) {
            // Update the branch details
            branch.name = name;
            branch.location = location;
            branch.date_created = date;

            // Update the corresponding branch in the formData
            formData.branches = formData.branches.map(b => b.id === id ? branch : b);
            // Log the formData content for debugging
            console.log(formData);
        
            try {
                const response = await axios.put(`${API_URL}/api/about`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setAbout(response.data.response);
                const fetchedBranches = response.data.response.branches ||response.data.data.branches;
                const branches = fetchedBranches.filter(branch => branch.id === id);
                setBranches(branches)
                const branch = branches[0];
                
                setName(branch.name);
                setLocation(branch.location);
                setDate(branch.date_created);
                
                setEditPage(false);
                message.success('branch details updated');
            } catch (error) {
                console.error('Error updating branch details:', error);
                message.error('Error updating branch details');
            }
        } else {
            console.error(`Branch with id ${id} not found.`,branches);
        }

        
        setLoading(false);
    }

    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'location') {
            setLocation(e.target.value);
        } else if (e.target.id === 'date') {
            setDate(e.target.value);
        }
    };
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
                    <Breadcrumb.Item href='/#/admin/branches' className='text-decoration-none'>
                        <BankOutlined />
                        <span>Branches</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>{name}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={() => setEditPage(!editpage)} />
            </div>
            <Content className='m-2'>
                <div style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusXS,
                    height: 'calc(100vh - 140px)'
                }}>
                    <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                        <Col xs={24} sm={24} md={16} lg={12} xl={12} style={{ backgroundColor: '#d7d7e9' }}>
                            <div className='d-flex flex-column justify-content-between align-items-center p-2'>
                                <EnvironmentOutlined style={{ fontSize: 100, color: '#FFD700' }} />
                                <Title level={3}>Branch Details</Title>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col xs={24} sm={24} md={16} lg={12} xl={12}>
                            <div className='d-flex flex-column justify-content-left p-2'>
                                <Text strong>
                                    Name: <Input id="name" type="text" className="form-control" placeholder="Name" value={name} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Location: <Input id="location" type="text" className="form-control" placeholder="Location" value={location} onChange={handleInputChange} disabled={!editpage} />
                                </Text>
                                <Text strong>
                                    Date: <DateTimeInput date={true} defaultValue={date} onChange={setDate} disabled={!editpage} />
                                </Text>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                        {editpage ? (
                            <Col>
                                <Button type="primary" className='text-white' loading={loading} icon={<SaveOutlined className='text-white' />} onClick={saveEdit} >Save Changes</Button>  
                            </Col>
                        ) : (
                            <Col>
                                <Button type="primary" className='text-white' onClick={() => setEditPage(true)} >Edit Branch</Button>
                            </Col>
                        )}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Branch;
