import React, { useState, useEffect } from 'react';
import { Drawer, Avatar, Dropdown, Menu } from 'antd';
import { CloseOutlined, LogoutOutlined, LoginOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Button, NavLink, IconButton } from './button';
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

const HeaderComponent = ({ Companyname,isloggedIn, items,userDetails  }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //console.log(isloggedIn,':====')
    //const isAdmin = true;

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


    return (
        <Navbar bg="white" expand="lg" fixed="top" className="m-0 p-0">
            {isMobile ? (
                <Container fluid>
                    <Navbar.Brand href="/" className="">
                        <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                        <span className="navbar-title">{Companyname}</span>
                    </Navbar.Brand>
                    <div className="d-flex justify-content-between align-items-center m-1" style={{ marginLeft: 'auto' }}>
                        
                        <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                            <Avatar size={30} src={userDetails?userDetails.profileImage:null} icon={<UserOutlined /> } className="me-3" style={{ fontSize: '20px', cursor: 'pointer' }} />
                        </Dropdown>
                        {isMenuOpen ? (
                            <IconButton hover={false} onClick={onClose} className="close-menu ms-0" icon={<CloseOutlined />} />
                        ) : (
                            <IconButton hover={false} onClick={showDrawer} className="open-menu ms-0" icon={<MenuOutlined />} />
                        )}
                    </div>
                    <Drawer
                        title="Menu"
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        open={isMenuOpen}
                        key="left"
                        width="70%"
                    >
                        {items.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.url}
                                text={item.label}
                                onClick={onClose}
                                className="m-2 text-decoration-none"
                                fwicon={item.icon}
                            />
                        ))}
                        {isloggedIn ? (
                            <Button to="/logout" text="Sign Out" icon={<LogoutOutlined style={{ color: '#ec3237' }} />} />
                        ) : (
                            <Button to="/login" text="Login" icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                        )}
                    </Drawer>
                </Container>
            ) : (
                <Container fluid>
                    <Navbar.Brand href="/" className="">
                        <img src={Logo} width="70" height="60" className="navbar-logo" alt="Lahf Logo" />{' '}
                        <span className="navbar-title">{Companyname}</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto navbar-nav-links d-flex justify-content-between align-items-center" activeKey="/">
                        {isloggedIn ? (
                            <div className="d-flex align-items-center" style={{ marginLeft: 'auto' }}>
                                <NavLink to="/" text="Home" className="active m-2 text-success" />
                                
                                {userDetails?<small className="me-2 ms-2" style={{ cursor: 'pointer' }}>{userDetails.email}</small>:null}
                                <Dropdown overlay={profileMenu} placement="bottomLeft" trigger={['click']}>
                                <Avatar size={30} src={userDetails?userDetails.profileImage:null} icon={<UserOutlined /> } className="me-2" style={{ fontSize: '20px', cursor: 'pointer' }} />
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center" style={{ marginLeft: 'auto' }}>
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
