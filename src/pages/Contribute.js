import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Modal, Card} from 'antd';
import { Link } from 'react-router-dom';
import LandingPageImg from '../assets/landingimg.jpg';
import VolunteerImg from '../assets/volunteerimg.jpg';
import { HeartFilled, BookFilled, ArrowRightOutlined, PlusOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSeedling,faPeopleArrows,faUsersViewfinder,faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons';
import {Button, IconButton} from '../components/button';
import CustomAccordion from '../components/Accordion';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../assets/landing.jpg';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
const { Meta } = Card;
const ContributePage = ({Companyname, isloggedIn}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const options = [
        { title: 'Volunteer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',url:'/volunteer' },
        { title: 'Donate', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',url:'/payment/donation' },
        { title: 'Partnership', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',url:'/partner' },
        { title: 'Fundraising', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',url:'/payment/fundraising' },
        
    ];
    // Modal state
    const [visible, setVisible] = useState(false);
    const [currentoption, setCurrentOption] = useState(null);

    // Show modal with achievement details
    const showModal = (achievement) => {
        setCurrentOption(achievement);
        setVisible(true);
    };

    // Hide modal
    const handleCancel = () => {
          setVisible(false);
      };
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

    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} /> {/* Include the header component */}
            <div className="container py-5">
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h2 className="mb-4 text-center">Contribute</h2>
                    <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}}>
                        {options.map((option, index) => (
                            <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12} style={{flex:1,marginBottom: 8}}>
                                <Link to={option.url}style={{ textDecoration: 'none' }}>
                                    <Card hoverable onClick={() => showModal(option)}>
                                        <Meta title={option.title} description={option.description} />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        title={currentoption ? currentoption.title : ''}
                        visible={visible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {currentoption ? <p>{currentoption.description}</p> : null}
                    </Modal>
                </div>
            </div>
                
            </div>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </>
        
    );
};

export default ContributePage;