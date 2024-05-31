import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Modal, Card as AntCard} from 'antd';
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

const LandingPage = ({API_URL, isloggedIn}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    // Modal state
    const [visible, setVisible] = useState(false);
    const [currentactivitiy, setCurrentActivity] = useState(null);
    const slide_inner_item_style = {
        background: '#fff',
        borderRadius: '4px',
        border: '1px dotted #34356b',
        color: '#333',
        maxHeight:'16rem',
        fontSize: '1.5rem',
        marginBottom: '1rem',
    };
    const [imgheight, SetImgHeight] = useState('40vh');
    const setHeights = () => {
      const windowWidth = window.outerWidth;
      let imgHeight;
      if (windowWidth <= 240) {
        imgHeight = '215vh';
      } else if (windowWidth <= 330) {
        imgHeight = '93vh';
      }else if (windowWidth <= 360) {
        imgHeight = '72vh';
      } else if (windowWidth <= 375) {
        
        if (window.outerHeight <= 670) {
          imgHeight = '74vh';
        }else if(window.outerHeight <= 813) {
          imgHeight = '60vh';
        }
      } else if (windowWidth <= 390) {
        imgHeight = '60vh';
      } else if (windowWidth <= 416) {
        imgHeight = '56vh';
        if (window.outerHeight <= 800) {
          imgHeight = '64vh';
        }
      }else if (windowWidth <= 430) {
        imgHeight = '53vh';
      } else if (windowWidth <= 459) {
        imgHeight = '66vh';
      } else if (windowWidth <= 574) {
        imgHeight = '67vh';
        
      } else if (windowWidth <= 720) {
        
        imgHeight = '60vh';
      }else if (windowWidth <= 768) {
        imgHeight = '38vh';
      } else if (windowWidth <= 820) {
        imgHeight = '30vh';
      }else if (windowWidth <= 912) {
        imgHeight = '30vh';
      } else if (windowWidth <= 1024) {
        if (window.outerHeight <= 1200) {
          
          imgHeight = '62vh';
        }else{
          imgHeight = '28vh';
        }
      } else if (windowWidth <= 1400) {
        console.log(window.outerHeight+'------===-------')
        
        if (window.outerHeight <= 720) {
          imgHeight = '60vh';
        }else if (window.outerHeight <= 820) {
          imgHeight = '50vh';
        }else{
          imgHeight = '34vh';
        }
      }else {
        imgHeight = '40vh';
      }
      
    
      SetImgHeight(imgHeight);
      setIsMobile(window.innerWidth < 768);
    };
    
    const images = [
        { img: img1 },
        { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { img: img1 },
        { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }
    ];
    const activities = [
        { title: 'Donations', description: '$400K+', color:'#044a18' },
        { title: 'Partners', description: '1k',color:'green'  },
        { title: 'Volunteers', description: '29',color:'orange'  },
        { title: 'Achievements', description: '3',color:'#04364a'  },
        { title: 'Seminars', description: '7',color:'red'  },
        { title: 'Branches', description: '1',color:'orangered'  }
        // Add more achievements as needed
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
        setHeights();
    
        window.addEventListener('resize', setHeights);
        window.addEventListener('load', setHeights);
        const fetchData = async (API_URL) => {
            try {
              const response = await axios.get(API_URL+'/api/');
              setData(response.data.response);
              setIsLoading(false);
              console.log(response.data);
            } catch (error) {
              setError(error.message);
              setIsLoading(false);
              console.log(error);
            }
            
          };
    
        // Cleanup function to remove the event listener when the component unmounts
        fetchData(API_URL);
        return () => {
          window.removeEventListener('resize', setHeights);
          window.removeEventListener('load', setHeights);
        };
        
      }, [API_URL]);
      if (isLoading) {
            return <LoadingSpinner/>;
      }
    
      if (error) {
            return <div>Error: {error}</div>;
      }
    return (
        <>
            <HeaderComponent Companyname={data.name} isloggedIn={isloggedIn} /> {/* Include the header component */}
        
            <div style={{
                backgroundImage: `url(${LandingPageImg})`,
                backgroundSize: 'cover',
                height: imgheight,
                zIndex: '-1',
                filter: 'brightness(30%)',
                width: '100%',
            }}>

            </div>
            
            <Container className="py-5" style={{ zIndex: '1', position: 'absolute', top: '200px', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="mt-5 mb-5"></div>
                <h1 className="text-center text-white mb-4 mt-5">Welcome to Our {data.name}</h1>
                <p className="text-center text-white mb-5">This is where we strive to create positive change and <br />support humanitarian causes around the globe.</p>
                <div className="d-flex justify-content-center">
                    <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
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
                        title={currentactivitiy ? currentactivitiy.title : ''}
                        visible={visible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {currentactivitiy ? <p>{currentactivitiy.description}</p> : null}
                    </Modal>
                </div>
            </div>
            
            <h5 className="text-center text-dark fw-bold mt-4">Activities</h5>
            <Row className='row m-2' style={{backgroundColor: 'whitesmoke'}}>
                
                {isMobile ? (
                    <Col className='col-sm-12 col-md-8 align-self-center'>
                        <Card className='col-sm-6 col-md-4 col-lg-4 mt-2' style={slide_inner_item_style}>
                            <Card.Body>
                                <Card.Title>
                                    <IconButton style={{'color':'green'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                    <h6 className="text-dark fw-bold">Fund Raiser</h6>
                                </Card.Title>
                                <h6>supports persons who are unable to help themselves.</h6>
                                <div className='mb-5 mt-5'></div>
                                <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'green' }} />}></Button>
                            </Card.Body>
                        </Card>
                        <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                            <Card.Body>
                                <Card.Title>
                                    <IconButton style={{'color':'orange'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faUsersViewfinder} size='xl' />} />
                                    <h6 className="text-dark fw-bold">Be A Volunteer</h6>
                                </Card.Title>
                                <h6>supports persons who are unable to help themselves.</h6>
                                <div className='mb-5 mt-5'></div>
                                <Button to='/about' text='Join Now' icon={<PlusOutlined style={{ color: 'orange' }} />}></Button>
                            </Card.Body>
                        </Card>
                        <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                            <Card.Body>
                                <Card.Title>
                                    <IconButton style={{'color':'#044a18'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faHandHoldingDollar} size='xl' />} />
                                    <h6 className="text-dark fw-bold">Give Donation</h6>
                                </Card.Title>
                                <h6>supports persons who are unable to help themselves.</h6>
                                <div className='mb-5 mt-5'></div>
                                <Button to='/about' text='Donate Now' icon={<PlusOutlined style={{ color: '#044a18' }} />}></Button>
                            </Card.Body>
                        </Card>
                        <Card className='col-sm-6 col-md-4 col-lg-4 ' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'red'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Seminars</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-5 mt-5'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'red' }} />}></Button>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-6 col-md-4 col-lg-4 ' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'#04364a'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Achievements</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-5 mt-5'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: '#04364a' }} />}></Button>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'green'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Awareness</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-5 mt-5'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'green' }} />}></Button>
                                    </Card.Body>
                                </Card>
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
                                <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                                    <Card.Body className='m-0'>
                                        <Card.Title>
                                            <IconButton style={{'color':'green'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Fund Raiser</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-2 mt-2'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'green' }} />}></Button>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'orange'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faUsersViewfinder} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Volunteer</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-2 mt-2'></div>
                                        <Button to='/about' text='Join Now' icon={<PlusOutlined style={{ color: 'orange' }} />}></Button>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'#044a18'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faHandHoldingDollar} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Donation</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-2 mt-2'></div>
                                        <Button to='/about' text='Donate Now' icon={<PlusOutlined style={{ color: '#044a18' }} />}></Button>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                            <SwiperSlide className='row ms-2 mt-4'>
                                <Card className='col-sm-6 col-md-4 col-lg-4 ' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'red'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Seminars</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-2 mt-2'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'red' }} />}></Button>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-6 col-md-4 col-lg-4 ' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'#04364a'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Communities</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-2 mt-2'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: '#04364a' }} />}></Button>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-6 col-md-4 col-lg-4' style={slide_inner_item_style}>
                                    <Card.Body>
                                        <Card.Title>
                                            <IconButton style={{'color':'green'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                            <h6 className="text-dark fw-bold">Awareness</h6>
                                        </Card.Title>
                                        <h6>supports persons who are unable to help themselves.</h6>
                                        <div className='mb-2 mt-2'></div>
                                        <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'green' }} />}></Button>
                                    </Card.Body>
                                </Card>
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
                                { title: 'History', content: 'Content for item 1' },
                                { title: 'Slogan/Motto', content: 'Content for item 3' },
                                { title: 'Services', content: 'Content for item 2' },
                                { title: 'Values', content: 'Content for item 3' },
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
                                <Button to="/signup" text="Contact Us" icon={<FontAwesomeIcon icon={faPeopleArrows} style={{ 'color': '#ec3237' }} />} />
                            </div>
                        </Container>
                    </div>

    
            </div>  
        <Footer Companyname={data.name} /> {/* Include the footer component */}
    </>
  );
};

export default LandingPage;
