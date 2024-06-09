import React,{useRef, useState, useEffect} from 'react';
import { DashboardOutlined, UsergroupAddOutlined, StarOutlined, InteractionOutlined,UserOutlined, BranchesOutlined, EditOutlined, HomeOutlined} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Card, Row, Col, theme, Layout, Breadcrumb  } from 'antd';
const { Content} = Layout;

const Dashboard = () => {
    const [barwidth, setBarWidth] = useState(350);
    
    const [editpage,SetEditPage] = useState(false);
    const vref = useRef(null);
    const { token: { colorBgContainer, borderRadiusSM },} = theme.useToken();
    const { Meta } = Card;

    const cardData = [
        { url:'/admin/profiles', icon: <UsergroupAddOutlined className='rounded-5 p-1' style={{backgroundColor:'#fa5a7d'}} />, title: 'Volunteers', description: 'Manage Profiles', bgcolor:'#ffe2e6' },
        { url:'/admin/branches', icon: <BranchesOutlined className='rounded-5 p-1' style={{backgroundColor:'#fe947a'}} />, title: 'Branches', description: 'Manage branches', bgcolor:'#fff4de'  },
        { url:'/admin/events', icon: <InteractionOutlined className='rounded-5 p-1' style={{backgroundColor:'#3cd856'}} />, title: 'Events', description: 'View event data', bgcolor:'#dcfce7'  },
        { url:'/admin/achievements', icon: <StarOutlined className='rounded-5 p-1' style={{backgroundColor:'#bf83ff'}} />, title: 'Achievements', description: 'View achievements', bgcolor:'#f4e8ff' },
    ];
    const loggedinusers = [
        { name: 'Alice Johnson', datetime: '2024-05-25 14:30', urlprofile: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'Bob Smith', datetime: '2024-05-25 13:45', urlprofile: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Charlie Brown', datetime: '2024-05-25 12:20', urlprofile: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Diana Prince', datetime: '2024-05-25 11:15', urlprofile: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { name: 'Ethan Hunt', datetime: '2024-05-25 10:50', urlprofile: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Fiona Gallagher', datetime: '2024-05-25 09:30', urlprofile: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { name: 'George Costanza', datetime: '2024-05-25 08:25', urlprofile: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { name: 'Hannah Montana', datetime: '2024-05-25 07:10', urlprofile: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: 'Ian Malcolm', datetime: '2024-05-25 06:45', urlprofile: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: 'Jessica Day', datetime: '2024-05-25 05:20', urlprofile: 'https://randomuser.me/api/portraits/women/5.jpg' },
    ];
    const chartdata = [
        { month: 'Jan', volunteers: 30, events: 10 },
        { month: 'Feb', volunteers: 45, events: 20 },
        { month: 'Mar', volunteers: 60, events: 30 },
        { month: 'Apr', volunteers: 75, events: 25 },
        { month: 'May', volunteers: 90, events: 35 },
        { month: 'Jun', volunteers: 80, events: 40 },
        { month: 'Jul', volunteers: 70, events: 45 },
        { month: 'Aug', volunteers: 85, events: 50 },
        { month: 'Sep', volunteers: 100, events: 55 },
        { month: 'Oct', volunteers: 110, events: 60 },
        { month: 'Nov', volunteers: 120, events: 65 },
        { month: 'Dec', volunteers: 130, events: 70 },
      ];
    const styles = {
        userDateTime: {
            color: 'green',
            fontSize:'12px'
        },
        scrollableRow: {
            maxHeight: '200px',
            overflowY: 'scroll',
        }
    };
    

    useEffect(() => {
        const handleResize = () => {
            if (vref.current) {
                setBarWidth(vref.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><DashboardOutlined /><span>DashBoard</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={()=>SetEditPage(!editpage)} />
            </div>
            <Content className='m-2'>
                <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusSM,
                            height: 'calc(100vh - 140px)'
                        }}
                    >
            <Row gutter={[16, 16]}>
                <Col xs={24} md={17} style={{ borderRadius: borderRadiusSM, backgroundColor:'#fcfcfc', padding:'16px'}}>
                    <div>
                        <h5 className='fw-bold'>General Data</h5>
                        <small>Summary</small>
                    </div>
                    <Row gutter={[16, 16]}>
                        {cardData.map((card, index) => (
                            <Col xs={12} md={6} key={index} style={{ borderRadius: borderRadiusSM,padding:'1px'}}>
                                <Link to={card.url} style={{textDecoration: 'none'}}>
                                    <Card
                                        style={{ 
                                        borderRadius: borderRadiusSM, 
                                        height: '120px', 
                                        backgroundColor: card.bgcolor,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        }}
                                    >
                                        <Meta  title={<>{card.icon}<br/> <span>{card.title}</span></>}  description={card.description} />
                                        
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={24} md={7} style={{ borderRadius: borderRadiusSM, backgroundColor:'#fcfcfc', padding:'16px'}}>
                    <small className='fw-bold'>Recently Logged In</small>
                    <div style={{ ...styles.scrollableRow }}>
                        <Row gutter={[4, 4]}>
                            {loggedinusers.map((user, index) => (
                                <Col xs={24} key={index}>
                                    <Link to={`/admin/users/${user.id}`} style={{textDecoration: 'none'}}>
                                        <Card style={{ borderRadius: borderRadiusSM, height: '40px' }}>
                                            <Card.Meta
                                                avatar={<UserOutlined className='rounded-5 p-1' style={{backgroundColor:'#d7d7e9'}} />}
                                                title={<span>{user.name}-<small style={styles.userDateTime}>({user.datetime})</small></span>}
                                                style={{marginTop:'-16px'}}
                                            />
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col id="vref" ref={vref} xs={24} md={12} style={{ borderRadius: borderRadiusSM}}>
                    <small className='fw-bold'>Volunteers Joined</small>
                    <BarChart width={barwidth} height={300} data={chartdata} style={{marginLeft:'-50px'}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="volunteers" fill="#8884d8" />
                    </BarChart>
                </Col>
                <Col xs={24} md={12} style={{ borderRadius: borderRadiusSM}}>
                    <small className='fw-bold'>Events Held</small>
                    <BarChart width={barwidth} height={300} data={chartdata} style={{marginLeft:'-50px'}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="events" fill="#82ca9d" />
                    </BarChart>
                </Col>
            </Row>
            </div>
            </Content>
        </Layout>
    );
};
export default Dashboard;
