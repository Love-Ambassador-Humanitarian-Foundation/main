import React, { useState } from 'react';
import { Row, Col, Input} from 'antd';
import Timeline from '../components/Timeline';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
const { Search } = Input;

const EventPage = ({Companyname, isloggedIn}) => {
    
    const [searchQuery, setSearchQuery] = useState('');

    
    // Example timeline data (replace with actual data)
    const timelineData = [
        {
            date: '2023-01-01',
            title: 'Event Title 1',
            description: 'Description for Event 1',
            media: [
                { type: 'image', src: 'https://via.placeholder.com/150', alt: 'Image 2' },
                { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 2' }
            ]
        },
        {
            date: '2023-02-01',
            title: 'Event Title 2',
            description: 'Description for Event 2',
            media: [
                { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 2' },
                { type: 'image', src: 'https://via.placeholder.com/150', alt: 'Image 2' },
                { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 2' }
            ]
        }
    ];

    // Filtered timeline data based on search query
    const filteredData = timelineData.filter((event) => {
        const searchText = searchQuery.toLowerCase();
        return (
            event.date.includes(searchText) ||
            event.title.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText) ||
            event.media.some((media) => media.alt.toLowerCase().includes(searchText))
        );
    });

    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} /> {/* Include the header component */}
            <div className="container py-5">
                <h2 className="text-center mb-2 mt-5">Events</h2>
                <Row justify="center" className="mb-3">
                    <Col span={24} xs={24} lg={12}>
                        {/* Search input */}
                        <Search
                            placeholder="Search events"
                            enterButton
                            allowClear
                            onChange = {(e) => setSearchQuery(e.target.value)}
                        />
                    </Col>
                </Row>
                {/* Timeline with filtered data */}
                <Timeline data={filteredData} />
                
            </div>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </>
        
    );
};

export default EventPage;
