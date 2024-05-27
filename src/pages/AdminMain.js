import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/AdminHeader';
import { DashboardOutlined, UsergroupAddOutlined, InfoCircleOutlined, StarOutlined, InteractionOutlined, DollarOutlined, BranchesOutlined, HomeOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from './AdminDashboard';
import Profiles from './AdminUsers';
import AboutPage from './AdminAbout';
import Achievements from './AdminAchievements';
import Events from './AdminEvents';
import Payments from './AdminPayments';
import Branches from './AdminBranches';
import Profile from './AdminProfile';

const { Content, Sider } = Layout;

const AdminMain = ({ Companyname, isloggedIn }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [content, setContent] = useState(<Dashboard />);
    const [currentScreen, setCurrentScreen] = useState({
        url: '/admin/23232',
        display: <Dashboard />,
        icon: <DashboardOutlined />,
        label: 'Dashboard'
    });

    const navItems = [
        { url: '/admin/23232', display: <Dashboard />, icon: <DashboardOutlined />, label: 'Dashboard' },
        { url: '/admin/profiles', display: <Profiles />, icon: <UsergroupAddOutlined />, label: 'Profiles' },
        { url: '/admin/about', display: <AboutPage />, icon: <InfoCircleOutlined />, label: 'About' },
        { url: '/admin/achievements', display: <Achievements />, icon: <StarOutlined />, label: 'Achievements' },
        { url: '/admin/partners', display: <Profile />, icon: <FontAwesomeIcon icon={faPeopleArrows} />, label: 'Partners' },
        { url: '/admin/events', display: <Events />, icon: <InteractionOutlined />, label: 'Events' },
        { url: '/admin/payments', display: <Payments />, icon: <DollarOutlined />, label: 'Payments' },
        { url: '/admin/branches', display: <Branches />, icon: <BranchesOutlined />, label: 'Branches' },
        { url: '/admin/profile', display: <Profile />, icon: <UserOutlined />, label: 'Profile' },
    ];

    const changeScreen = (screen) => {
        setContent(screen.display);
        setCurrentScreen(screen);
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
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} items={navItems} onchangeScreen={changeScreen} />
            {isMobile ? null : (
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    style={{ marginTop: '70px', height: 'calc(100vh - 70px)' }}
                >
                    <div style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                            {navItems.map((item, index) => (
                                <Menu.Item key={index} onClick={() => changeScreen(item)}>
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
            <Layout style={{ marginTop: '70px', height: '100vh' }}>
                <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                    <Breadcrumb
                        items={[
                            { href: '/', title: <HomeOutlined /> },
                            { title: (<>{currentScreen.icon}<span>{currentScreen.label}</span></>) },
                        ]}
                    />
                    <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <Content className='m-2'>
                    {content}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminMain;
