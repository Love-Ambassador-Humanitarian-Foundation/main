import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import LandingPageImg from '../assets/landingimg.jpg';
import VolunteerImg from '../assets/volunteerimg.jpg';
import { HeartFilled, BookFilled, ArrowRightOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes, faHeart, faSeedling,faPeopleArrows,faUsersViewfinder,faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {Button, NavLink,IconButton} from '../components/button';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const LandingPage = ({Companyname}) => {
    const slide_inner_item_style = {
        background: '#fff',
        borderRadius: '4px',
        border: '1px dotted #34356b',
        color: '#333',
        fontSize: '1.5rem',
        marginBottom: '1rem',
    };
  return (
    <>
      <div style={{
        backgroundImage: `url(${LandingPageImg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        zIndex: '-1',
        filter: 'brightness(30%)'
      }}>

      </div>
      <Container className="py-5" style={{ zIndex: '1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="mt-5 mb-5"></div>
        <h1 className="text-center text-white mb-4 mt-5">Welcome to Our {Companyname}</h1>
        <p className="text-center text-white mb-5">This is where we strive to create positive change and <br />support humanitarian causes around the globe.</p>
        <div className="d-flex justify-content-center">
          <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
          <span className="mx-3"></span>
          <Button to='/about' text='Learn More' icon={<BookFilled style={{ color: '#ec3237' }} />}></Button>
        </div>
      </Container>
      <Row className='row m-2' style={{backgroundColor: 'whitesmoke'}}>
        <Col className='col-4 align-self-center'>
            <Card style={{ width: '18rem', marginLeft: '90px', border:'0px' }}>
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
        <Col className='col-8'>
            <Swiper
                cssMode={true}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="mySwiper"
                modules={[Navigation, Pagination,  Autoplay]}
                
                style={{ height: '300px', width: '100%', backgroundColor: 'whitesmoke' }}
            >
                <SwiperSlide className='row ms-2'>
                    <Card className='col m-1 ms-2' style={slide_inner_item_style}>
                        <Card.Body>
                            <Card.Title>
                                <IconButton style={{'color':'green'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                <h5 className="text-center text-dark fw-bold">Fund Raiser</h5>
                            </Card.Title>
                            <h6>supports persons who are unable to help themselves.</h6>
                            <div className='mb-5 mt-5'></div>
                            <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'green' }} />}></Button>
                        </Card.Body>
                    </Card>
                    <Card className='col m-1' style={slide_inner_item_style}>
                        <Card.Body>
                            <Card.Title>
                                <IconButton style={{'color':'orange'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faUsersViewfinder} size='xl' />} />
                                <h5 className="text-center text-dark fw-bold">Become A Volunteer</h5>
                            </Card.Title>
                            <h6>supports persons who are unable to help themselves.</h6>
                            <div className='mb-5 mt-5'></div>
                            <Button to='/about' text='Join Now' icon={<PlusOutlined style={{ color: 'orange' }} />}></Button>
                        </Card.Body>
                    </Card>
                    <Card className='col m-1 mr-2' style={slide_inner_item_style}>
                        <Card.Body>
                            <Card.Title>
                                <IconButton style={{'color':'#044a18'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faHandHoldingDollar} size='xl' />} />
                                <h5 className="text-center text-dark fw-bold">  Give Donation</h5>
                            </Card.Title>
                            <h6>supports persons who are unable to help themselves.</h6>
                            <div className='mb-5 mt-5'></div>
                            <Button to='/about' text='Donate Now' icon={<PlusOutlined style={{ color: '#044a18' }} />}></Button>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <Card className='col m-1 ms-2' style={slide_inner_item_style}>
                        <Card.Body>
                            <Card.Title>
                                <IconButton style={{'color':'red'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                <h5 className="text-center text-dark fw-bold">Fund Raiser</h5>
                            </Card.Title>
                            <h6>supports persons who are unable to help themselves.</h6>
                            <div className='mb-5 mt-5'></div>
                            <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'red' }} />}></Button>
                        </Card.Body>
                    </Card>
                    <Card className='col m-1' style={slide_inner_item_style}>
                        <Card.Body>
                            <Card.Title>
                                <IconButton style={{'color':'#04364a'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                <h5 className="text-center text-dark fw-bold">Fund Raiser</h5>
                            </Card.Title>
                            <h6>supports persons who are unable to help themselves.</h6>
                            <div className='mb-5 mt-5'></div>
                            <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: '#04364a' }} />}></Button>
                        </Card.Body>
                    </Card>
                    <Card className='col m-1 mr-2' style={slide_inner_item_style}>
                        <Card.Body>
                            <Card.Title>
                                <IconButton style={{'color':'green'}} className='seedling-menu' hover={false} icon={<FontAwesomeIcon icon={faSeedling} size='xl' />} />
                                <h5 className="text-center text-dark fw-bold">Fund Raiser</h5>
                            </Card.Title>
                            <h6>supports persons who are unable to help themselves.</h6>
                            <div className='mb-5 mt-5'></div>
                            <Button to='/about' text='Give Now' icon={<PlusOutlined style={{ color: 'green' }} />}></Button>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
                
            </Swiper>
        </Col>
      </Row>
      
        <div className='m-0 p-0 mb-2' style={{height:'50vh', width:'100%'}}>
            <div style={{
                backgroundImage: `url(${VolunteerImg})`,
                backgroundSize: 'cover',
                minHeight: '50vh',
                zIndex: '-1',
                filter: 'brightness(40%)'
            }}>
                
            </div>
            <Container className="py-5" style={{ zIndex: '1', position: 'relative', top: '20%', left: '50%', transform: 'translate(-60%, -120%)' }}>
                <div className="mt-5 mb-5"></div>
                <h1 className="text-center text-white mb-4 mt-5">Want to know how you can help?</h1>
                <p className="text-center text-white mb-5">Join others in a quest to better the lives of others <br />support humanitarian causes around the globe.</p>
                <div className="d-flex justify-content-center">
                    <Button to="/signup" text="Become a volunteer" icon={<FontAwesomeIcon icon={faPeopleArrows} style={{'color':'#ec3237'}}  />} />
                </div>
            </Container>
        </div>
      
    </>
  );
};

export default LandingPage;
