import React from 'react';
import { SaveOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, WhatsAppOutlined, LinkedinOutlined,HomeOutlined, EditOutlined, UserOutlined  } from '@ant-design/icons';
import { Row, Col, Avatar, Typography,Input, theme, Select, Layout, Breadcrumb   } from 'antd';

import { Button} from '../components/button';
import { useParams } from 'react-router-dom';
import {countryCodes} from '../utils/utils';

const { Content} = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const Profile = ({onSetScreen}) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const {userdetails} = useParams();
    console.log(userdetails+"==========");
    const [editprofile,setEditProfile] = React.useState(false);
    
    const [name, setName] = React.useState('John Doe');
    const [status, setStatus] = React.useState('Active');
    const [email, setEmail] = React.useState('john@email.com');
    const [phonenumber,setPhonenumber] = React.useState('08012345678');
    const [address,setAddress] = React.useState('Lagos state');
    const [phonenumberpre,setPhonenumberpre] = React.useState('+234');
    const [facebook,setFacebook] = React.useState('facebook.com/john');
    const [instagram,setInstagram] = React.useState('instagram.com/john');
    const [twitter,setTwitter] = React.useState('twitter.com/john');
    const [linkedIn, setLinkedIn] = React.useState('linkedin.com/in/john');
    const [whatsapp,setWhatsapp] = React.useState('whatsapp.com/john');

    const saveEdit = () => {
        setEditProfile(false);
    }
    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'status') {
          setStatus(e.target.value);
        } else if (e.target.id === 'email') {
          setEmail(e.target.value);
        } else if (e.target.id === 'phonenumber') {
            const newValue = e.target.value;
            const lastChar = newValue.charAt(newValue.length - 1);
            if (!isNaN(lastChar)) {
                setPhonenumber(e.target.value); // Concatenate digits to the current phone number
                console.log(phonenumberpre+"("+e.target.value+")");
            } 
            
        } else if (e.target.id === 'address') {
            setAddress(e.target.value);
        } else if (e.target.id === 'facebook') {
            setFacebook(e.target.value);
        } else if (e.target.id === 'instagram') {
            setInstagram(e.target.value);
        } else if (e.target.id === 'twitter') {
          setTwitter(e.target.value);
        } else if (e.target.id === 'linkedIn') {
            setLinkedIn(e.target.value);
        } else if (e.target.id === 'whatsapp') {
            setWhatsapp(e.target.value);
        }

    };
    
    const items = [
        { title: 'Fundraising', 
            amount:34,
            content: [
                {title: 'Upcoming Fundraiser', date: 'May 25th, 2023'},
                {title: 'Fundraiser Report', date: 'June 15th, 2023'}
            ] },
        { title: 'Volunteering', 
            amount:34,
            content: [
                {title: 'Orphanage visitation', date: 'May 25th, 2023'},
                {title: 'Food distribution', date: 'June 15th, 2023'},
                {title: 'Clothes donation drive', date: 'July 1st-15th, 2023'}
            ] },
        { title: 'Donation', 
            amount:34,
            content: [
                {title: 'Donation Drive', date: 'June 15th - 30th, 2023'},
                {title: 'Donation Drive Report', date: 'July 15th, 2023'}
            ] },
        { title: 'Seminars', 
            amount:34,
            content: [
                {title: 'Seminar on Nutrition', date: 'July 10th, 2023'},
                {title: 'Seminar on Child Development', date: 'August 15th, 2023'}
            ] },
        {
          title:'Partnerships',
          amount:1,
          content: [
              {title: 'Partnership with XYZ Foundation', date: 'August 30th, 2023'},
          ]
        }
    ]
      
    const selectBefore = (
        <Select defaultValue={phonenumberpre} disabled={!editprofile} onChange={(value) => setPhonenumberpre(value)} style={{minWidth: '80px'}}>
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                {country.code}
                </Option>
            ))}
        </Select>
    );

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<><UserOutlined /><span>{name}</span></>) },
                    ]}
                />
                <EditOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} onClick={()=>setEditProfile(!editprofile)} />
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                        height: 'calc(100vh - 140px)'
                    }}
                >
            <Row justify="center" align="middle" style={{ marginBottom: '30px' }} >
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: '#d7d7e9'}} >
                        <div className='d-flex flex-column justify-content-between align-items-center ms-2 p-2'>
                            <Avatar size={150} src="https://example.com/avatar.jpg" />
                            <div className='d-flex flex-column justify-content-left'>
                                <Title level={3}>Mr. John Doe</Title>
                                <Text strong>Status: {userdetails}</Text> 
                                <Text strong>Phone Number: {userdetails}</Text> 
                                <Text strong>Email: {userdetails}</Text> 
                                <Text strong>Location: New York, USA</Text> 
                            </div>
                        </div>
                    </Col>
                    
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} span={24} >
                        <div className='d-flex flex-column justify-content-left ms-2 p-2'>
                            <Text strong> 
                                Full Name: <input id="name" type="text" className="form-control" placeholder={name} value={name} onChange={handleInputChange} disabled={!editprofile} />
                            </Text>
                            <Text strong>Status: <input id="status" type="text" className="form-control" placeholder={status} value={status} disabled /></Text> 
                            <Text strong>Phone Number: <Input id="phonenumber" type="text" addonBefore={editprofile && selectBefore }  placeholder={phonenumber} onChange={handleInputChange} value={phonenumber} disabled={!editprofile} />
                            </Text> 
                            <Text strong>Email: <input id="email" type="text" className="form-control" placeholder={email} value={email} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            <Text strong>Address: <input id="address" type="text" className="form-control" placeholder={address} value={address} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                        </div>  
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}} >
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-left py-2' >
                            <Text strong className='mb-2'>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                Face Book <span></span>
                                </a>
                            <FacebookOutlined style={{fontSize:16, color:'#1877F2'}} />: <input id="facebook" type="text" className="form-control" placeholder={facebook} value={facebook} onChange={handleInputChange} disabled={!editprofile} /></Text>
                            
                            <Text strong className='mb-2'>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Twitter <span></span>
                                </a>
                                <TwitterOutlined style={{fontSize:16,color:'#1DA1F2'}} />: <input id="twitter" type="text" className="form-control" placeholder={twitter} value={twitter} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                            <Text strong className='mb-2'>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Instagram <span></span>
                                </a>
                                <InstagramOutlined style={{fontSize:16, color:'#E4405F'}} />: <input id="instagram" type="text" className="form-control" placeholder={instagram} value={instagram} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                            <Text strong className='mb-2'>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Whatsapp <span></span>
                                </a>
                            <WhatsAppOutlined style={{fontSize:16, color:'#25D366'}} />: <input id="whatsapp" type="text" className="form-control" placeholder={whatsapp} value={whatsapp} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                            <Text strong className='mb-2'>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    LinkedIn <span></span>
                                </a>
                            <LinkedinOutlined style={{fontSize:16, color:'#0077B5'}} />: <input id="linkedln" type="text" className="form-control" placeholder={linkedIn} value={linkedIn} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                        </div>  
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-left ms-2'>
                            {items.map((item, index) => (
                                <div key={index} className='my-2'>
                                    <Text strong>{item.title} - ({item.amount}) : {item.content.map((c) => (<input id={`${index}-${c.title}`} type="text" className="form-control" placeholder={c.title} value={`${c.title} - ${c.date}`} disabled />))}</Text>
                                </div>
                            ))}
                        </div>  
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                    {editprofile ?
                    <Col>
                        <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                    </Col>
                    :
                    <>
                    </>
                    }
                </Row>
                
                </div>
            </Content>
        </Layout>
  );
};

export default Profile;
