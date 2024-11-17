import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, message, Layout, Pagination } from 'antd';
import FilterComponent from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUpdateLoginStatus } from '../hooks/hooks';
import { getScholarships } from '../services/api';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const Scholarships = ({ API_URL, Companyname }) => {
    const navigate = useNavigate();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);

    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of items per page

    // Fetch scholarships from the API
    const fetchScholarships = useCallback(async () => {
        try {
            const currentDate = new Date().toISOString().split('T')[0];
            const fetchedScholarships = await getScholarships(API_URL, currentDate);
            setScholarships(fetchedScholarships);
            setFilteredScholarships(fetchedScholarships);
        } catch (error) {
            console.error("Error fetching scholarships", error);
            message.error("There was an error fetching the scholarships!", 5);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchScholarships();
    }, [fetchScholarships]);

    // Filter scholarships based on search criteria
    const filterScholarships = useCallback(({ itemName, dateRange }) => {
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
        setCurrentPage(1); // Reset to the first page after filtering
    }, [scholarships]);

    // Handle row click to navigate to scholarship details
    const handleRowClick = (record) => {
        navigate(`/scholarships/${record.id}`);
    };

    // Render scholarships in grid layout
    const renderGridLayout = () => (
        <Row gutter={[16, 16]} className='mt-2'>
            {currentScholarships.map(scholarship => (
                <Col xs={24} sm={12} md={8} lg={6} key={scholarship.id}>
                    <Card
                        title={scholarship.name}
                        hoverable
                        onClick={() => handleRowClick(scholarship)}
                    >
                        <p>Year: {scholarship.year}</p>
                        <p>Amount: {scholarship.currency} {scholarship.amount_approved}</p>
                        <p>Duration: {scholarship.duration} {scholarship.is_expired ? <span className="text-danger">(Expired)</span> : <span className="text-success">(Ongoing)</span>}</p>
                        <p>Created Date: {scholarship.created_date}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    // // Render scholarships in list layout
    // const renderListLayout = () => (
    //     <Row gutter={[16, 16]}>
    //         {currentScholarships.map(scholarship => (
    //             <Col xs={24} key={scholarship.id}>
    //                 <Card
    //                     hoverable
    //                     onClick={() => handleRowClick(scholarship)}
    //                 >
    //                     <Row>
    //                         <Col span={8}>
    //                             <strong>{scholarship.name}</strong>
    //                         </Col>
    //                         <Col span={4}>
    //                             {scholarship.year}
    //                         </Col>
    //                         <Col span={4}>
    //                             {scholarship.currency} {scholarship.amount_approved}
    //                         </Col>
    //                         <Col span={4}>
    //                             {scholarship.duration} {scholarship.is_expired ? <span className="text-danger">(Expired)</span> : <span className="text-success">(Ongoing)</span>}
    //                         </Col>
    //                         <Col span={4}>
    //                             {scholarship.created_date}
    //                         </Col>
    //                     </Row>
    //                 </Card>
    //             </Col>
    //         ))}
    //     </Row>
    // );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentScholarships = filteredScholarships.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout id='scholarships'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '2px', background: '#fff', marginTop: '70px' }}>
                <div style={{ padding: 8, minHeight: 360, borderRadius: 8 }}>
                    <FilterComponent onSearch={filterScholarships} name date />
                    
                    {/* {viewMode === 'grid' ? renderGridLayout() : renderListLayout()} */}
                    {renderGridLayout()}
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={filteredScholarships.length}
                        onChange={handlePageChange}
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL} />
        </Layout>
    );
};

export default Scholarships;
