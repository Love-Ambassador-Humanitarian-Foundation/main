import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import LandingPageImg from '../assets/landingimg.jpg';
import { HeartFilled, BookFilled } from '@ant-design/icons';
import { Button } from '../components/button';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const LandingPage = () => {
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
        <h1 className="text-center text-white mb-4 mt-5">Welcome to Our LAHF</h1>
        <p className="text-center text-white mb-5">This is where we strive to create positive change and <br />support humanitarian causes around the globe.</p>
        <div className="d-flex justify-content-center">
          <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
          <span className="mx-3"></span>
          <Button to='/about' text='Learn More' icon={<BookFilled style={{ color: '#ec3237' }} />}></Button>
        </div>
      </Container>
      <Row className='row m-2'>
        <Col className='col-4'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col className='col-8'>
            <Swiper
                cssMode={true}
                mousewheel={true}
                autoplay={{ delay: 3000 }}
                loop={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
                style={{ height: '300px', width: '100%' }}
            >
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>1</div>
                    <div className='col m-1' style={slide_inner_item_style}>2</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>2</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>4</div>
                    <div className='col m-1' style={slide_inner_item_style}>5</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>6</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>7</div>
                    <div className='col m-1' style={slide_inner_item_style}>8</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>9</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>10</div>
                    <div className='col m-1' style={slide_inner_item_style}>11</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>12</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>13</div>
                    <div className='col m-1' style={slide_inner_item_style}>14</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>15</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>16</div>
                    <div className='col m-1' style={slide_inner_item_style}>17</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>18</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}>19</div>
                    <div className='col m-1' style={slide_inner_item_style}>20</div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}>21</div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}></div>
                    <div className='col m-1' style={slide_inner_item_style}></div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}></div>
                </SwiperSlide>
                <SwiperSlide className='row ms-2'>
                    <div className='col m-1 ms-2' style={slide_inner_item_style}></div>
                    <div className='col m-1' style={slide_inner_item_style}></div>
                    <div className='col m-1 mr-2' style={slide_inner_item_style}></div>
                </SwiperSlide>
            </Swiper>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
