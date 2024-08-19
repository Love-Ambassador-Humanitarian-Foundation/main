import React, { useRef, useState, useEffect } from 'react';
import {
    DashboardOutlined,
    UsergroupAddOutlined,
    StarOutlined,
    InteractionOutlined,
    UserOutlined,
    BranchesOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Card, Row, Col, theme, Layout, Breadcrumb, Button } from 'antd';
import axios from 'axios';
const { Content } = Layout;
const { Meta } = Card;

const Dashboard = ({API_URL}) => {
    const [barwidth, setBarWidth] = useState(350);
    const vref = useRef(null);
    const { token: { colorBgContainer, borderRadiusSM } } = theme.useToken();
    
    const [volunteerloading, setIsVolunteerLoading] = useState(false);
    const [volunteers, setVolunteers] = useState([]);
    const [branchesloading, setIsBranchesLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [eventsloading, setIsEventsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [achievementsloading, setIsAchievementsLoading] = useState(false);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchVolunteers = async () => {
            setIsVolunteerLoading(true);
            try {
                const url = `${API_URL}/api/users`; // Make sure API_URL is defined in your environment
                const response = await axios.get(url);
                setVolunteers(response.data.data); // Assuming the response is an array of users
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsVolunteerLoading(false);
            }
        };

        fetchVolunteers();
        const fetchBranches = async () => {
            setIsBranchesLoading(true);
            setIsAchievementsLoading(true);
            try {
                const url = `${API_URL}/api/about`; // Make sure API_URL is defined in your environment
                const response = await axios.get(url);
                setAchievements(response.data.response.achievements);
                setBranches(response.data.response.branches); // Assuming the response is an array of users
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsBranchesLoading(false);
                setIsAchievementsLoading(false);
            }
        };

        fetchBranches();
        const fetchEvents = async () => {
            setIsEventsLoading(true);
            try {
                const url = `${API_URL}/api/events`; // Make sure API_URL is defined in your environment
                const response = await axios.get(url);
                setEvents(response.data.response); // Assuming the response is an array of users
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsEventsLoading(false);
            }
        };
        fetchEvents();

        const handleResize = () => {
            if (vref.current) {
                setBarWidth(vref.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [API_URL]); // Empty dependency array to run effect only once on component mount
    

    const cardData = [
        {
            url: '/admin/profiles',
            icon: <UsergroupAddOutlined className="rounded-5 p-1" style={{ backgroundColor: '#fa5a7d' }} />,
            title: 'Volunteers',
            description: volunteerloading ? <Button className='bg-transparent border-0' loading={volunteerloading}></Button> : volunteers?volunteers.length:0,
            bgcolor: '#ffe2e6'
        },        
        {
            url: '/admin/branches',
            icon: <BranchesOutlined className='rounded-5 p-1' style={{ backgroundColor: '#fe947a' }} />,
            title: 'Branches',
            description: branchesloading ? <Button className='bg-transparent border-0'  loading={branchesloading}></Button>: branches?branches.length:0,
            bgcolor: '#fff4de'
        },
        {
            url: '/admin/events',
            icon: <InteractionOutlined className='rounded-5 p-1' style={{ backgroundColor: '#3cd856' }} />,
            title: 'Events',
            description: eventsloading ? <Button className='bg-transparent border-0' loading={eventsloading}></Button> : events?events.length:0,
            bgcolor: '#dcfce7'
        },
        {
            url: '/admin/achievements',
            icon: <StarOutlined className='rounded-5 p-1' style={{ backgroundColor: '#bf83ff' }} />,
            title: 'Achievements',
            description: achievementsloading ? <Button className='bg-transparent border-0'  loading={achievementsloading}></Button> : achievements ?achievements.length:0,
            bgcolor: '#f4e8ff'
        }
    ];

    const loggedinusers = [
        { id: 1, name: 'Alice Johnson', datetime: '2024-05-25 14:30', urlprofile: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 2, name: 'Bob Smith', datetime: '2024-05-25 13:45', urlprofile: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 3, name: 'Charlie Brown', datetime: '2024-05-25 12:20', urlprofile: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 4, name: 'Diana Prince', datetime: '2024-05-25 11:15', urlprofile: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 5, name: 'Ethan Hunt', datetime: '2024-05-25 10:50', urlprofile: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 6, name: 'Fiona Gallagher', datetime: '2024-05-25 09:30', urlprofile: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: 7, name: 'George Costanza', datetime: '2024-05-25 08:25', urlprofile: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 8, name: 'Hannah Montana', datetime: '2024-05-25 07:10', urlprofile: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 9, name: 'Ian Malcolm', datetime: '2024-05-25 06:45', urlprofile: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { id: 10, name: 'Jessica Day', datetime: '2024-05-25 05:20', urlprofile: 'https://randomuser.me/api/portraits/women/5.jpg' },
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
            fontSize: '12px'
        },
        scrollableRow: {
            maxHeight: '200px',
            overflowY: 'scroll',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
        },
        noScrollbar: {
            '::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar in WebKit-based browsers
            }
        },
    };

    

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><DashboardOutlined /><span>DashBoard</span></>) },
                    ]}
                />
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
                        <Col xs={24} md={17} style={{ borderRadius: borderRadiusSM, backgroundColor: '#fcfcfc', padding: '16px' }}>
                            <div>
                                <h5 className='fw-bold'>General Data</h5>
                                <small>Summary</small>
                            </div>
                            <Row gutter={[16, 16]}>
                                {cardData.map((card, index) => (
                                    <Col xs={12} md={6} key={index} style={{ borderRadius: borderRadiusSM, padding: '1px' }}>
                                        <Link to={card.url} style={{ textDecoration: 'none' }}>
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
                                                <Meta title={<>{card.icon}<br /> <span>{card.title}</span></>} description={<strong className='text-black' style={{fontSize:'20px'}}>{card.description}</strong>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col xs={24} md={7} style={{ borderRadius: borderRadiusSM, backgroundColor: '#fcfcfc', padding: '16px' }}>
                            <small className='fw-bold'>Recently Logged In</small>
                            <div style={{ ...styles.scrollableRow, ...styles.noScrollbar }}>
                                <Row gutter={[4, 4]}>
                                    {loggedinusers.map((user, index) => (
                                        <Col xs={24} key={index}>
                                            <Link to={`/admin/users/${user.id}`} style={{ textDecoration: 'none' }}>
                                                <Card style={{ borderRadius: borderRadiusSM, height: '40px' }}>
                                                    <Card.Meta
                                                        avatar={<UserOutlined className='rounded-5 p-1' style={{ backgroundColor: '#d7d7e9' }} />}
                                                        title={<span>{user.name} - <small style={styles.userDateTime}>({user.datetime})</small></span>}
                                                        style={{ marginTop: '-16px' }}
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
                        <Col id="vref" ref={vref} xs={24} md={12} style={{ borderRadius: borderRadiusSM }}>
                            <small className='fw-bold'>Volunteers Joined</small>
                            <BarChart width={barwidth} height={300} data={chartdata} style={{ marginLeft: '-50px' }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="volunteers" fill="#8884d8" />
                            </BarChart>
                        </Col>
                        <Col xs={24} md={12} style={{ borderRadius: borderRadiusSM }}>
                            <small className='fw-bold'>Events Held</small>
                            <BarChart width={barwidth} height={300} data={chartdata} style={{ marginLeft: '-50px' }}>
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
