import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/AdminHeader';
import { DashboardOutlined, UsergroupAddOutlined, InfoCircleOutlined, StarOutlined, InteractionOutlined, DollarOutlined,BranchesOutlined, HomeOutlined, EditOutlined,UserOutlined} from '@ant-design/icons';
import { Layout, Menu, theme,Breadcrumb} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPeopleArrows} from '@fortawesome/free-solid-svg-icons';
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
const { Content, Sider} = Layout;

const AdminMain = ({Companyname, isloggedIn}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [content, setIsContent] = useState(<Dashboard />);
    
    const {
        token: { colorBgContainer, borderRadiusXS },
    } = theme.useToken();

    const navitems = [
        { url:'/admin/23232', display:<Dashboard />, icon: <DashboardOutlined style={{ cursor: 'pointer' }} />, label: 'Dashboard' },
        { url:'/admin/profiles', display:<Profiles />,icon: <UsergroupAddOutlined style={{ cursor: 'pointer' }} />, label: 'Profiles' },
        { url:'/admin/about', display:<AboutPage />,icon: <InfoCircleOutlined style={{ cursor: 'pointer' }} />, label: 'About' },
        { url:'/admin/achievements', display:<Achievements />,icon: <StarOutlined style={{ cursor: 'pointer' }} />, label: 'Achievements' },
        { url:'/admin/partners', display:<Profile />,icon: <FontAwesomeIcon icon={faPeopleArrows} style={{ cursor: 'pointer' }} />, label: 'Partners' },
        { url:'/admin/events', display:<Events />,icon: <InteractionOutlined style={{ cursor: 'pointer' }} />, label: 'Events' },
        { url:'/admin/payments', display:<Payments />,icon: <DollarOutlined style={{ cursor: 'pointer' }} />, label: 'Payments' },
        { url:'/admin/branches', display:<Branches />,icon: <BranchesOutlined style={{ cursor: 'pointer' }} />, label: 'Branches' },
        { url:'/admin/profile', display:<Profile />,icon: <UserOutlined style={{ cursor: 'pointer' }} />, label: 'Profile' },
      ];
      const [currentScreen, setCurrentScreen] = useState(navitems[0]);

    const changeScreen= (screen)=>{
        setIsContent(screen.display);
        setCurrentScreen(screen)
        //console.log(screen, content)
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
  return (
    <Layout style={{ minHeight: '100vh' }}>
        
        <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} items={navitems} onchangeScreen={changeScreen} style={{
            padding: 0,
            background: colorBgContainer,
          }} />
        {isMobile? null
            : 
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{ marginTop: '70px', height: 'calc(100vh - 0px)' }}
            >
                <div className="demo-logo-vertical" />
                <div style={{ height: 'calc(100% - 48px)', overflowY: 'scroll' }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        {navitems.map(({ icon, label, url, display }, index) => (
                            <Menu.Item key={index} className='' style={{borderRadius: borderRadiusXS}}>
                                <Nav.Item className='nav-link d-flex justify-content-left align-items-center'  onClick={()=>changeScreen({ icon, label, url, display })}>
          
                                    <span className='text-white' >{icon}</span>
                                    <Link
                                        to={url}
                                        style={{
                                            fontWeight: 500,
                                            borderRadius: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '8px 8px', // Adjust padding as needed
                                            textDecoration: 'none', // Remove text decoration for Links
                                          }}
                                          
                                        className={`btn text-white nav-link`}
                                    >
                                        {label}
                                    </Link>
                                </Nav.Item>
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>

            </Sider>
        }

        <Layout style={{marginTop:'70px', height:'calc(100vh)'}} className='mb-0'>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{backgroundColor: '#d7d7e9',borderRadius: borderRadiusXS }}>
                    <Breadcrumb
                        items={[
                            {href: '/',title: <HomeOutlined />,},
                            {title: (<>{currentScreen.icon}<span>{currentScreen.label}</span></>),},
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
