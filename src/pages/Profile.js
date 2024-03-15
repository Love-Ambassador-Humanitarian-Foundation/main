import React from 'react';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { Row, Col, Avatar, Typography, Button } from 'antd';
import { useParams } from 'react-router-dom';
const { Title, Text } = Typography;

const UserProfilePage = ({Companyname,isloggedIn}) => {
    const {userdetails} = useParams();
    console.log(userdetails+"==========")
    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} />
            <div style={{ padding: '20px', marginTop:'70px' }}>
                <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                    <Col>
                    <Avatar size={120} src="https://example.com/avatar.jpg" />
                    </Col>
                </Row>
                <Row justify="center" align="middle" gutter={[16, 16]}>
                    <Col span={24}>
                    <Title level={3}>User Information</Title>
                    <Text strong>Name:</Text> John Doe<br />
                    <Text strong>Email:</Text> {userdetails}<br />
                    <Text strong>Location:</Text> New York, USA<br />
                    {/* Add more user information as needed */}
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                    <Col>
                    <Button type="primary" size="large">Edit Profile</Button>
                    </Col>
                </Row>
                
            </div>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </> 
  );
};

export default UserProfilePage;

