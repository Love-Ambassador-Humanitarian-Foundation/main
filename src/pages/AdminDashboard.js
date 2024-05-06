import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/AdminHeader';
import { DashboardOutlined, UsergroupAddOutlined, InfoCircleOutlined, StarOutlined, InteractionOutlined, DollarOutlined, ProfileOutlined, BranchesOutlined, MailOutlined, LogoutOutlined, LoginOutlined,HomeOutlined, EditOutlined, SaveOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NavLink, Button } from '../components/button';
import { Layout, Menu, theme,Breadcrumb,Badge } from 'antd';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const { Header, Content, Sider, Footer } = Layout;

const Dashboard = ({Companyname, isloggedIn}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const navitems = [
        { url:'/admin/23232', icon: <DashboardOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'Dashboard' },
        { url:'/admin/profiles',icon: <Badge count={1} className="me-3"><UsergroupAddOutlined style={{ fontSize: '22px', cursor: 'pointer' }} /></Badge>, label: 'Profiles' },
        { url:'/admin/about',icon: <InfoCircleOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'About' },
        { url:'/admin/achievements',icon: <StarOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'Achievements' },
        { url:'/admin/events',icon: <InteractionOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'Events' },
        { url:'/admin/payments',icon: <Badge count={1} className="me-3"><DollarOutlined style={{ fontSize: '22px', cursor: 'pointer' }} /></Badge>, label: 'Payments' },
        { url:'/admin/reports',icon: <ProfileOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'Reports' },
        { url:'/admin/branches',icon: <BranchesOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'Branches' },
        { url:'/admin/profile',icon: <UserOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />, label: 'Profile' },
        { url:'/admin/mails',icon: <Badge count={1} className="me-3"><MailOutlined style={{ fontSize: '22px', cursor: 'pointer' }} /></Badge>, label: 'Mails' },
      ];

    const {
        token: { colorBgContainer, borderRadiusXS },
    } = theme.useToken();
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
    <Layout >
        
        <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} items={navitems} style={{
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
                style={{ marginTop: '70px', height: 'calc(100vh - 70px)' }}
            >
                <div className="demo-logo-vertical" />
                <div style={{ height: 'calc(100% - 48px)', overflowY: 'scroll' }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        {navitems.map(({ icon, label, url }, index) => (
                            <Menu.Item key={index} className='' style={{borderRadius: borderRadiusXS}}>
                                <Nav.Item className='nav-link pt-3 pb-1 d-flex justify-content-left align-items-center'>
          
                                    <span className='text-white' >{icon}</span>
                                    <Link
                                        to={url}
                                        style={{
                                            fontWeight: 500,
                                            borderRadius: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '8px 16px', // Adjust padding as needed
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

            
        <Layout style={{marginTop:'70px',}} className='mb-0'>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{backgroundColor: '#d7d7e9',borderRadius: borderRadiusXS }}>
                    <Breadcrumb
                        items={[
                            {href: '/',title: <HomeOutlined />,},
                            {title: (<><UserOutlined /><span>dfsvdff</span></>),},
                        ]}
                    />
                    <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
            <Content className='m-2'>
            <div
                style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusXS,
                height:'calc(100vh - 140px)'
                }}
            >
                content
            </div>
            </Content>
            
            
        </Layout>
        <Footer
            
            style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}
            >
            {Companyname} ©2018 Created by Ant UED
        </Footer>
          
    </Layout>
  );
};
export default Dashboard;
