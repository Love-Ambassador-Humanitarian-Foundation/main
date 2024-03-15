import React, { useState } from 'react';
import { Row, Col, Input, Modal } from 'antd';
import Timeline from '../components/Timeline';

const { Search } = Input;

const EventPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle opening the modal when an image or video is clicked
    const handleMediaClick = (media) => {
        setSelectedMedia(media);
        setModalVisible(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setSelectedMedia(null);
        setModalVisible(false);
    };

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
        <div className="container py-5">
            <h2 className="text-center mb-2 mt-5">Events</h2>
            <Row justify="center" className="mb-3">
                <Col span={24} xs={24} lg={12}>
                    {/* Search input */}
                    <Search
                        placeholder="Search events"
                        enterButton
                        allowClear
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
            </Row>
            {/* Timeline with filtered data */}
            <Timeline data={filteredData} onMediaClick={handleMediaClick} />
            {/* Modal for displaying selected media */}
            <Modal
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                closable={false}
                centered
                width={800} // Adjust modal width as needed
            >
                {/* Render image or video based on selectedMedia */}
                {selectedMedia && selectedMedia.type === 'image' && (
                    <img src={selectedMedia.src} alt={selectedMedia.alt} style={{ width: '100%', height: '70vh' }} />
                )}
                {selectedMedia && selectedMedia.type === 'video' && (
                    <video controls style={{ width: '100%' }}>
                        <source src={selectedMedia.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </Modal>
        </div>
    );
};

export default EventPage;
