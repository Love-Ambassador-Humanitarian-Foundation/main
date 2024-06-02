import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined, EditOutlined, SaveOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { Row, Col, Avatar, Typography, Breadcrumb, Input, Select } from 'antd';
import { countryCodes } from '../utils/utils';
import { Button } from '../components/button';
import { useUpdateLoginStatus, useUpdateUserDetails } from '../utils/UpdateLoginstatus';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner' ;
import axios from 'axios';

const { Option } = Select;
const { Title, Text } = Typography;

const UserProfilePage = ({ API_URL }) => {
    const { userId } = useParams();
    //console.log(useUpdateUserDetails(API_URL));
    const [userDetails, setUserDetails] = useState(useUpdateUserDetails(API_URL));
    const [editProfile, setEditProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useUpdateLoginStatus();

    const [name, setName] = useState('');
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

    useEffect(() => {
        setIsLoading(true);
        const fetchuserData = async() =>{
            const token = localStorage.getItem('lahf_access_token');
            const userId = localStorage.getItem('lahf_user_id');

            try {
                const response = await axios.get(`${API_URL}/api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Set user details in state
                //setUserDetails(response.data.data);
                //console.log('User details fetched:', response.data.data);
                setUserDetails(response.data.data);
                //console.log(response.data.data,"=====");
            } catch (error) {
                console.error('Error fetching profile details:', error);
            }
        }
        
        fetchuserData();
        if (userDetails) {
            setName(`${userDetails.firstname} ${userDetails.lastname}`);
            setStatus(userDetails.is_active ? 'Active' : 'Inactive');
            setEmail(userDetails.email);
            setPhoneNumber(userDetails.number);
            setAddress(userDetails.address);
            setFacebook(userDetails.facebook);
            setInstagram(userDetails.instagram);
            setTwitter(userDetails.twitter);
            setLinkedIn(userDetails.linkedIn);
            setWhatsapp(userDetails.whatsapp);
            setProfileImagePreview(userDetails.profileImage); // Set initial profile image
        }
        setIsLoading(false)
    }, [userDetails, API_URL]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'name':
                setName(value);
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
            default:
                break;
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };

    const saveEdit = async () => {
        try {
            const updatedUserDetails = {
                firstname: name.split(' ')[0],
                lastname: name.split(' ')[1],
                email,
                number: phoneNumber,
                address,
                facebook,
                instagram,
                twitter,
                linkedIn,
                whatsapp,
                is_active: status === 'Active'
            };

            // Update user details
            const response = await axios.patch(`${API_URL}/api/users/${userId}`, updatedUserDetails, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('lahf_access_token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (profileImage) {
                // Update profile image
                const formData = new FormData();
                formData.append('profileImage', profileImage);

                const imageResponse = await axios.patch(`${API_URL}/api/users/${userId}/profile-image`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('lahf_access_token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setProfileImagePreview(imageResponse.data.data.profileImage); // Update the profile image preview with the new image URL
            }

            setUserDetails(response.data.data);
            setEditProfile(false);
            console.log('User details updated:', response.data.data);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const items = [
        {
            title: 'Fundraising',
            amount: 34,
            content: [
                { title: 'Upcoming Fundraiser', date: 'May 25th, 2023' },
                { title: 'Fundraiser Report', date: 'June 15th, 2023' }
            ]
        },
        {
            title: 'Volunteering',
            amount: 34,
            content: [
                { title: 'Orphanage visitation', date: 'May 25th, 2023' },
                { title: 'Food distribution', date: 'June 15th, 2023' },
                { title: 'Clothes donation drive', date: 'July 1st-15th, 2023' }
            ]
        },
        {
            title: 'Donation',
            amount: 34,
            content: [
                { title: 'Donation Drive', date: 'June 15th - 30th, 2023' },
                { title: 'Donation Drive Report', date: 'July 15th, 2023' }
            ]
        },
        {
            title: 'Seminars',
            amount: 34,
            content: [
                { title: 'Seminar on Nutrition', date: 'July 10th, 2023' },
                { title: 'Seminar on Child Development', date: 'August 15th, 2023' }
            ]
        },
        {
            title: 'Partnerships',
            amount: 1,
            content: [
                { title: 'Partnership with XYZ Foundation', date: 'August 30th, 2023' }
            ]
        }
    ];

    const selectBefore = (
        <Select defaultValue={phoneNumberPre} disabled={!editProfile} onChange={(value) => setPhoneNumberPre(value)} style={{ minWidth: '80px' }}>
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                    {country.code}
                </Option>
            ))}
        </Select>
    );

    if (isLoading){
        return <LoadingSpinner />
    }

    return (
        <>
            <HeaderComponent Companyname={'LAHF'} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <div className='mt-5 p-4 pt-5 '>
                <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{ backgroundColor: '#d7d7e9' }}>
                    <Breadcrumb
                        items={[
                            { href: '/', title: <HomeOutlined /> },
                            { title: (<><UserOutlined /><span>{userDetails?.firstname}</span></>) }
                        ]}
                    />
                    <EditOutlined onClick={() => setEditProfile(true)} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <Row justify="center" align="middle" style={{ marginBottom: '30px' }}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ backgroundColor: '#d7d7e9' }}>
                        <div className='d-flex flex-column justify-content-between align-items-center ms-2 p-2'>
                            <Avatar size={150} src={profileImagePreview || "https://example.com/default-avatar.jpg"} />
                            {editProfile && (
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            )}
                            <div className='d-flex flex-column justify-content-left'>
                                <Title level={3}>{userDetails?.firstname}, {userDetails?.lastname}</Title>
                                <Text className='mb-2'>{status}</Text>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-between ms-2'>
                            <div className='my-2'>
                                <Text strong>Name: <input id="name" type="text" className="form-control" placeholder={name} value={name} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            </div>
                            <div className='my-2'>
                                <Text strong>Email: <input id="email" type="email" className="form-control" placeholder={email} value={email} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            </div>
                            <div className='my-2'>
                                <Text strong>Phone Number: <Input addonBefore={selectBefore} id="phonenumber" type="text" placeholder={phoneNumber} value={phoneNumber} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            </div>
                            <div className='my-2'>
                                <Text strong>Location: <input id="address" type="text" className="form-control" placeholder={address} value={address} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row justify="center" align="middle">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-left ms-2'>
                            <Text strong className='mb-2'>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Face Book <span></span>
                                </a>
                                <FacebookOutlined style={{ fontSize: 16, color: '#1877F2' }} />: <input id="facebook" type="text" className="form-control" placeholder={facebook} value={facebook} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            <Text strong className='mb-2'>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Twitter <span></span>
                                </a>
                                <TwitterOutlined style={{ fontSize: 16, color: '#1DA1F2' }} />: <input id="twitter" type="text" className="form-control" placeholder={twitter} value={twitter} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            <Text strong className='mb-2'>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Instagram <span></span>
                                </a>
                                <InstagramOutlined style={{ fontSize: 16, color: '#E4405F' }} />: <input id="instagram" type="text" className="form-control" placeholder={instagram} value={instagram} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            <Text strong className='mb-2'>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Whatsapp <span></span>
                                </a>
                                <WhatsAppOutlined style={{ fontSize: 16, color: '#25D366' }} />: <input id="whatsapp" type="text" className="form-control" placeholder={whatsapp} value={whatsapp} onChange={handleInputChange} disabled={!editProfile} /></Text>
                            <Text strong className='mb-2'>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    LinkedIn <span></span>
                                </a>
                                <LinkedinOutlined style={{ fontSize: 16, color: '#0077B5' }} />: <input id="linkedln" type="text" className="form-control" placeholder={linkedIn} value={linkedIn} onChange={handleInputChange} disabled={!editProfile} /></Text>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-left ms-2'>
                            {items.map((item, index) => (
                                <div key={index} className='my-2'>
                                    <Text strong>{item.title} - ({item.amount}) : {item.content.map((c) => (<input key={c.title} id={`${index}-${c.title}`} type="text" className="form-control" placeholder={c.title} value={`${c.title} - ${c.date}`} disabled />))}</Text>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                    {editProfile &&
                        <Col>
                            <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                        </Col>
                    }
                </Row>
            </div>
            <Footer Companyname={'LAHF'} />
        </>
    );
};

export default UserProfilePage;
