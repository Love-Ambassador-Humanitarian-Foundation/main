import React, { useRef, useState, useEffect } from 'react';
import {
    DashboardOutlined,
    UsergroupAddOutlined,
    BranchesOutlined,
    ProfileOutlined,
    UserSwitchOutlined,
    HomeOutlined,
    UserOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Card, Row, Col, theme, Layout, Breadcrumb, Button, Spin } from 'antd';
import axios from 'axios';

const { Content } = Layout;
const { Meta } = Card;

const Dashboard = ({ API_URL }) => {
    const [barwidth, setBarWidth] = useState(350);
    const vref = useRef(null);
    const { token: { colorBgContainer, borderRadiusSM } } = theme.useToken();

    const [loadingStates, setLoadingStates] = useState({
        volunteer: false,
        branches: false,
        partners: false,
        scholarships: false,
        volunteerChart: false,
        scholarshipsChart: false,
        lastLogin: false
    });
    const [data, setData] = useState({
        volunteers: [],
        branches: [],
        partners: [],
        scholarships: [],
        volunteersChart: [],
        scholarshipsChart: [],
        lastLoginChart: []
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoadingStates(prev => ({ ...prev, volunteer: true, branches: true, partners: true, scholarships: true, volunteerChart: true, scholarshipsChart: true, lastLogin: true }));

            try {
                const branchesResponse = await axios.get(`${API_URL}/api/about`);
                setData(prev => ({ ...prev, branches: branchesResponse.data.data.branches }));
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setLoadingStates(prev => ({ ...prev, branches: false }));
            }

            try {
                const partnersResponse = await axios.get(`${API_URL}/api/partners`);
                setData(prev => ({ ...prev, partners: partnersResponse.data.data }));
            } catch (error) {
                console.error('Error fetching partners:', error);
            } finally {
                setLoadingStates(prev => ({ ...prev, partners: false }));
            }

            try {
                const volunteersChartResponse = await axios.get(`${API_URL}/api/reports/volunteer`);
                setData(prev => ({ ...prev, volunteersChart: volunteersChartResponse.data.data.chart, volunteers: volunteersChartResponse.data.data.volunteers }));
            } catch (error) {
                console.error('Error fetching volunteer chart:', error);
            } finally {
                setLoadingStates(prev => ({ ...prev, volunteerChart: false, volunteer: false }));
            }

            try {
                const scholarshipsChartResponse = await axios.get(`${API_URL}/api/reports/scholarships`);
                setData(prev => ({ ...prev, scholarshipsChart: scholarshipsChartResponse.data.data.chart, scholarships: scholarshipsChartResponse.data.data.scholarships }));
            } catch (error) {
                console.error('Error fetching scholarship chart:', error);
            } finally {
                setLoadingStates(prev => ({ ...prev, scholarshipsChart: false, scholarships: false }));
            }

            try {
                const lastLoginResponse = await axios.get(`${API_URL}/api/reports/loggedin?limit=20`);
                setData(prev => ({ ...prev, lastLoginChart: lastLoginResponse.data.data }));
            } catch (error) {
                console.error('Error fetching last login chart:', error);
            } finally {
                setLoadingStates(prev => ({ ...prev, lastLogin: false }));
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
            description: loadingStates.volunteer ? <Spin /> : data.volunteers.length,
            bgcolor: '#ffe2e6'
        },
        {
            url: '/admin/branches',
            icon: <BranchesOutlined className='rounded-5 p-1' style={{ backgroundColor: '#fe947a' }} />,
            title: 'Branches',
            description: loadingStates.branches ? <Spin /> : data.branches.length,
            bgcolor: '#fff4de'
        },
        {
            url: '/admin/scholarships',
            icon: <ProfileOutlined className='rounded-5 p-1' style={{ backgroundColor: '#3cd856' }} />,
            title: 'Scholarships',
            description: loadingStates.scholarships ? <Spin /> : data.scholarships.length,
            bgcolor: '#dcfce7'
        },
        {
            url: '/admin/partners',
            icon: <UserSwitchOutlined className='rounded-5 p-1' style={{ backgroundColor: '#bf83ff' }} />,
            title: 'Partners',
            description: loadingStates.partners ? <Spin /> : data.partners.length,
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
                                    {loadingStates.lastLogin ?
                                        <Spin /> :
                                        data.lastLoginChart.map((user, index) => (
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
                            
                            {loadingStates.volunteerChart ?
                                <Spin /> :
                                <BarChart width={barwidth} height={300} data={data.volunteersChart} style={{ marginLeft: '-50px' }}>
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
                            <small className='fw-bold'>Scholarships in Progress</small>

                            {loadingStates.scholarshipsChart ?
                                <Spin /> :
                                <BarChart width={barwidth} height={300} data={data.scholarshipsChart} style={{ marginLeft: '-50px' }}>
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
