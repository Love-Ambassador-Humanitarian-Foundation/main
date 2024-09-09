import React, { useState, useEffect} from 'react';
import { Row, Col, Card, Pagination, Modal,Typography } from 'antd';
import img1 from '../assets/landing.jpg';
import CustomAccordion from '../components/Accordion';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUpdateLoginStatus } from '../hooks/hooks';
const { Meta } = Card;
const { Text } = Typography;

const AboutPage = ({API_URL,Companyname}) => {
    const location = useLocation();
    const {isLoggedIn,userDetails} = useUpdateLoginStatus(API_URL);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Dummy data for team members
    const teamMembers = [
        { name: 'Mr Ifeanyi Onyenoro', position: 'Co-Founder', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Mrs Esther Onyenoro', position: 'Co-Founder', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Alice Johnson', position: 'Lead Developer', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Bob Brown', position: 'Designer', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Bob Brown', position: 'Designer', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Bob Brown', position: 'Designer', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Bob Brown', position: 'Designer', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ];

    // Dummy data for achievements
    const achievements = [
        { title: 'Award 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Award 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Award 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        // Add more achievements as needed
    ];
    const items = [
        { title: 'Fundraising', content: 'Ongoing: mama davis orphanage',link:'/payment' },
        { title: 'Volunteering', content: 'Ongoing: Join Us as as volunteeer' },
        { title: 'Donation', content: 'Not Ongoing: ...',link:'/payment' },
        { title: 'Seminars', content: 'Not Ongoing: Location -> 32 badagri road, bla bla' },
        { title: 'Awareness', content: 'Not Ongoing: Facebook link' },
        { title: 'Branches', content: 'Ongoing: 64 branches: (1.Lagos), (2.Lagos), (3.Lagos),' },
    ];
    const bankaccounts =[
        {currency: 'NGN', number: '1234567890', sortcode: '00-00-00',bankname:'Access Bank', holdername:'John Doe'},
        {currency: 'USD', number: '0987654321', sortcode: '11-11-11',bankname:'Guaranty Trust Bank', holdername:'David John'}
    ]

    // Paginate team members
    const pageSize = 4; // Number of team members per page
    const totalMembers = teamMembers.length;
    //const totalPages = Math.ceil(totalMembers / pageSize);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Slice team members based on pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMembers = teamMembers.slice(startIndex, endIndex);

    // Modal state
    const [visible, setVisible] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState(null);

    // Show modal with achievement details
    const showModal = (achievement) => {
        setCurrentAchievement(achievement);
        setVisible(true);
    };

    // Hide modal
    const handleCancel = () => {
          setVisible(false);
      };
      const images = [
        { img: img1 },
        { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { img: img1 },
        { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }
    ];
    
    const [image, setImage] = useState(images.length > 0 ? images[0].img : '');
    
    const switchImage = (index) => {
        if (images.length > index) {
            setImage(images[index].img);
            console.log(image);
        } else {
            console.error(`Index ${index} is out of bounds for images array`);
        }
    };
    const fetchData = async (API_URL) => {
        try {
          const response = await axios.get(API_URL+'/api/about');
          setData(response.data.data);
          setIsLoading(false);
          console.log(response.data);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
          console.log(error);
        }
      };
    
    function scrolltotop(hash){
        if (hash === '#accountdetails'){
            const accountDetails = document.getElementById(hash.replace('#',''));
            if (accountDetails) {
                accountDetails.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
        }
        // if (hash === '#socials'){
        //     const socials = document.getElementById(hash.replace('#',''));
        //     if (socials) {
        //         socials.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        //     }
        // }
    }
    scrolltotop(location.hash);

    useEffect(() => {
        fetchData(API_URL);
    }, [API_URL]);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
      
    
    return (
        <div id='about'>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Include the header component */}
            <div className="container py-5">
            <div className="row align-items-center mt-4">
                <div className="col-xs-12 col-md-6">
                    <img src={img1} alt="About Us" className="img-fluid mt-2" width={'100%'} />
                </div>
                <div className="col-xs-12 col-md-6">
                    <div className="text-center text-md-start">
                        <h2 className="mb-4">Our Story</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non ipsum libero. Proin euismod metus nec sapien ultricies, ac consectetur ligula tristique.
                        </p>
                        <p>
                            Nullam suscipit eget felis id interdum. Sed ut eros vitae justo convallis placerat. Vestibulum nec faucibus felis, vel sagittis nisi.
                        </p>
                        <p>
                            Integer nec ipsum ac velit sollicitudin ultrices. Vestibulum quis eros eget turpis cursus aliquet.
                        </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h2 className="mb-4 text-center">Our Mission</h2>
                    <p className="text-center">
                        {data.about}
                    </p>
                </div>
            </div>
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h2 className="mb-4 text-center">Our Values</h2>
                    <p className="text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non ipsum libero. Proin euismod metus nec sapien ultricies, ac consectetur ligula tristique.
                    </p>
                </div>
            </div>
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h2 className="mb-4 text-center">Our Team</h2>
                    <Row gutter={[16, 16]}>
                        {paginatedMembers.map((member, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={<img alt="Team Member" src={member.image} />}
                                >
                                    <Meta title={member.name} description={member.position} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        className="mt-4"
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalMembers}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h2 className="mb-4 text-center">Our Achievements</h2>
                    <Row gutter={[16, 16]}>
                        {achievements.map((achievement, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card hoverable onClick={() => showModal(achievement)}>
                                    <Meta title={achievement.title} description={achievement.description} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        title={currentAchievement ? currentAchievement.title : ''}
                        visible={visible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {currentAchievement ? <p>{currentAchievement.description}</p> : null}
                    </Modal>
                </div>
            </div>
            <hr />
            <div className='mt-5 mb-3'>
                <h5 className="text-center text-dark fw-bold">Activities</h5>
                <Row className='mt-5 mb-2'>
                
                    <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <CustomAccordion
                            onClick={(e) => switchImage(e)}
                            items={items}
                            isloggedIn={isLoggedIn}
                        />

                    </Col>
                    <Col className='col-12 col-sm-12 col-md-6 col-lg-6 align-self-center'>
                        <img src={image} className='img-fluid' alt='Services' height={'300px'} width={'100%'} style={{maxHeight:'300px', maxWidth:'100%'}}/>
                    </Col>
                </Row>
                
            </div>
            
            <div id='accountdetails'>
                <h5 className="text-center text-dark fw-bold">Account Details</h5>
                <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}}>
                
                    {bankaccounts.map((account, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12} style={{flex:1,marginBottom: 8}} className='p-1'>
                            <Card hoverable >
                                <div className='d-flex flex-column justify-content-left'>
                                    {account.currency ? <Text strong>Currency: {account.currency}</Text> : null}
                                    {account.number ? <Text strong>Account Number: {account.number}</Text> : null}
                                    {account.sortcode ? <Text strong>Sort Code: {account.sortcode}</Text> : null}
                                    {account.iban ? <Text strong>IBAN: {account.iban}</Text> : null}
                                    {account.swiftbic ? <Text strong>SWIFT: {account.swiftbic}</Text> : null}
                                    {account.bankname ? <Text strong>Bank Name: {account.bankname}</Text> : null}
                                    {account.holdername ? <Text strong>Account Holder's Name: {account.holdername}</Text> : null}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div id='socials'>
                <h5 className="text-center text-dark fw-bold">Social Media</h5>
                <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}}>
                
                    {bankaccounts.map((account, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12} style={{flex:1,marginBottom: 8}} className='p-1'>
                            <Card hoverable >
                                <div className='d-flex flex-column justify-content-left'>
                                    {account.currency ? <Text strong>Currency: {account.currency}</Text> : null}
                                    {account.number ? <Text strong>Account Number: {account.number}</Text> : null}
                                    {account.sortcode ? <Text strong>Sort Code: {account.sortcode}</Text> : null}
                                    {account.iban ? <Text strong>IBAN: {account.iban}</Text> : null}
                                    {account.swiftbic ? <Text strong>SWIFT: {account.swiftbic}</Text> : null}
                                    {account.bankname ? <Text strong>Bank Name: {account.bankname}</Text> : null}
                                    {account.holdername ? <Text strong>Account Holder's Name: {account.holdername}</Text> : null}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            
            </div>
            <Footer Companyname={data?.name || Companyname} /> {/* Include the footer component */}
        </div>
        
    );
};

export default AboutPage;
