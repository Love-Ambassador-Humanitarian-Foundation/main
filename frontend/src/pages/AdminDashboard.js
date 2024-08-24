import React, { useRef, useState, useEffect } from 'react';
import {
    DashboardOutlined,
    UsergroupAddOutlined,
    InteractionOutlined,
    UserOutlined,
    BranchesOutlined,
    HomeOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Card, Row, Col, theme, Layout, Breadcrumb, Button } from 'antd';
import axios from 'axios';

const { Content } = Layout;
const { Meta } = Card;

const Dashboard = ({ API_URL }) => {
    const [barwidth, setBarWidth] = useState(350);
    const vref = useRef(null);
    const { token: { colorBgContainer, borderRadiusSM } } = theme.useToken();

    const [volunteerloading, setIsVolunteerLoading] = useState(false);
    const [volunteers, setVolunteers] = useState([]);
    const [branchesloading, setIsBranchesLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [eventsloading, setIsEventsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [partnersloading, setIsPartnersLoading] = useState(false);
    const [partners, setPartners] = useState([]);
    const [volunteerchartloading, setIsVolunteerChartLoading] = useState(false);
    const [volunteerschart, setVolunteersChart] = useState([]);
    const [eventschartloading, setIsEventChartLoading] = useState(false);
    const [eventschart, setEventChart] = useState([]);
    const [lastloginloading, setIsLastLoginLoading] = useState(false);
    const [lastloginchart, setLastLoginChart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsVolunteerLoading(true);
            setIsBranchesLoading(true);
            setIsPartnersLoading(true);
            setIsEventsLoading(true);
            setIsVolunteerChartLoading(true);
            setIsEventChartLoading(true);
            setIsLastLoginLoading(true);
        
            try {
                const volunteersResponse = await axios.get(`${API_URL}/api/users`);
                setVolunteers(volunteersResponse.data.data);
            } catch (error) {
                console.error('Error fetching volunteers:', error);
            } finally {
                setIsVolunteerLoading(false);
            }
        
            try {
                const branchesResponse = await axios.get(`${API_URL}/api/about`);
                setBranches(branchesResponse.data.data.branches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setIsBranchesLoading(false);
            }
            try {
                const partnersResponse = await axios.get(`${API_URL}/api/partners`);
                setPartners(partnersResponse.data.data);
            } catch (error) {
                console.error('Error fetching partners:', error);
            } finally {
                setIsPartnersLoading(false);
            }
        
            try {
                const eventsResponse = await axios.get(`${API_URL}/api/events`);
                setEvents(eventsResponse.data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setIsEventsLoading(false);
            }
        
            try {
                const volunteersChartResponse = await axios.get(`${API_URL}/api/reports/volunteer`);
                setVolunteersChart(volunteersChartResponse.data.data);
            } catch (error) {
                console.error('Error fetching volunteer chart:', error);
            } finally {
                setIsVolunteerChartLoading(false);
            }
        
            try {
                const eventsChartResponse = await axios.get(`${API_URL}/api/reports/events`);
                setEventChart(eventsChartResponse.data.data);
            } catch (error) {
                console.error('Error fetching event chart:', error);
            } finally {
                setIsEventChartLoading(false);
            }
        
            try {
                const lastLoginResponse = await axios.get(`${API_URL}/api/reports/loggedin?limit=20`);
                setLastLoginChart(lastLoginResponse.data.data);
            } catch (error) {
                console.error('Error fetching last login chart:', error);
            } finally {
                setIsLastLoginLoading(false);
            }
        };
        

        fetchData();

        const handleResize = () => {
            if (vref.current) {
                setBarWidth(vref.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial resize on mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [API_URL]);

    const cardData = [
        {
            url: '/admin/profiles',
            icon: <UsergroupAddOutlined className="rounded-5 p-1" style={{ backgroundColor: '#fa5a7d' }} />,
            title: 'Volunteers',
            description: volunteerloading ? <Button className='bg-transparent border-0' loading={volunteerloading}></Button> : volunteers.length,
            bgcolor: '#ffe2e6'
        },
        {
            url: '/admin/branches',
            icon: <BranchesOutlined className='rounded-5 p-1' style={{ backgroundColor: '#fe947a' }} />,
            title: 'Branches',
            description: branchesloading ? <Button className='bg-transparent border-0' loading={branchesloading}></Button> : branches.length,
            bgcolor: '#fff4de'
        },
        {
            url: '/admin/events',
            icon: <InteractionOutlined className='rounded-5 p-1' style={{ backgroundColor: '#3cd856' }} />,
            title: 'Events',
            description: eventsloading ? <Button className='bg-transparent border-0' loading={eventsloading}></Button> : events.length,
            bgcolor: '#dcfce7'
        },
        {
            url: '/admin/partners',
            icon: <UserSwitchOutlined className='rounded-5 p-1' style={{ backgroundColor: '#bf83ff' }} />,
            title: 'Partners',
            description: partnersloading ? <Button className='bg-transparent border-0' loading={partnersloading}></Button> : partners.length,
            bgcolor: '#f4e8ff'
        }
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
                                    {lastloginloading ?
                                        <Button className='bg-transparent border-0' loading={lastloginloading}></Button> :
                                        lastloginchart.map((user, index) => (
                                            <Col xs={24} key={index}>
                                                <Link to={`/admin/users/${user.id}`} style={{ textDecoration: 'none' }}>
                                                    <Card style={{ borderRadius: borderRadiusSM, height: '40px' }}>
                                                        <Card.Meta
                                                            avatar={<UserOutlined className='rounded-5 p-1' style={{ backgroundColor: '#d7d7e9' }} />}
                                                            title={<span>{user.name} - <small style={styles.userDateTime}>({user.last_login})</small></span>}
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
                            
                            {volunteerchartloading ?
                                <Button className='bg-transparent border-0' loading={volunteerchartloading}></Button> :
                                <BarChart width={barwidth} height={300} data={volunteerschart} style={{ marginLeft: '-50px' }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>
                            }
                        </Col>
                        <Col xs={24} md={12} style={{ borderRadius: borderRadiusSM }}>
                            <small className='fw-bold'>Events Held</small>

                            { eventschartloading ?
                                <Button className='bg-transparent border-0' loading={eventschartloading}></Button> :
                                <BarChart width={barwidth} height={300} data={eventschart} style={{ marginLeft: '-50px' }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#82ca9d" />
                                </BarChart>}
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Dashboard;
