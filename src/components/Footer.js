import React from 'react';
import {Nav,Container,Row , Col} from 'react-bootstrap';
import {Button, NavLink} from './button';
import {MailOutlined} from '@ant-design/icons'; // Import HeartOutlined icon from Ant Design
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
                            <NavLink to="/about" text="Home" className='text-dark' />
                            <NavLink to="/about" text="Features" className='text-dark' />
                            <NavLink to="/about" text="Pricing" className='text-dark'/>
                            <NavLink to="/about" text="About" className='text-dark'/>
                        </Nav>
                    </Col>

                    <div class="col-6 col-md-2 mb-3">
                        <h4 className='text-dark'>Our Support </h4>
                        <Nav className='flex-column'>
                            <NavLink to="/about" text="Policies" className='text-dark'/>
                            <NavLink to="/about" text="Volunteer" className='text-dark'/>
                            <NavLink to="/about" text="Contact us" className='text-dark'/>
                            <NavLink to="/about" text="Partnership" className='text-dark'/>
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
                        <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden text-dark">Email address</label>
                            <input id="newsletter1" type="text" class="form-control" placeholder="Email address" />
                            <Button to="/subscribe" text="Subscribe" className='text-dark border ' style={{border:'1px dotted #34356b', width:'155px', alignSelf:'center'}} icon={<MailOutlined style={{ color: '#ec3237' }} />} />
                        </div>
                        </form>
                    </div>
                </Row>

                <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center py-4 my-4 border-top">
                    <p className='text-dark'>© 2022 {Companyname}, Inc. All rights reserved.</p>
                    <ul class="list-unstyled d-flex">
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