import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button, NavLink, IconButton } from './button';
import { Link } from 'react-router-dom';
import { CloseOutlined, MenuOutlined,UserOutlined, LoginOutlined } from '@ant-design/icons';

import { Drawer,Avatar,Dropdown, Menu } from 'antd';
import Logo from '../assets/logo.jpg';
import './Header.css';


const HeaderComponent = ({ Companyname,isloggedIn,userDetails }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const showDrawer = () => {
        setIsMenuOpen(true);
    };
    const onClose = () => {
        setIsMenuOpen(false);
    };
    //console.log(userDetails,"]]]]",isloggedIn);
    const profileMenu=(
        <Menu>
            {/* Your mail dropdown menu items */}
            <Menu.Item key="1"><Link to={`/profile/${userDetails?userDetails.id:'-'}`} style={{textDecoration:'none'}}>Account</Link></Menu.Item>
            
            {userDetails?<Menu.Item key="2">{userDetails.email}</Menu.Item>:<></>}
            {(userDetails && userDetails.is_staff)?<Menu.Item key="3" className='bg-success'>Admin</Menu.Item>:<></>}
            <Menu.Item key="4"><Link to='/admin/dashboard' style={{textDecoration:'none'}}>View Dashboard</Link></Menu.Item>
            <Menu.Item key="5">{isloggedIn?
                <Link to="/logout" text="Logout" style={{textDecoration:'none'}}>Logout</Link>
                :
                <Link to="/login" text="Login" style={{textDecoration:'none'}}>Login</Link>}
            </Menu.Item>
            {/* Add more menu items as needed */}
        </Menu>
    );
    
    

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
                    <Navbar.Brand href="/" className="">
                        <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                        <span className="navbar-title"> {Companyname}</span>
                    </Navbar.Brand>
                    <div className="d-flex justify-content-between align-items-center m-1" style={{marginLeft: 'auto'}}>
                        <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                            <Avatar src={userDetails?userDetails.profileImage:null} size={50} icon={<UserOutlined />} className="me-3" style={{ fontSize: '20px', cursor:'pointer' }} />
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
                        <NavLink to="/" text="Home" className="active m-2" />
                        
                        <NavLink to="/about" text="About" className="m-2"/>
                        <NavLink to="/events" text="Events" className="m-2" />
                        <NavLink to="/scholarships" text="Scholarships" className="m-2" />
                        <NavLink to="/contact" text="Contact" className="m-2" />
                        <Nav.Item className='nav-link'>
                            <Link
                                
                                style={{
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px 6px', // Adjust padding as needed
                                    textDecoration: 'none', // Remove text decoration for Links
                                    }}
                                className={`btn`}
                                
                            >
                                <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                                    <Avatar src={userDetails?userDetails.profileImage:null} size={30} icon={<UserOutlined />} className="me-3" style={{ fontSize: '20px', cursor:'pointer' }} />
                                </Dropdown>
                            </Link>
                        </Nav.Item>
                            
                        {!isloggedIn ? (
                            !userDetails ? (
                                <Button to="/signup" text="Sign Up" icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                            ) : (
                                <Button to="/login" text="Log In" icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                            )
                        ) : null}
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
                    <NavLink to="/scholarships" text="Scholarships" className="m-2" />
                    <NavLink to="/contact" text="Contact" className="m-2" />
                    
                    <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                        <Avatar src={userDetails?userDetails.profileImage:null} size={50} icon={<UserOutlined />} className="me-3" style={{ fontSize: '20px', cursor:'pointer' }} />
                    </Dropdown>
                    {!isloggedIn ? (
                        !userDetails ? (
                            <Button to="/signup" text="Sign Up" icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                        ) : (
                            <Button to="/login" text="Log In" icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                        )
                    ) : null}

                </Container>
            )}
        </Navbar>
    );
};

export default HeaderComponent;
