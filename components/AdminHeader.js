import React, { useState, useEffect } from 'react';
import { Drawer,Badge, Avatar,Dropdown, Menu} from 'antd';
import {  MailOutlined, BellOutlined, CloseOutlined,LogoutOutlined, LoginOutlined, MenuOutlined,UserOutlined} from '@ant-design/icons';
import { Button, NavLink, IconButton } from './button';
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

// Existing imports...

const HeaderComponent = ({ Companyname, isloggedIn, items,onchangeScreen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const [isAdmin, SetAdmin] = useState(false);
    //const isAdmin = true;
    const showDrawer = () => {
        setIsMenuOpen(true);
    };
    const onClose = () => {
        setIsMenuOpen(false);
    };
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
                <Container fluid>
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
                        {isMenuOpen ? (
                                <IconButton hover={false} onClick={onClose} className="close-menu ms-0" icon={<CloseOutlined />} />
                            ) : (
                                <IconButton hover={false} onClick={showDrawer} className="open-menu ms-0" icon={<MenuOutlined />} />
                            )}
                    </div>
                    <Drawer
                            title="Basic Drawer"
                            placement={'left'}
                            closable={false}
                            onClose={onClose}
                            open={isMenuOpen}
                            key={'left'}
                            width={'70%'}
                        >
                            {items.map((item, index) => (
                            <NavLink key={index} to={item.url} text={item.label} onClick={() => {
                                onchangeScreen(item);
                                onClose();
                            }} className="m-2 text-decoration-none" fwicon={item.icon} />
                            ))}
                            {isloggedIn? 
                            <Button to="/logout" text="Sign Up" icon={<LogoutOutlined style={{ color: '#ec3237' }} />} />
                            :
                            <Button to="/login" text="Sign Up" icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                            }
                    </Drawer>
                    
                </Container>
            ) : (
                <Container fluid>
                    <Navbar.Brand href="#home" className="">
                        <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                        <span className="navbar-title"> {Companyname}</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto navbar-nav-links d-flex justify-content-between align-items-center" activeKey="/home">
                        
                        
                        {isloggedIn ? (
                            <div className="d-flex align-items-center" style={{ marginLeft: 'auto' }}>
                                <NavLink to="/" text="Home" className="active m-2 text-success" />
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
                        ) : (
                            <div className="d-flex align-items-center " style={{ marginLeft: 'auto' }}>
                                <NavLink to="/login" text="Login" className="m-2" />
                                <NavLink to="/signup" text="Signup" className="m-2" />
                            </div>
                        )}
                    </Nav>
                    
                </Container>
            )}
        </Navbar>
    );
};

export default HeaderComponent;

