import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Layout, Tag, Pagination } from 'antd';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useUpdateLoginStatus } from '../hooks/hooks';
import { getProjects } from '../services/api'; // Fetch projects instead of profiles
import LoadingSpinner from '../components/LoadingSpinner';
import FilterComponent from '../components/Filter';

const { Content } = Layout;

const ProjectPage = ({ Companyname, API_URL }) => {
    const navigate = useNavigate();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    // Fetch projects data
    const fetchProjects = useCallback(async () => {
        try {
            const fetchedProjects = await getProjects(API_URL); // Fetch projects instead of profiles
            setProjects(fetchedProjects);
            setFilteredProjects(fetchedProjects);
        } catch (error) {
            console.error("Error fetching projects", error);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    // Effect to load data on mount
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Filter projects based on search term and date range
    const filterProjects = useCallback(({ itemName, dateRange }) => {
        let filtered = projects;

        if (itemName) {
            const searchTerm = itemName.toLowerCase();
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.category.toLowerCase().includes(searchTerm) ||
                project.currency.toLowerCase().includes(searchTerm) ||
                project.duration.toLowerCase().includes(searchTerm)
            );
        }

        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(project => {
                const projectStartDate = new Date(project.start_date);
                const projectEndDate = new Date(project.end_date);
                return (
                    (projectStartDate >= startDate && projectStartDate <= endDate) ||
                    (projectEndDate >= startDate && projectEndDate <= endDate)
                );
            });
        }

        setFilteredProjects(filtered);
        setCurrentPage(1); // Reset to first page after filtering
    }, [projects]);

    // Render bold text for descriptions, and truncate if necessary
    const renderTextWithBold = (text) => {
        const parts = text.split('**');
        let wordCount = 0;
        let result = [];

        for (let i = 0; i < parts.length; i++) {
            const words = parts[i].split(/\s+/);

            if (wordCount + words.length > 25) {
                const remainingWords = 25 - wordCount;
                if (remainingWords > 0) {
                    result.push(
                        i % 2 === 0
                            ? words.slice(0, remainingWords).join(' ')
                            : <strong>{words.slice(0, remainingWords).join(' ')}</strong>
                    );
                }
                result.push('...'); // Add ellipsis for truncation
                break;
            } else {
                result.push(i % 2 === 0 ? parts[i] : <strong key={i}>{parts[i]}</strong>);
                wordCount += words.length;
            }
        }

        return result;
    };

    // Handle page change for pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

    // Handle card row click
    const handleRowClick = (record) => {
        navigate(`/projects/${record.id}`); // Navigates to project details page
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout id='projects'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '2px', background: '#fff', marginTop: '70px' }}>
                <div style={{ padding: 8, minHeight: 360, borderRadius: 8 }}>
                    <FilterComponent onSearch={filterProjects} name date />
                    <Row gutter={[16, 16]} className='mt-2'>
                        {currentProjects.map(project => (
                            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
                                <Card title={project.title} hoverable onClick={() => handleRowClick(project)}>
                                    <p><Tag color="blue">{project.participants?.length||0} participants</Tag></p>
                                    <p style={{ textAlign: 'justify' }}>{renderTextWithBold(project.description)}</p>
                                    <p><Tag color="grey">Start Date: {new Date(project.start_date).toLocaleDateString()}</Tag></p>
                                    <p><Tag color="grey">End Date: {new Date(project.end_date).toLocaleDateString()}</Tag></p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={filteredProjects.length}
                        onChange={handlePageChange}
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL} />
        </Layout>
    );
};

export default ProjectPage;
