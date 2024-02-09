import React, {useState} from 'react';
import { Navbar, Nav,Container, NavDropdown,Row , Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button, NavLink} from './button';
import {Dropdown} from './DropDown';
import {HeartFilled} from '@ant-design/icons'; // Import HeartOutlined icon from Ant Design
import Logo from '../assets/logo.jpg'
const Footer = () => {
    const style ={
        backgroundColor: '#34356b',
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
                        <h4>Section</h4>
                        <Nav className='flex-column'>
                            <NavLink to="/about" text="Home" />
                            <NavLink to="/about" text="Features" />
                            <NavLink to="/about" text="Pricing" />
                            <NavLink to="/about" text="About" />
                        </Nav>
                    </Col>

                    <div class="col-6 col-md-2 mb-3">
                        <h4>Section</h4>
                        <Nav className='flex-column'>
                            <NavLink to="/about" text="Home" />
                            <NavLink to="/about" text="Features" />
                            <NavLink to="/about" text="Pricing" />
                            <NavLink to="/about" text="About" />
                        </Nav>
                    </div>

                    <div class="col-6 col-md-2 mb-3">
                        <h4>Section</h4>
                        <Nav className='flex-column'>
                            <NavLink to="/about" text="Home" />
                            <NavLink to="/about" text="Features" />
                            <NavLink to="/about" text="Pricing" />
                            <NavLink to="/about" text="About" />
                        </Nav>
                    </div>

                    <div class="col-md-5 offset-md-1 mb-3">
                        <form>
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of what's new and exciting from us.</p>
                        <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden">Email address</label>
                            <input id="newsletter1" type="text" class="form-control" placeholder="Email address" />
                            <button class="btn btn-primary" type="button">Subscribe</button>
                        </div>
                        </form>
                    </div>
                </Row>

                <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                <p>© 2022 Company, Inc. All rights reserved.</p>
                <ul class="list-unstyled d-flex">
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"></svg></a></li>
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"></svg></a></li>
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"></svg></a></li>
                </ul>
                </div>
            </footer>
        </Container>
    )
}
export default Footer;