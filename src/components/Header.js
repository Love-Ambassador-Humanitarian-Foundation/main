import React, { useState, useEffect } from 'react';
import { Navbar, Nav,Container, NavDropdown } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes, faHeart, faSeedling} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {Button, NavLink,IconButton} from './button';
import {Dropdown} from './DropDown';
import {HeartFilled, CloseOutlined, MenuOutlined } from '@ant-design/icons'; // Import HeartOutlined icon from Ant Design
import Logo from '../assets/logo.jpg'
import './Header.css';

const HeaderComponent = ({Companyname}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
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
                    <span className="navbar-title"> {Companyname}</span>
                </Navbar.Brand>
                {isMobile ? (
                    <div className='d-flex justify-content-between mr-auto'>
                        <IconButton onClick={() => setIsMenuOpen(true)}style={{'color':'green'}} className='seedling-menu' icon={<FontAwesomeIcon icon={faSeedling} />} />
                        {isMenuOpen ?
                            (<IconButton onClick={() => setIsMenuOpen(false)} className='close-menu' icon={<CloseOutlined />} />)
                            :
                            (<IconButton onClick={() => setIsMenuOpen(true)} className='open-menu' icon={<MenuOutlined />} />)
                        }
                    </div>
                    
                ) : (
                    <>
                    <Nav className="ms-auto navbar-nav-links"  activeKey="/home">
                        <NavLink to="/" text="Home" className='active'/>
                        <NavLink to="/about" text="About"/>
                        <NavLink to="/contact" text="Contact"/>
                        <NavLink to ="/login" text="Login" />
                        <Dropdown items={[{'name':'Action','to':'/action'},
                                        {'name':'Action','to':'/action'},
                                        {'name':'Action','to':'/action'}]} />
                    </Nav>
                    <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
                    </>
                )}
                
            </Container>
            
        </Navbar>  
    );
};

export default HeaderComponent;
