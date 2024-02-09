import React, {useState} from 'react';
import { Navbar, Nav,Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button, NavLink} from './button';
import {Dropdown} from './DropDown';
import {HeartFilled} from '@ant-design/icons'; // Import HeartOutlined icon from Ant Design
import Logo from '../assets/logo.jpg'
import './Header.css';

const HeaderComponent = () => {
    
  
  return (
    <Navbar bg="white" expand="lg" fixed='top' className='m-0 p-0'>
        <Container >
            <Navbar.Brand href="#home" className=''>
                <img
                    src={Logo}
                    width="70"
                    height="60"
                    className="navbar-logo"
                    alt="Lahf Logo"
                />{' '}
                <span className="navbar-title"> LAHF</span>
            </Navbar.Brand>
            <Nav className="mr-auto navbar-nav-links"  activeKey="/home">
                <NavLink to="/" text="Home" className='active' />
                <NavLink to="/about" text="About" />
                <NavLink to="/contact" text="Contact" />
                <NavLink to ="/login" text="Login" />
                <Dropdown items={[{'name':'Action','to':'/action'},
                                {'name':'Action','to':'/action'},
                                {'name':'Action','to':'/action'}]} />
            </Nav>
            <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
        </Container>
        
    </Navbar>
    
  );
};

export default HeaderComponent;
