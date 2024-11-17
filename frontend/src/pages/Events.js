import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Layout, Tag, Pagination } from 'antd';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useUpdateLoginStatus } from '../hooks/hooks';
import { getEvents } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterComponent from '../components/Filter';

const { Content } = Layout;

const EventPage = ({ Companyname, API_URL }) => {
    const navigate = useNavigate();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of items per page

    const fetchEvents = useCallback(async () => {
        try {
            const fetchedEvents = await getEvents(API_URL);
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);
        } catch (error) {
            console.error("Error fetching events", error);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const filterEvents = useCallback(({ itemName, dateRange }) => {
        let filtered = events;

        if (itemName) {
            const searchTerm = itemName.toLowerCase();
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toString().includes(searchTerm) ||
                event.eventtype.toLowerCase().includes(searchTerm) ||
                event.currency.toLowerCase().includes(searchTerm) ||
                event.duration.toLowerCase().includes(searchTerm)
            );
        }

        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(event => {
                const eventStartDate = new Date(event.start_date);
                const eventEndDate = new Date(event.end_date);
                return (eventStartDate >= startDate && eventStartDate <= endDate) || 
                       (eventEndDate >= startDate && eventEndDate <= endDate);
            });
        }

        setFilteredEvents(filtered);
        setCurrentPage(1); // Reset to the first page after filtering
    }, [events]);

    const renderTextWithBold = (text) => {
        // Split text based on '**' to identify bold sections
        const parts = text.split('**');
        let wordCount = 0;
        let result = [];
      
        for (let i = 0; i < parts.length; i++) {
          // Split each part into words
          const words = parts[i].split(/\s+/);
          
          // Check if adding this part would exceed the word limit
          if (wordCount + words.length > 25) {
            const remainingWords = 25 - wordCount;
      
            if (remainingWords > 0) {
              // Add only the remaining words to the result
              if (i % 2 === 0) {
                // Regular text
                result.push(words.slice(0, remainingWords).join(' '));
              } else {
                // Bold text
                result.push(<strong key={i}>{words.slice(0, remainingWords).join(' ')}</strong>);
              }
            }
            result.push('...'); // Add ellipsis to indicate truncation
            break; // Stop processing after reaching the word limit
          } else {
            // Add the whole part
            if (i % 2 === 0) {
              // Regular text
              result.push(parts[i]);
            } else {
              // Bold text
              result.push(<strong key={i}>{parts[i]}</strong>);
            }
            wordCount += words.length; // Update the word count
          }
        }
      
        return result;
      }; 


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

    const renderGridLayout = () => (
        <Row gutter={[16, 16]} className='mt-2'>
            {currentEvents.map(event => (
                <Col xs={24} sm={12} md={8} lg={6} key={event.id}>
                    <Card
                        title={event.title}
                        hoverable
                        onClick={() => handleRowClick(event)}
                    >
                        <p><Tag color="orange">{event.eventtype}</Tag></p>
                        <p style={{ textAlign: 'justify' }}>{renderTextWithBold(event.description)}</p>
                        <p><Tag color="grey">Start Date: {new Date(event.start_date).toLocaleDateString()}</Tag></p>
                        <p><Tag color="grey">End Date: {new Date(event.end_date).toLocaleDateString()}</Tag></p>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const handleRowClick = (record) => {
        navigate(`/events/${record.id}`);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout id='events'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <Content style={{ padding: '2px', background: '#fff', marginTop: '70px' }}>
                <div style={{ padding: 8, minHeight: 360, borderRadius: 8 }}>
                    <FilterComponent onSearch={filterEvents} name date />
                    {renderGridLayout()}
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={filteredEvents.length}
                        onChange={handlePageChange}
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL} />
        </Layout>
    );
};

export default EventPage;
