import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Modal, Card } from 'antd';
import { Link } from 'react-router-dom';

import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { Meta } = Card;

const options = [
    { title: 'Volunteer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', url: '/volunteer' },
    { title: 'Donate', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', url: '/payment/donation' },
    { title: 'Partnership', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', url: '/partner' },
    { title: 'Fundraising', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', url: '/payment/fundraising' },
];

const ContributePage = ({ Companyname, isloggedIn }) => {
    const [visible, setVisible] = useState(false);
    const [currentOption, setCurrentOption] = useState(null);

    const showModal = (option) => {
        setCurrentOption(option);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} />
            <div className="container py-5">
                <hr />
                <div className="row mt-5">
                    <div className="col">
                        <h2 className="mb-4 text-center">Contribute</h2>
                        <Row className="justify-content-center">
                            {options.map((option, index) => (
                                <Col key={index} xs={24} sm={12} md={6} lg={4} className="mb-4">
                                    <Link to={option.url} style={{ textDecoration: 'none' }}>
                                        <Card hoverable onClick={() => showModal(option)}>
                                            <Meta title={option.title} description={option.description} />
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                        <Modal
                            title={currentOption ? currentOption.title : ''}
                            visible={visible}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            {currentOption ? <p>{currentOption.description}</p> : null}
                        </Modal>
                    </div>
                </div>
            </div>
            <Footer Companyname={Companyname} />
        </>
    );
};

export default ContributePage;
