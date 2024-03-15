import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { Button, NavLink, IconButton } from './button';
import { Dropdown } from './DropDown';
import { HeartFilled, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '../assets/logo.jpg';
import './Header.css';

const HeaderComponent = ({ Companyname }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Navbar bg="white" expand="lg" fixed="top" className="m-0 p-0">
            
                {isMobile ? (
                    <Container>
                        <Navbar.Brand href="#home" className="">
                            <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                            <span className="navbar-title"> {Companyname}</span>
                        </Navbar.Brand>
                        <div className="d-flex justify-content-between align-items-center m-1" style={{marginLeft: 'auto'}}>
                            <IconButton onClick={() => setIsMenuOpen(true)} style={{ color: 'green', marginRight: '0' }} className="seedling-menu" icon={<FontAwesomeIcon icon={faSeedling} />} />
                            {isMenuOpen ? (
                                <IconButton onClick={() => setIsMenuOpen(false)} className="close-menu ms-0" icon={<CloseOutlined />} />
                            ) : (
                                <IconButton onClick={() => setIsMenuOpen(true)} className="open-menu ms-0" icon={<MenuOutlined />} />
                            )}
                        </div>

                        
                    </Container>
                ) : (
                    <Container>
                        <Navbar.Brand href="#home" className="">
                            <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                            <span className="navbar-title"> {Companyname}</span>
                        </Navbar.Brand>
                        <Nav className="ms-auto navbar-nav-links d-flex justify-content-between align-items-center" activeKey="/home">
                            
                            
                        </Nav>
                        <NavLink to="/" text="Home" className="active m-2" />
                            <NavLink to="/about" text="About" className="m-2" />
                            <NavLink to="/events" text="Events" className="m-2" />
                            <NavLink to="/contact" text="Contact" className="m-2" />
                            <NavLink to="/login" text="Login" className="m-2" />
                        <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
                    </Container>
                )}
        </Navbar>
    );
};

export default HeaderComponent;
