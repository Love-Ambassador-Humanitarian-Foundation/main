import React, { useState, useEffect } from 'react';
import { Badge, Avatar,Dropdown, Menu} from 'antd';
import { MailOutlined, BellOutlined, UserOutlined} from '@ant-design/icons';
import {NavLink} from './button';
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

// Existing imports...

const HeaderComponent = ({ Companyname, isloggedIn }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const userdetails={
        "email":'oscarchiagoziem@gmail.com'
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const mailMenu = (
        <Menu>
            {/* Your mail dropdown menu items */}
            <Menu.Item key="1">Mail 1</Menu.Item>
            <Menu.Item key="2">Mail 2</Menu.Item>
            {/* Add more menu items as needed */}
        </Menu>
    );
    const profileMenu=(
        <Menu>
            {/* Your mail dropdown menu items */}
            <Menu.Item key="1"><Link to={`/profile/${userdetails}`} style={{textDecoration:'none'}}>View Profile</Link></Menu.Item>
            <Menu.Item key="1">John Doe</Menu.Item>
            <Menu.Item key="2">email</Menu.Item>
            <Menu.Item key="3">usertype:Admin</Menu.Item>
            <Menu.Item key="4">Activity Log</Menu.Item>
            <Menu.Item key="5">Sign Out</Menu.Item>
            {/* Add more menu items as needed */}
        </Menu>
    );

    const notificationMenu = (
        <Menu>
            {/* Your notification dropdown menu items */}
            <Menu.Item key="1">Notification 1</Menu.Item>
            <Menu.Item key="2">Notification 2</Menu.Item>
            {/* Add more menu items as needed */}
        </Menu>
    );

    return (
        <Navbar bg="white" expand="lg" fixed="top" className="m-0 p-0">
            {isMobile ? (
                <Container>
                    <Navbar.Brand href="/" className="">
                        <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                        <span className="navbar-title"> {Companyname}</span>
                    </Navbar.Brand>
                    <div className="d-flex justify-content-between align-items-center m-1" style={{ marginLeft: 'auto' }}>
                        <Dropdown overlay={mailMenu} placement="bottomLeft" trigger={['click']}>
                            <Badge count={1} className="me-3">
                                <MailOutlined style={{ fontSize: '20px', cursor:'pointer' }} />
                            </Badge>
                        </Dropdown>
                        <Dropdown overlay={notificationMenu} placement="bottomLeft" trigger={['click']}>
                            <Badge count={2} className="me-4">
                                <BellOutlined style={{ fontSize: '20px', cursor:'pointer' }}/>
                            </Badge>
                        </Dropdown>
                        
                        <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                            
                            <Avatar size={30} icon={<UserOutlined />} className="me-3" style={{ fontSize: '20px', cursor:'pointer' }} />
                        </Dropdown>
                    </div>
                    
                </Container>
            ) : (
                <Container>
                    <Navbar.Brand href="#home" className="">
                        <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                        <span className="navbar-title"> {Companyname}</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto navbar-nav-links d-flex justify-content-between align-items-center" activeKey="/home">
                        <NavLink to="/" text="Home" className="active m-2 text-success" />
                        
                        {isloggedIn ? (
                            <>
                                <div className="d-flex align-items-center m-2">
                                    <Dropdown overlay={mailMenu} placement="bottomLeft" trigger={['click']}>
                                        <Badge count={1} className="me-4">
                                            <MailOutlined style={{ fontSize: '20px', cursor:'pointer' }} />
                                        </Badge>
                                    </Dropdown>
                                    <Dropdown overlay={notificationMenu} placement="bottomLeft" trigger={['click']}>
                                        <Badge count={2} className="me-4">
                                            <BellOutlined style={{ fontSize: '20px', cursor:'pointer' }}/>
                                        </Badge>
                                    </Dropdown>
                                    
                                    <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                                        
                                        <Avatar size={30} icon={<UserOutlined />} className="me-2" style={{ fontSize: '20px', cursor:'pointer' }} />
                                    </Dropdown>
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" text="Login" className="m-2" />
                                <NavLink to="/signup" text="Signup" className="m-2" />
                            </>
                        )}
                    </Nav>
                    
                </Container>
            )}
        </Navbar>
    );
};

export default HeaderComponent;

