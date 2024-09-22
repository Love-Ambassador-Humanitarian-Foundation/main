import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Modal, Card as AntCard} from 'antd';
import LandingPageImg from '../assets/landingimg.jpg';
import VolunteerImg from '../assets/volunteerimg.jpg';
import { HeartFilled, BookFilled, ArrowRightOutlined,CalendarOutlined, DollarOutlined, UserAddOutlined, ProfileOutlined, BuildOutlined, PictureOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPeopleArrows} from '@fortawesome/free-solid-svg-icons';
import {Button, IconButton} from '../components/button';
import CustomAccordion from '../components/Accordion';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import {useUpdateLoginStatus} from '../hooks/hooks';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../assets/landing.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getAbout, getEvents, getPartners, getScholarships, getUsers } from '../services/api';

const LandingPage = ({API_URL,Companyname}) => {
    const {isLoggedIn,userDetails} = useUpdateLoginStatus(API_URL);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    // Modal state
    const [visible, setVisible] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);
    
    const [scholarships, setScholarships] = useState([]);
    const [partners, setPartners] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    const [activities, setActivities] = useState([
        { title: 'Scholarships', description: scholarships.length, color: '#044a18' },
        { title: 'Partners', description: partners.length, color: 'green' },
        { title: 'Volunteers', description: users.length, color: 'orange' },
        { title: 'Socials', description: data?.socials?.length || 0, color: '#04364a' },
        { title: 'Events', description: events.length, color: 'red' },
        { title: 'Branches', description: data?.branches?.length || 0, color: 'orangered' }
    ]);
    const slide_inner_item_style = {
        background: '#fff',
        borderRadius: '4px',
        border: '1px dotted #34356b',
        color: '#333',
        maxHeight: '16rem',
        fontSize: '1.5rem',
        marginBottom: '1rem',
    };
    const [imgHeight, setImgHeight] = useState('40vh');

    const setHeights = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let imgHeight;
    
        if (windowWidth <= 240) {
            imgHeight = '215vh';
        } else if (windowWidth <= 330) {
            imgHeight = '93vh';
        } else if (windowWidth <= 360) {
            imgHeight = '72vh';
        } else if (windowWidth <= 375) {
            if (windowHeight <= 670) {
                imgHeight = '74vh';
            } else if (windowHeight <= 813) {
                imgHeight = '60vh';
            } else {
                imgHeight = '72vh'; // Default for this range
            }
        } else if (windowWidth <= 390) {
            imgHeight = '60vh';
        } else if (windowWidth <= 416) {
            imgHeight = windowHeight <= 800 ? '64vh' : '56vh';
        } else if (windowWidth <= 430) {
            imgHeight = '53vh';
        } else if (windowWidth <= 459) {
            imgHeight = '66vh';
        } else if (windowWidth <= 574) {
            imgHeight = '67vh';
        } else if (windowWidth <= 720) {
            imgHeight = '60vh';
        } else if (windowWidth <= 768) {
            imgHeight = '38vh';
        } else if (windowWidth <= 820) {
            imgHeight = '30vh';
        } else if (windowWidth <= 912) {
            imgHeight = '30vh';
        } else if (windowWidth <= 1024) {
            imgHeight = windowHeight <= 1200 ? '62vh' : '28vh';
        } else if (windowWidth <= 1400) {
            if (windowHeight <= 720) {
                imgHeight = '60vh';
            } else if (windowHeight <= 820) {
                imgHeight = '50vh';
            } else {
                imgHeight = '70vh';
            }
        } else {
            imgHeight = '40vh';
        }
    
        setImgHeight(imgHeight);
        setIsMobile(windowWidth < 768);
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
        } else {
            console.error(`Index ${index} is out of bounds for images array`);
        }
    };
    // Show modal with achievement details
    const showModal = (activity) => {
        setCurrentActivity(activity);
        setVisible(true);
    };

    // Hide modal
    const handleCancel = () => {
        setVisible(false);
    };

    useEffect(() => {
        // Update the state when the component mounts
        setHeights();
        
        window.addEventListener('resize', setHeights);
        window.addEventListener('load', setHeights);
        
        const fetchData = async () => {
            const activitylist = []
            const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
            try{
                const fetchedScholarships = await getScholarships(API_URL,currentDate);
                activitylist.push({ title: 'Scholarships', description: fetchedScholarships.length, color: '#044a18' },)
                setScholarships(fetchedScholarships)
            }catch(error){
                if (error.response){
                    console.error(error.response.data.message);
                }
                else{
                    console.error(error.message);
                }  
            }
            try {
                const response = await getAbout(API_URL);
                activitylist.push({ title: 'Socials', description: response.socials?.length || 0, color: '#04364a' })
                activitylist.push({ title: 'Branches', description: response.branches?.length || 0, color: 'orangered' })
                
                setData(response);
            } catch (error) {
                if (error.response){
                    console.error(error.response.data.message);
                }
                else{
                    console.error(error.message);
                }   
            }
            try{
                const fetchedPartners = await getPartners(API_URL);
                activitylist.push({ title: 'Partners', description: fetchedPartners.length, color: 'green' })
                
                setPartners(fetchedPartners)
            }catch(error){
                if (error.response){
                    console.error(error.response.data.message);
                }
                else{
                    console.error(error.message);
                }  
            }
            try{
                const fetchedUsers = await getUsers(API_URL);
                activitylist.push({ title: 'Volunteers', description: fetchedUsers.length, color: 'orange' })
                
                setUsers(fetchedUsers)
            }catch(error){
                if (error.response){
                    console.error(error.response.data.message);
                }
                else{
                    console.error(error.message);
                }  
            }
            try{
                const fetchedEvents = await getEvents(API_URL);
                activitylist.push({ title: 'Events', description: fetchedEvents.length, color: 'red' })
                
                setEvents(fetchedEvents)
            }catch(error){
                if (error.response){
                    console.error(error.response.data.message);
                }
                else{
                    console.error(error.message);
                }  
            }
            setActivities(activitylist);
            
            setIsLoading(false);
        };

        // Cleanup function to remove the event listener when the component unmounts
        fetchData();
        
        
        return () => {
            window.removeEventListener('resize', setHeights);
            window.removeEventListener('load', setHeights);
        };

    }, [API_URL]);
    const help_act = [
        {
            title: { name: 'Socials', icon: <PictureOutlined style={{ color: 'green' }}  /> },
            description: 'Supports persons who are unable to help themselves.',
            btn: { link: '/about', hash:'#socials', text: 'View Social Media', icon: <ArrowRightOutlined style={{ color: 'green' }} /> }
        },
        {
            title: { name: 'Volunteer Program', icon: <UserAddOutlined style={{ color: 'orange' }} /> },
            description: 'Be a part of a dedicated volunteer group.',
            btn: { link: '/signup', text: 'Join Now', icon: <ArrowRightOutlined style={{ color: 'orange' }} /> }
        },
        {
            title: { name: 'Donations', icon: <DollarOutlined style={{ color: '#044a18' }} /> },
            description: 'Help provide resources to those in need.',
            btn: { link: '/contact', text: 'Donate Now', icon: <ArrowRightOutlined style={{ color: '#044a18' }} />,color: '#044a18' }
        },
        {
            title: { name: 'Events', icon: <CalendarOutlined style={{ color: 'red' }} /> },
            description: 'Join our events to support the cause.',
            btn: { link: '/events', text: 'View Events', icon: <ArrowRightOutlined style={{ color: 'red' }} />,color: 'red' }
        },
        {
            title: { name: 'Community Support', icon: <BuildOutlined style={{ color: '#04364a' }} /> },
            description: 'Help build stronger communities.',
            btn: { link: '/contact', text: 'Give Now', icon: <ArrowRightOutlined style={{ color: '#04364a' }} />,color: '#04364a' }
        },
        {
            title: { name: 'Scholarships', icon: <ProfileOutlined style={{ color: 'green' }} /> },
            description: 'Spread awareness for our cause.',
            btn: { link: '/scholarships', text: 'Learn More', icon: <ArrowRightOutlined style={{ color: 'green' }} /> , color:'green'}
        }
    ];
    
    
    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} /> {/* Include the header component */}
        
            <div style={{
                backgroundImage: `url(${LandingPageImg})`,
                backgroundSize: 'cover',
                height: imgHeight,
                zIndex: '-1',
                filter: 'brightness(30%)',
                width: '100%',
            }}>

            </div>
            
            <Container className="py-5" style={{ zIndex: '1', position: 'absolute', top: '200px', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="mt-5 mb-5"></div>
                <h1 className="text-center text-white mb-4 mt-5">Welcome to Our {data ? data.name:'LAHF'}</h1>
                <p className="text-center text-white mb-5">This is where we strive to create positive change and <br />support humanitarian causes around the globe.</p>
                <div className="d-flex justify-content-center">
                    <Button to="/signup" text="Volunteer" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
                    <span className="mx-3"></span>
                    <Button to='/about' text='Learn More' icon={<BookFilled style={{ color: '#ec3237' }} />}></Button>
                </div>
            </Container>
            <div className="row mt-3">
                <div className="col" style={{alignContent:'center'}}>
                    <Row className='p-1 m-0 ms-auto'>
                        
                        {activities.map((activity, index) => (
                            <Col key={index} xs={6} sm={4} md={3} lg={2} className='mb-2'>
                                <AntCard
                                    hoverable
                                    onClick={() => showModal(activity)}
                                    style={{padding:'0px',borderRadius:'0%'}}
                                >
                                    <Card.Body className='p-0'>
                                        <Card.Title>
                                            <h6 className="text-dark fw-bold">{activity.title}</h6>
                                        </Card.Title>
                                        <h2 className="fw-bold" style={{'color':activity.color}}>{activity.description}</h2>
                                    </Card.Body>
                                </AntCard>
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        title={currentActivity ? currentActivity.title : ''}
                        visible={visible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {currentActivity ? <p>{currentActivity.description}</p> : null}
                    </Modal>
                </div>
            </div>
            
            <h5 className="text-center text-dark fw-bold mt-4">Activities</h5>
            <Row className='row m-2' style={{backgroundColor: 'whitesmoke'}}>
                
                {isMobile ? (
                    <Col className='col-sm-12 col-md-8 align-self-center'>
                        {help_act.map((item, index)=>(
                            <Card className='col-sm-6 col-md-4 col-lg-4 mt-2' style={slide_inner_item_style}>
                                <Card.Body>
                                    <Card.Title>
                                        <IconButton style={{'color':item.btn.color}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={item.title.icon} size='xl' />} />
                                        <h6 className="text-dark fw-bold">{item.title.name}</h6>
                                    </Card.Title>
                                    <h6>{item.description}</h6>
                                    <div className='mb-5 mt-5'></div>
                                    <Button to={item.btn.link} text={item.btn.text} icon={item.btn.icon}></Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                ) :(
                    <>
                    
                        <Col className='col-sm-12 col-md-4 align-self-center '>
                            <Card style={{ width: '100%', marginLeft: '10px', border:'0px' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <h3 className="text-center text-dark fw-bold">You Can Help in different ways</h3>
                                    </Card.Title>
                                    <Card.Text>
                                        supports persons who are unable to help themselves.
                                    </Card.Text>
                                    <Button to='/about' text='Read More' icon={<ArrowRightOutlined style={{ color: '#ec3237' }} />}></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='col-sm-12 col-md-8 '>
                        <Swiper
                            cssMode={true}
                            autoplay={{ delay: 5000 }}
                            loop={true}
                            className="mySwiper"
                            modules={[Navigation, Pagination, Autoplay]}
                            style={{ height: '300px', width: '100%', backgroundColor: 'whitesmoke' }}
                            >     
                            <SwiperSlide className='row ms-1 mt-4'>
                                {help_act.slice(0,3).map((item, index)=>(
                                        <Card className='col-sm-6 col-md-4 col-lg-4 mt-2' style={slide_inner_item_style}>
                                            <Card.Body>
                                                <Card.Title>
                                                    <IconButton style={{'color':item.btn.color}} className='seedling-menu' hover={false} icon={item.title.icon} />
                                                    <h6 className="text-dark fw-bold">{item.title.name}</h6>
                                                </Card.Title>
                                                <h6>{item.description}</h6>
                                                <div className='mb-5 mt-5'></div>
                                                <Button to={item.btn.link} text={item.btn.text} icon={item.btn.icon}></Button>
                                            </Card.Body>
                                        </Card>
                                    ))}
                            </SwiperSlide>
                            <SwiperSlide className='row ms-2 mt-4'>
                                {help_act.slice(3,6).map((item, index)=>(
                                        <Card className='col-sm-6 col-md-4 col-lg-4 mt-2' style={slide_inner_item_style}>
                                            <Card.Body>
                                                <Card.Title>
                                                    <IconButton style={{'color':item.btn.color}} className='seedling-menu' hover={false} icon={item.title.icon} />
                                                    <h6 className="text-dark fw-bold">{item.title.name}</h6>
                                                </Card.Title>
                                                <h6>{item.description}</h6>
                                                <div className='mb-5 mt-5'></div>
                                                <Button to={item.btn.link} text={item.btn.text} icon={item.btn.icon}></Button>
                                            </Card.Body>
                                        </Card>
                                    ))}
                            </SwiperSlide>
                            
                        </Swiper>
                    </Col>
                    </>
                    
                )
                }
                
            </Row>
            <div className='mt-5 mb-5'>
                <h5 className="text-center text-dark fw-bold">About the Foundation</h5>
                <Row className='mt-5 mb-5'>
                
                    <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <CustomAccordion
                            onClick={(e) => switchImage(e)}
                            items={[
                                { title: 'History', content: data?.story, hash:'story' },
                                { title: 'Mission', content: data?.mission,hash:'mission' },
                                { title: 'Policies', content: data?.policies,hash:'policies' },
                                { title: 'Values', content: data?.values,hash:'values' },
                            ]}
                        />

                    </Col>
                    <Col className='col-12 col-sm-12 col-md-6 col-lg-6 align-self-center'>
                        <img src={image} className='img-fluid' alt='Services' height={'300px'} width={'100%'} style={{maxHeight:'300px', maxWidth:'100%'}}/>
                    </Col>
                </Row>
            </div>
      
            <div className='m-0 p-0 mb-2' style={{height:'340px', width:'100%'}}>
                <div style={{
                        position: 'relative',
                        height: '340px',
                    }}>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${VolunteerImg})`,
                                backgroundSize: 'cover',
                                zIndex: '-1',
                            }}
                        ></div>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here (0.5 for 50% opacity)
                                zIndex: '-1',
                            }}
                        ></div>
                        <Container className="py-5 d-flex flex-column justify-content-center align-items-center text-white">
                            <h1 className="text-center fw-bold mb-3 mt-3">Want to know how you can help?</h1>
                            <p className="text-center fw-bold mb-4">Join others in a quest to better the lives of others <br />support humanitarian causes around the globe.</p>
                            <div className="d-flex justify-content-center">
                                <Button to="/contact" text="Contact Us" icon={<FontAwesomeIcon icon={faPeopleArrows} style={{ 'color': '#ec3237' }} />} />
                            </div>
                        </Container>
                    </div>

    
            </div>  
        <Footer Companyname={Companyname} API_URL={API_URL}  /> {/* Include the footer component */}
    </>
  );
};

export default LandingPage;
