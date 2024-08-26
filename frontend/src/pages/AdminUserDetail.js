import React, { useEffect, useState } from 'react';
import {
    HomeOutlined,
    UserOutlined,
    EditOutlined,
    SaveOutlined,
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    WhatsAppOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
import { Layout,Row, Col, Typography, Input, Button, message, Breadcrumb,Select, Avatar } from 'antd';
import { countryCodes, fetchUserDetails, convertImageToBase64 } from '../utils/utils';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import DateTimeInput from '../components/DateTimeSetter';
import axios from 'axios';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;
const User = ({ API_URL }) => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName]=useState(null)
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumberPre, setPhoneNumberPre] = useState('+234');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [is_active, setIsActive]=useState(null)
    const [is_staff, setIsStaff]=useState(null)
    const [joined_date, setJoinedDate]=useState(null)
    const [last_login, setLastLogin]=useState(null)
    const [position, setPosition]=useState(null)
    const [events, setEvents] = useState([
        { title: "Fundraiser", content: [{ name: 'Event 1', date: '2023-01-01' },{ name: 'Event 2', date: '2023-01-01' }] },
        { title: "Donations", content: [{ name: 'Event 2', date: '2023-02-01' }] },
        { title: "Seminars", content: [{ name: 'Event 3', date: '2023-03-01' }] }
    ]);
    
    const joined_dateonChange = (dateString) => {
        try{
            let dateobj = new Date(dateString);
            
            //console.log('joined_date', dateobj.toISOString());
            //console.log('last_login', last_login)
            setJoinedDate(dateobj.toISOString());
        }catch (error) {
            //
        }
      };
    const last_loginonChange = (dateString) => {
        try{
            let dateobj = new Date(dateString);
            //console.log('last_login', dateobj.toISOString());
            //console.log('joined_date', joined_date);
            setLastLogin(dateobj.toISOString());
        }catch (error) {
            //
        }
        
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const user = await fetchUserDetails(API_URL, userId);
                setUserDetails(user);
                //console.log(user)
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setStatus(user.is_active ? 'Active' : 'Inactive');
                setEmail(user.email);
                setPhoneNumberPre(user.numberpre);
                setPhoneNumber(user.number);
                setAddress(user.address);
                setFacebook(user.facebook);
                setInstagram(user.instagram);
                setTwitter(user.twitter);
                setLinkedIn(user.linkedIn);
                setWhatsapp(user.whatsapp);
                setProfileImage(user.profileImage);
                setIsActive(user.is_active);
                setIsStaff(user.is_staff);
                setJoinedDate(user.joined_date);
                setLastLogin(user.last_login);
                setPosition(user.position);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

            try {
                const token = localStorage.getItem('lahf_access_token');
                const id = userId || localStorage.getItem('lahf_user_id');
                const response = await axios.get(`${API_URL}/api/events/participant/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                console.log(response.data);
                setEvents(response.data.data);
                console.log(events)
            } catch (error) {
                console.error('Error fetching event details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, userId, events]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'firstname':
                setFirstName(value);
                break;
            case 'lastname':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phonenumber':
                if (!isNaN(value.charAt(value.length - 1))) {
                    setPhoneNumber(value);
                }
                break;
            case 'address':
                setAddress(value);
                break;
            case 'facebook':
                setFacebook(value);
                break;
            case 'instagram':
                setInstagram(value);
                break;
            case 'twitter':
                setTwitter(value);
                break;
            case 'linkedln':
                setLinkedIn(value);
                break;
            case 'whatsapp':
                setWhatsapp(value);
                break;
            case 'position':
                setPosition(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = async(e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertImageToBase64(file);
                setProfileImage(base64);
                //console.log(base64)
            } catch (error) {
                console.error('Error converting file to Base64:', error);
            }
        }
    };

    const saveEdit = async () => {
        setLoading(true);
        const token = localStorage.getItem('lahf_access_token');

        const formData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            numberpre: phoneNumberPre,
            number: parseInt(phoneNumber, 10),
            address: address,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter,
            linkedIn: linkedIn,
            whatsapp: whatsapp,
            position:position,
            is_active: is_active,
            is_staff:is_staff,
            last_login:last_login,
            joined_date:joined_date,
            profileImage:profileImage
        };
    
        // Log the formData content for debugging
        console.log(formData);
    
        try {
            const response = await axios.patch(`${API_URL}/api/users/${userDetails.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const user = response.data.data;
            setUserDetails(user);
            setFirstName(user.firstname);
            setLastName(user.lastname);
            setStatus(user.is_active ? 'Active' : 'Inactive');
            setEmail(user.email);
            setPhoneNumberPre(user.numberpre);
            setPhoneNumber(user.number);
            setAddress(user.address);
            setFacebook(user.facebook);
            setInstagram(user.instagram);
            setTwitter(user.twitter);
            setLinkedIn(user.linkedIn);
            setWhatsapp(user.whatsapp);
            setProfileImage(user.profileImage);
            setIsActive(user.is_active);
            setIsStaff(user.is_staff);
            setJoinedDate(user.joined_date);
            setLastLogin(user.last_login);
            setPosition(user.position);
            setEditProfile(false);
            message.success('User details updated');
            console.log('User details updated:', response.data.data);
        } catch (error) {
            console.error('Error updating user details:', error);
            message.error('Error updating user details');
        }
        setLoading(false);
    };

    const selectBefore = (
        <Select
            defaultValue={phoneNumberPre}
            disabled={!editProfile}
            onChange={(value) => setPhoneNumberPre(value)}
            style={{ minWidth: '80px' }}
            id='phonenumberpre'
        >
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                    {country.code}
                </Option>
            ))}
        </Select>
    );
    const activeBefore = (
        <Select
            defaultValue={is_active}
            disabled={!editProfile}
            onChange={(value) => setIsActive(value)}
            style={{ minWidth: '80px' }}
            id='is_active'
        >
            <Option key={0} value={false}>
                False
            </Option>
            <Option key={1} value={true}>
                True
            </Option>
        </Select>
    );
    const staffBefore = (
        <Select
            defaultValue={is_staff}
            disabled={!editProfile}
            onChange={(value) => setIsStaff(value)}
            style={{ minWidth: '80px' }}
            id='is_active'
        >
            <Option key={0} value={false}>
                False
            </Option>
            <Option key={1} value={true}>
                True
            </Option>
        </Select>
    );
    

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/#/admin/users' className='text-decoration-none'>
                        <UserOutlined />
                        <span>Users</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>{firstname}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <EditOutlined onClick={() => setEditProfile(!editProfile)} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                    }}
                >
                    <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className='d-flex flex-column justify-content-between align-items-center ms-2 p-2' style={{ backgroundColor: '#d7d7e9' }}>
                                <Avatar size={150} src={profileImage || "https://example.com/default-avatar.jpg"} />
                                {editProfile && (
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                )}
                                <div className='d-flex flex-column justify-content-left'>
                                    <Title level={3}>{firstname}, {lastname}</Title>
                                    <Text className='mb-1'>{status}--{position}</Text>
                                    <Text className='mb-2'>joined:{joined_date}</Text>
                                    <Text className='mb-2'>last login:{last_login}</Text>
                                </div>
                            </div>
                            <div className='my-2'>
                                <Text strong>FirstName: <input id="firstname" type="text" className="form-control" placeholder={firstname} value={firstname} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            </div>
                            <div className='my-2'>
                                <Text strong>LastName: <input id="lastname" type="text" className="form-control" placeholder={lastname} value={lastname} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className='d-flex flex-column justify-content-between ms-2'>
                                
                                <div className='my-2'>
                                    <Text strong>Email: <input id="email" type="email" className="form-control" placeholder={email} value={email} onChange={handleInputChange} disabled={!editProfile} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>Phone Number: <Input addonBefore={selectBefore} id="phonenumber" placeholder={phoneNumber} value={phoneNumber} onChange={handleInputChange} disabled={!editProfile} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>Address: <input id="address" type="text" className="form-control" placeholder={address} value={address} onChange={handleInputChange} disabled={!editProfile} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>Position: <input id="position" type="text" className="form-control" placeholder={position} value={position} onChange={handleInputChange} disabled={!editProfile} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>is Active: <Input addonBefore={activeBefore} id="is_active" placeholder={is_active} value={is_active} disabled={true} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>is Staff: <Input addonBefore={staffBefore} id="is_staff" placeholder={is_staff} value={is_staff} disabled={true} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>Date Joined: <DateTimeInput date={true} time={true} defaultValue={joined_date} onChange={joined_dateonChange} disabled={!editProfile} /></Text>
                                </div>
                                <div className='my-2'>
                                    <Text strong>Last Logged In: <DateTimeInput date={true} time={true} defaultValue={last_login} onChange={last_loginonChange} disabled={!editProfile} /></Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
                        <Col span={24}>
                            <Row justify="center" className='p-0 m-0' gutter={[2, 8]}>
                                <Col xs={24} sm={24} md={8}>
                                    <div className='mx-2'>
                                        <FacebookOutlined style={{ fontSize: '24px', marginRight: '10px', color:'#1877F2' }}/>
                                        <input id="facebook" type="text" className="form-control" placeholder="Facebook" value={facebook} onChange={handleInputChange} disabled={!editProfile} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <div className='mx-2'>
                                        <InstagramOutlined style={{ fontSize: '24px', marginRight: '10px', color:'#E4405F' }}/>
                                        <input id="instagram" type="text" className="form-control" placeholder="Instagram" value={instagram} onChange={handleInputChange} disabled={!editProfile} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <div className='mx-2'>
                                        <TwitterOutlined style={{ fontSize: '24px', marginRight: '10px', color:'#1DA1F2' }}/>
                                        <input id="twitter" type="text" className="form-control" placeholder="Twitter" value={twitter} onChange={handleInputChange} disabled={!editProfile} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <div className='mx-2'>
                                        <LinkedinOutlined style={{ fontSize: '24px', marginRight: '10px', color:'#0077B5' }}/>
                                        <input id="linkedln" type="text" className="form-control" placeholder="LinkedIn" value={linkedIn} onChange={handleInputChange} disabled={!editProfile} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <div className='mx-2'>
                                        <WhatsAppOutlined style={{ fontSize: '24px', marginRight: '10px', color:'#25D366' }} />
                                        <input id="whatsapp" type="text" className="form-control" placeholder="WhatsApp" value={whatsapp} onChange={handleInputChange} disabled={!editProfile} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {editProfile && (
                        <Row justify="center">
                            <Col>
                                <Button type="primary" className='text-white' icon={<SaveOutlined className='text-white'/>} htmlType="submit" onClick={saveEdit} loading={loading} style={{ width: '100%' }}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Col>
                        </Row>
                    )}
                    {/* <Text strong>Events:</Text>
                    <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
                    {events.map((event, index) => (
                        <Col xs={24} sm={24} md={8} key={index}>
                            <div >{event.title}</div>
                            <Row justify="center" className='p-0 m-0' gutter={[2, 8]}>
                                {event.content.map((content, contentIndex) => (
                                    <Col xs={24} sm={24} md={24} key={contentIndex}>
                                        <div className='mx-2'>
                                            <Text className="form-control">{content.name} - {content.date}</Text>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    ))}
                    </Row> */}
                </div>
            </Content>
        </Layout>  
    );
};


export default User;
