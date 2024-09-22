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
    LinkedinOutlined,
    PhoneOutlined,
    MailOutlined,
    GlobalOutlined
    
} from '@ant-design/icons';
import { DatePicker, Layout, Typography, theme, Input, Button, message,Tooltip, Breadcrumb, Select, Avatar, Row } from 'antd';
import { countryCodes, fetchUserDetails, convertImageToBase64 } from '../utils/helper'; // Ensure these functions are correctly defined
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;

const AdminProfilePage = ({ API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const { id: userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumberPre, setPhoneNumberPre] = useState('+234');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [is_active, setIsActive] = useState(null);
    const [is_staff, setIsStaff] = useState(null);
    const [joined_at, setJoinedAt] = useState(null);
    const [last_login, setLastLogin] = useState(null);
    const [position, setPosition] = useState(null);
    
    const joined_atonChange = (dateString) => {
        try {
            let dateobj = new Date(dateString);
            setJoinedAt(dateobj.toISOString());
        } catch (error) {
            // handle error
        }
    };

    const last_loginonChange = (dateString) => {
        try {
            let dateobj = new Date(dateString);
            setLastLogin(dateobj.toISOString());
        } catch (error) {
            // handle error
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const user = await fetchUserDetails(API_URL, userId);
                setUserDetails(user);
                setFirstName(user.firstname);
                setLastName(user.lastname);
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
                setJoinedAt(user.joined_at);
                setLastLogin(user.last_login);
                setPosition(user.position);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

            // try {
            //     const token = localStorage.getItem('lahf_access_token');
            //     const id = userId || localStorage.getItem('lahf_user_id');
            //     const response = await axios.get(`${API_URL}/api/events/participant/${id}`, {
            //         headers: {
            //             'Authorization': `Bearer ${token}`
            //         }
            //     });
            // } catch (error) {
            //     console.error('Error fetching event details:', error);} 
            finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
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
        const token = localStorage.getItem('lahf_access_token');

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
            is_active,
            is_staff,
            last_login,
            joined_at,
            profileImage
        };

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
            setJoinedAt(user.joined_date);
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
            <Option key={0} value={false}>False</Option>
            <Option key={1} value={true}>True</Option>
        </Select>
    );

    const staffBefore = (
        <Select
            defaultValue={is_staff}
            disabled={!editProfile}
            onChange={(value) => setIsStaff(value)}
            style={{ minWidth: '80px' }}
            id='is_staff'
        >
            <Option key={0} value={false}>False</Option>
            <Option key={1} value={true}>True</Option>
        </Select>
    );

    const joinBefore = (
        
        <DatePicker
            disabled={true}
            onChange={joined_atonChange}
            id="joined_at"
            showTime={true}
            format="YYYY-MM-DD HH:mm:ss." 
            value={joined_at? dayjs(joined_at) : null}  // Convert to dayjs object if not null
                                
        />
    );

    const loginBefore = (
        <DatePicker
            disabled={true}
            onChange={last_loginonChange}
            id="last_login"
            showTime={true}
            format="YYYY-MM-DD HH:mm:ss." 
            value={last_login? dayjs(last_login) : null}  // Convert to dayjs object if not null
                                
        />
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<span>{firstname} {lastname}</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <Tooltip title='Edit Profile' className='mx-2'>
                        <EditOutlined
                            onClick={() => setEditProfile(!editProfile)}
                            style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }}
                        />
                    </Tooltip>
                </span>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 36,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
                <Title level={3}>Admin Profile</Title>
                <Row gutter={[16, 16]}>
                   
                    <div className='d-flex flex-column align-items-start w-100'>
                        <div className='d-flex flex-column align-items-center '>
                            <Avatar src={profileImage} size={100} />
                            {editProfile && (
                                <Input type="file" onChange={handleImageChange} style={{ margin: '16px 0' }} />
                            )}
                        </div>
                        <Title level={4}>Personal Information</Title>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>First Name:</Text>
                            <Input
                                value={firstname}
                                onChange={handleInputChange}
                                id="firstname"
                                disabled={!editProfile}
                                prefix={<UserOutlined />}
                                className='w-100'
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Last Name:</Text>
                            <Input
                                value={lastname}
                                onChange={handleInputChange}
                                id="lastname"
                                disabled={!editProfile}
                                prefix={<UserOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Email:</Text>
                            <Input
                                value={email}
                                onChange={handleInputChange}
                                id="email"
                                disabled={!editProfile}
                                prefix={<MailOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Phone Number:</Text>
                            <Input
                                addonBefore={selectBefore}
                                value={phoneNumber}
                                onChange={handleInputChange}
                                id="phonenumber"
                                disabled={!editProfile}
                                prefix={<PhoneOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Address:</Text>
                            <Input
                                value={address}
                                onChange={handleInputChange}
                                id="address"
                                disabled={!editProfile}
                                prefix={<GlobalOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Facebook:</Text>
                            <Input
                                value={facebook}
                                onChange={handleInputChange}
                                id="facebook"
                                disabled={!editProfile}
                                prefix={<FacebookOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Instagram:</Text>
                            <Input
                                value={instagram}
                                onChange={handleInputChange}
                                id="instagram"
                                disabled={!editProfile}
                                prefix={<InstagramOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Twitter:</Text>
                            <Input
                                value={twitter}
                                onChange={handleInputChange}
                                id="twitter"
                                disabled={!editProfile}
                                prefix={<TwitterOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>LinkedIn:</Text>
                            <Input
                                value={linkedIn}
                                onChange={handleInputChange}
                                id="linkedln"
                                disabled={!editProfile}
                                prefix={<LinkedinOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>WhatsApp:</Text>
                            <Input
                                value={whatsapp}
                                onChange={handleInputChange}
                                id="whatsapp"
                                disabled={!editProfile}
                                prefix={<WhatsAppOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Position:</Text>
                            <Input
                                value={position}
                                onChange={handleInputChange}
                                id="position"
                                disabled={!editProfile}
                                prefix={<GlobalOutlined />}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Is Active:</Text>
                            {activeBefore}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Is Staff:</Text>
                            {staffBefore}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Joined At:</Text>
                            {joinBefore}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Last Login:</Text>
                            {loginBefore}
                        </div>
                        <div className='d-flex flex-column align-items-center w-100'>
                            {editProfile ? (
                                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={saveEdit}
                                        loading={loading}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Save
                                    </Button>
                                    <Button onClick={() => setEditProfile(false)} style={{ marginRight: '8px' }}>
                                        Cancel
                                    </Button>
                                </span>
                            ) : (
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={() => setEditProfile(true)}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                    </div>
                    
                </Row>
                </div>
                
            </Content>
        </Layout>
    );
};

export default AdminProfilePage;
