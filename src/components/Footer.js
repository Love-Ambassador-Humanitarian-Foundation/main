import React from 'react';
import {Nav,Container,Row , Col} from 'react-bootstrap';
import {Button, NavLink} from './button';
import {MailOutlined} from '@ant-design/icons'; // Import HeartOutlined icon from Ant Design
import {TwitterOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons'; // Import social icons from Ant Design

const Footer = ({Companyname}) => {
    const style ={
        backgroundColor: '#d7d7e9',
        color: 'white',
        padding: '10px',
        width: '100%',
        
        justifyContent:'space-between',
        alignItems: 'center'
    }
    return(
        <Container fluid  style={style}>
            <footer className="py-5">
                <Row className='m-0'>
                    <Col className="col-6 col-md-2 mb-3">
                        <h4 className='text-dark'>Contact Info</h4>
                        <Nav className='flex-column'>
                            <NavLink to="/about" text="Home" className='text-dark' style={{margin: '0px', padding:'0px'}} />
                            <NavLink to="/about" text="Features" className='text-dark m-0' />
                            <NavLink to="/about" text="Pricing" className='text-dark m-0'/>
                            <NavLink to="/about" text="About" className='text-dark m-0'/>
                        </Nav>
                    </Col>

                    <div class="col-6 col-md-2 mb-3">
                        <h4 className='text-dark'>Our Support </h4>
                        <Nav className='flex-column p-0'>
                            <NavLink to="/about" text="Policies" className='text-dark m-0'/>
                            <NavLink to="/about" text="Volunteer" className='text-dark  m-0'/>
                            <NavLink to="/about" text="Contact us" className='text-dark  m-0'/>
                            <NavLink to="/about" text="Partnership" className='text-dark  m-0'/>
                        </Nav>
                    </div>

                    <div class="col-6 col-md-2 mb-3">
                        <h4 className='text-dark'>Our Services</h4>
                        <Nav className='flex-column'>
                            <NavLink to="/about" text="Donate" className='text-dark'/>
                            <NavLink to="/about" text="Sponsor" className='text-dark'/>
                            <NavLink to="/about" text="Fund raiser" className='text-dark'/>
                        </Nav>
                    </div>

                    <div class="col-md-5 offset-md-1 mb-3">
                        <form>
                        <h5 className='text-dark'>Subscribe to our newsletter</h5>
                        <p className='text-dark'> Monthly digest of what's new and exciting from us.</p>
                        <div className="d-flex flex-column w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden text-dark">Email address</label>
                            <input id="newsletter1" type="text" className="form-control" style={{borderColor:'#d7d7e9'}} placeholder="Email address" />
                            <Button to="/subscribe" text="Subscribe" className='text-dark border ' style={{border:'1px dotted #34356b', width:'155px', alignSelf:'center'}} icon={<MailOutlined style={{ color: '#ec3237' }} />} />
                            <p className="d-flex flex-row m-auto mt-4" style={{alignItems:'center', margin:'20px' }}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <TwitterOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#1DA1F2' }} />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <InstagramOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#E4405F' }} />
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FacebookOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#1877F2' }} />
                                </a>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                    <WhatsAppOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#25D366' }} />
                                </a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                    <LinkedinOutlined style={{ cursor:'pointer', fontSize: '24px', marginRight: '10px', color:'#0077B5' }} />
                                </a>
                            </p>
                        </div>
                        </form>
                        

                    </div>
                </Row>

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center border-top">
                    <p className='text-dark'>© 2022 {Companyname}, Inc. All rights reserved.</p>
                    <ul class="list-unstyled d-flex ">
                        <li class="ms-3"><a class="link-dark" href="/"><svg class="bi" width="24" height="24"></svg></a></li>
                        <li class="ms-3"><a class="link-dark" href="/"><svg class="bi" width="24" height="24"></svg></a></li>
                        <li class="ms-3"><a class="link-dark" href="/"><svg class="bi" width="24" height="24"></svg></a></li>
                    </ul>
                </div>
            </footer>
        </Container>
    )
}
export default Footer;