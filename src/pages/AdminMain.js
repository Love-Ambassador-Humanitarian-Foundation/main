import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/AdminHeader';
import { DashboardOutlined, UsergroupAddOutlined, InfoCircleOutlined, StarOutlined, CalendarOutlined,TeamOutlined, DollarOutlined, BankOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {useUpdateLoginStatus} from '../utils/hooks'
import {fetchUserDetails} from '../utils/utils';
import { Nav } from 'react-bootstrap';
import { Link} from 'react-router-dom';

const { Sider } = Layout;

const AdminMain = ({ API_URL,Companyname, screen }) => {
    const [userDetails, setUserDetails] = useState(null);
    const isLoggedIn = useUpdateLoginStatus();
    //const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    
    const items = [
        { url: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { url: '/admin/profiles', icon: <UsergroupAddOutlined />, label: 'Profiles' },
        { url: '/admin/about', icon: <InfoCircleOutlined />, label: 'About' },
        { url: '/admin/scholarships', icon: <StarOutlined />, label: 'Scholarships' },
        { url: '/admin/partners', icon: <TeamOutlined />, label: 'Partners' },
        { url: '/admin/events', icon: <CalendarOutlined />, label: 'Events' },
        { url: '/admin/payments', icon: <DollarOutlined />, label: 'Payments' },
        { url: '/admin/branches', icon: <BankOutlined />, label: 'Branches' },
        { url: '/admin/profile', icon: <UserOutlined />, label: 'Profile' },
    ];
    
    const navItems = [...items];

    

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        const fetchDetails = async () => {
            const d = await fetchUserDetails(API_URL);
            setUserDetails(d);
        };
        fetchDetails();
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
                    style={{ marginTop: '70px', height: 'calc(100vh - 70px)' }}
                >
                    <div style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                            {navItems.map((item, index) => (
                                <Menu.Item key={index}>
                                    <Nav.Item className='nav-link d-flex justify-content-left align-items-center'>
                                        <span className='text-white'>{item.icon}</span>
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
            {screen}
        </Layout>
    );
};

export default AdminMain;
