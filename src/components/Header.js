import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button, NavLink, IconButton } from './button';
import { HeartFilled, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer} from 'antd';
import Logo from '../assets/logo.jpg';
import './Header.css';

const HeaderComponent = ({ Companyname }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const showDrawer = () => {
        setIsMenuOpen(true);
    };
    const onClose = () => {
        setIsMenuOpen(false);
    };
    

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
                            {isMenuOpen ? (
                                <IconButton onClick={onClose} className="close-menu ms-0" icon={<CloseOutlined />} />
                            ) : (
                                <IconButton onClick={showDrawer} className="open-menu ms-0" icon={<MenuOutlined />} />
                            )}
                        </div>
                        <Drawer
                            title="Basic Drawer"
                            placement={'left'}
                            closable={false}
                            onClose={onClose}
                            open={isMenuOpen}
                            key={'left'}
                            width={'90%'}
                        >
                            <NavLink to="/" text="Home" className="active m-2" />
                            
                            <NavLink to="/about" text="About" className="m-2" />
                            <NavLink to="/events" text="Events" className="m-2" />
                            <NavLink to="/contact" text="Contact" className="m-2" />
                            <NavLink to="/login" text="Login" className="m-2" />
                            <Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} />
                        </Drawer>

                        
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
