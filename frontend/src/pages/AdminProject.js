import React, { useState, useEffect } from 'react';
import { DeleteOutlined, HomeOutlined, ProjectOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, theme, Button, message, Layout, Breadcrumb, Tooltip } from 'antd';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProject, getProjects } from '../services/api';

const { Content } = Layout;

const AdminProjects = ({ onSetContent, API_URL }) => {
    const navigate = useNavigate();
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await getProjects(API_URL);
                setProjects(fetchedProjects);
                setFilteredProjects(fetchedProjects);
            } catch (error) {
                console.error("Error fetching projects!", error);
                message.error("There was an error fetching the projects!", 5);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, [API_URL]);

    // Delete a project
    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(API_URL, id);
            const updatedProjects = projects.filter(project => project.id !== id);
            setProjects(updatedProjects);
            setFilteredProjects(updatedProjects);
            navigate('/admin/projects');
            message.success("Project deleted successfully!", 5);
        } catch (error) {
            console.error("Error deleting project!", error);
            message.error("There was an error deleting the project!", 5);
        }
    };

    // Define table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true, // Shorten long descriptions
        },
        {
            title: 'Participants',
            dataIndex: 'participants',
            key: 'participants',
            render: (participants) => participants ? participants.length : 0,
        },
        {
            title: 'Ongoing',
            dataIndex: 'ongoing',
            key: 'ongoing',
            render: (ongoing) => ongoing ? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>,
        },
        {
            title: 'Media',
            dataIndex: 'media',
            key: 'media',
            render: (media) => {
                if (!media) return 0;
                const imageCount = media.images ? media.images.length : 0;
                const videoCount = media.videos ? media.videos.length : 0;
                return imageCount + videoCount;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" icon={<DeleteOutlined className='text-danger' />} onClick={() => handleDeleteProject(record.id)} />
            ),
        },
    ];

    // Filter projects based on user input
    const filterProjects = ({ itemName, dateRange }) => {
        let filtered = projects;

        if (itemName) {
            const searchTerm = itemName.toLowerCase();
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm)
            );
        }

        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(project => {
                const projectDate = new Date(project.start_date);
                return projectDate >= dateRange[0] && projectDate <= dateRange[1];
            });
        }

        setFilteredProjects(filtered);
    };

    // Handle row click to navigate to project details
    const handleRowClick = (record) => {
        navigate(`/admin/projects/${record.id}`);
    };

    // Display loading spinner while data is being fetched
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><ProjectOutlined /><span>Projects</span></>) },
                    ]}
                />
                <Tooltip title='Add Project'>
                    <Link to='/admin/projects/add' style={{ textDecoration: 'none' }}>
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
                    <FilterComponent onSearch={filterProjects} name={true} date={true} />
                    <div className="site-layout-background" style={{ padding: 8, minHeight: 380 }}>
                        <Row style={{ marginTop: 1 }}>
                            <Col span={24}>
                                <Card title="Projects" bordered={true} style={{ borderRadius: '2px' }}>
                                    <Table
                                        dataSource={filteredProjects}
                                        columns={columns}
                                        pagination={{ pageSize: 10 }}
                                        rowClassName="clickable-row"
                                        scroll={{ x: 'max-content' }}
                                        onRow={(record) => ({
                                            onClick: () => handleRowClick(record),
                                        })}
                                        rowKey="id" // Ensure a unique key for each row
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

export default AdminProjects;
