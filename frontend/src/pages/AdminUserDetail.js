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
import { Layout, Row, Col, Typography, Input, Button, message, Breadcrumb, Select, Avatar } from 'antd';
import { countryCodes, fetchUserDetails, convertImageToBase64, OFFICER_ROLES } from '../utils/helper';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import DateTimeInput from '../components/DateTimeSetter';
import axios from 'axios';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { updateUserbyId } from '../services/api';

dayjs.extend(buddhistEra);

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;

const AdminUser = ({ API_URL }) => {
    const { id: userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
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
    const [isActive, setIsActive] = useState(true);
    const [isStaff, setIsStaff] = useState(false);
    const [joinedDate, setJoinedDate] = useState(null);
    const [lastLogin, setLastLogin] = useState(null);
    const [position, setPosition] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const user = await fetchUserDetails(API_URL, userId);
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
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, userId]);

    useEffect(() => {
        if (userId) {
            const fetchEvents = async () => {
                try {
                    const token = localStorage.getItem('lahf_access_token');
                    const response = await axios.get(`${API_URL}/api/events/participant/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setEvents(response.data.data);
                } catch (error) {
                    console.error('Error fetching event details:', error);
                }
            };

            fetchEvents();
        }
    }, [API_URL, userId]);

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
                setPhoneNumber(value);
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
            default:
                break;
        }
    };

    const handleSelectChange = (value, id) => {
        switch (id) {
            case 'position':
                setPosition(value);
                break;
            case 'is_active':
                setIsActive(value);
                break;
            case 'is_staff':
                setIsStaff(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertImageToBase64(file);
                setProfileImage(base64);
            } catch (error) {
                console.error('Error converting file to Base64:', error);
            }
        }
    };

    const saveEdit = async () => {
        setLoading(true);
        const formData = {
            firstname,
            lastname,
            email,
            numberpre: phoneNumberPre,
            number: parseInt(phoneNumber, 10),
            address,
            facebook,
            instagram,
            twitter,
            linkedIn,
            whatsapp,
            position,
            is_active: isActive,
            is_staff: isStaff,
            last_login: lastLogin,
            joined_date: joinedDate,
            profileImage
        };

        try {
            const user = updateUserbyId(API_URL, userId,formData);
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
            defaultValue={isActive}
            disabled={!editProfile}
            onChange={(value) => handleSelectChange(value, 'is_active')}
            style={{ minWidth: '80px' }}
        >
            <Option value={false}>False</Option>
            <Option value={true}>True</Option>
        </Select>
    );

    const staffBefore = (
        <Select
            defaultValue={isStaff}
            disabled={!editProfile}
            onChange={(value) => handleSelectChange(value, 'is_staff')}
            style={{ minWidth: '80px' }}
        >
            <Option value={false}>False</Option>
            <Option value={true}>True</Option>
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
                <div style={{ padding: 12, minHeight: 360, background: '#fff', borderRadius: '4px' }}>
                    <div>
                        <Avatar size={130} src={profileImage || "https://example.com/default-avatar.jpg"} />
                        <div className='d-flex flex-column justify-content-left'>
                            <Title level={3}>{firstname} {lastname}</Title>
                            {editProfile && (
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            )}
                        </div>
                    </div>
                    <div className='my-2'>
                        <Text strong>First Name: <input id="firstname" type="text" className="form-control" placeholder={firstname} value={firstname} onChange={handleInputChange} disabled={!editProfile} /></Text>
                    </div>
                    <div className='my-2'>
                        <Text strong>Last Name: <input id="lastname" type="text" className="form-control" placeholder={lastname} value={lastname} onChange={handleInputChange} disabled={!editProfile} /></Text>
                    </div>
                    <div className='d-flex flex-column justify-content-between ms-2 mt-5'>
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
                            <Text strong>Position: 
                                <Select
                                    id="position"
                                    style={{ width: '100%' }}
                                    placeholder={position}
                                    value={position}
                                    onChange={(value) => handleSelectChange(value, 'position')}
                                    disabled={!editProfile}
                                >
                                    {OFFICER_ROLES.map((role) => (
                                        <Option key={role.value} value={role.value}>
                                            {role.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Text>
                        </div>
                        <div className='my-2'>
                            <Text strong>Is Active: {activeBefore}</Text>
                        </div>
                        <div className='my-2'>
                            <Text strong>Is Staff: {staffBefore}</Text>
                        </div>
                        <div className='my-2'>
                            <Text strong>Date Joined: <DateTimeInput date={true} time={true} defaultValue={joinedDate} onChange={setJoinedDate} disabled={!editProfile} /></Text>
                        </div>
                        <div className='my-2'>
                            <Text strong>Last Logged In: <DateTimeInput date={true} time={true} defaultValue={lastLogin} onChange={setLastLogin} disabled={!editProfile} /></Text>
                        </div>
                    </div>
                    <Row justify="center" className='p-0 m-0' gutter={[2, 8]}>
                        <Col xs={24} sm={24} md={8}>
                            <div className='mx-2'>
                                <FacebookOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#1877F2' }} />
                                <input id="facebook" type="text" className="form-control" placeholder="Facebook" value={facebook} onChange={handleInputChange} disabled={!editProfile} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <div className='mx-2'>
                                <InstagramOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#E4405F' }} />
                                <input id="instagram" type="text" className="form-control" placeholder="Instagram" value={instagram} onChange={handleInputChange} disabled={!editProfile} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <div className='mx-2'>
                                <TwitterOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#1DA1F2' }} />
                                <input id="twitter" type="text" className="form-control" placeholder="Twitter" value={twitter} onChange={handleInputChange} disabled={!editProfile} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <div className='mx-2'>
                                <LinkedinOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#0077B5' }} />
                                <input id="linkedln" type="text" className="form-control" placeholder="LinkedIn" value={linkedIn} onChange={handleInputChange} disabled={!editProfile} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <div className='mx-2'>
                                <WhatsAppOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#25D366' }} />
                                <input id="whatsapp" type="text" className="form-control" placeholder="WhatsApp" value={whatsapp} onChange={handleInputChange} disabled={!editProfile} />
                            </div>
                        </Col>
                    </Row>
                    {editProfile && (
                        <Row justify="center" className='mt-4'>
                            <Col>
                                <Button type="primary" icon={<SaveOutlined />} htmlType="submit" onClick={saveEdit} loading={loading} style={{ width: '100%' }}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Col>
                        </Row>
                    )}
                </div>
            </Content>
        </Layout>
    );
};

export default AdminUser;
