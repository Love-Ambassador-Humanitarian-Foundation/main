import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/AdminHeader';
import { DashboardOutlined, UsergroupAddOutlined,MailOutlined, InfoCircleOutlined,CalendarOutlined,TeamOutlined, DollarOutlined, BankOutlined, UserOutlined, BellOutlined, SolutionOutlined } from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import {useUpdateLoginStatus} from '../utils/hooks'
import { Nav } from 'react-bootstrap';
import { Link, useLocation} from 'react-router-dom';
const { Sider } = Layout;

const AdminMain = ({ API_URL,Companyname, screen }) => {
    const {isLoggedIn,userDetails} = useUpdateLoginStatus(API_URL);
    const location = useLocation();
    const currentUrl = location.pathname + location.search;
    //const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    
    const items = [
        { url: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard',badge:false },
        { url: '/admin/users', icon: <UsergroupAddOutlined />, label: 'Users',badge:false },
        { url: '/admin/about', icon: <InfoCircleOutlined />, label: 'About',badge:false },
        { url: '/admin/scholarships', icon: <SolutionOutlined />, label: 'Scholarships',badge:false },
        { url: '/admin/partners', icon: <TeamOutlined />, label: 'Partners',badge:false },
        { url: '/admin/events', icon: <CalendarOutlined />, label: 'Events',badge:false },
        //{ url: '/admin/payments', icon: <DollarOutlined />, label: 'Payments',badge:false },
        { url: '/admin/branches', icon: <BankOutlined />, label: 'Branches',badge:false },
        { url: '/admin/profile', icon: <UserOutlined />, label: 'Profile',badge:false },
        { url: '/admin/emails', icon: <MailOutlined />, label: 'Emails',badge:true },
        { url: '/admin/notifications', icon: <BellOutlined />, label: 'Notifications',badge:true },
    ];
    
    const navItems = [...items];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [API_URL]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} items={navItems} userDetails={userDetails} />
            {isMobile ? null : (
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    style={{ marginTop: '70px', height: 'calc(100vh - 70px)', backgroundColor: '#17172f' }} // Dark purple background
                >
                    <div style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            style={{ backgroundColor: '#17172f' }} // Ensure menu background matches Sider
                        >
                            {navItems.map((item, index) => (
                                
                                <Menu.Item
                                    key={index}
                                    className={currentUrl.includes(item.url) ? 'bg-purple' : 'bg-transparent'}
                                >
                                    <Nav.Item className='nav-link d-flex justify-content-left align-items-center'>
                                    {item.badge === true?
                                        <Badge 
                                            count={1} 
                                            className="me-2" 
                                            style={{ fontSize: '8px', padding: '0 4px', height: '12px', minWidth: '12px', lineHeight: '12px' }}
                                        >
                                            <span className='text-white'>{item.icon}</span>
                                        </Badge>
                                    :
                                    <span className='text-white'>{item.icon}</span>
                                    }  
                                    

                                        <Link
                                            to={item.url}
                                            style={{
                                                fontWeight: 500,
                                                borderRadius: '2px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '8px 8px',
                                                textDecoration: 'none',
                                                color: '#fff',
                                            }}
                                            className='btn text-white nav-link'
                                        >
                                            {item.label}
                                        </Link>
                                    </Nav.Item>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                </Sider>
            
            )}
            <Layout style={{ padding: '8px', overflowY: 'auto', height: 'calc(100vh - 70px)' }}>
                {screen}
            </Layout>
        </Layout>
    );
};

export default AdminMain;
