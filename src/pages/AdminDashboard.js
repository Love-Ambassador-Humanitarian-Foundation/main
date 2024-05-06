import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/AdminHeader';
import { HomeOutlined, EditOutlined, SaveOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Breadcrumb } from 'antd';
const { Header, Content, Sider, Footer } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);
const Dashboard = ({Companyname, isloggedIn}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
        
        <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} style={{
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
                style={{marginTop:'70px', height:'calc(100vh - 70px)'}}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>}
            
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
