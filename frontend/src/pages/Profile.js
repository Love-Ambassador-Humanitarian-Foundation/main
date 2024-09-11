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
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { theme,Avatar, Breadcrumb, Input, message, Select, Button, Form, Tooltip } from 'antd';
import { countryCodes, fetchUserDetails, convertImageToBase64 } from '../utils/helper';
import { useUpdateLoginStatus } from '../hooks/hooks';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';

const { Option } = Select;

const UserProfilePage = ({ Companyname, API_URL }) => {
    const { token: { colorBgContainer, borderRadiusXS } } = theme.useToken();
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    const [editProfile, setEditProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const user = await fetchUserDetails(API_URL, userDetails.id);
                form.setFieldsValue({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phoneNumberPre: user.numberpre,
                    phoneNumber: user.number,
                    address: user.address,
                    facebook: user.facebook,
                    instagram: user.instagram,
                    twitter: user.twitter,
                    linkedIn: user.linkedIn,
                    whatsapp: user.whatsapp,
                    status: user.is_active ? 'Active' : 'Inactive'
                });
                setProfileImage(user.profileImage);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, form, userDetails]);

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

    const saveEdit = async (values) => {
        setLoading(true);
        const formData = {
            ...values,
            number: parseInt(values.phoneNumber, 10),
            is_active: values.status === 'Active',
            profileImage: profileImage
        };
        console.log(userDetails,'====')

        try {
            const response = await axios.patch(`${API_URL}/api/users/${userDetails.id}`, formData);

            setEditProfile(false);
            message.success('User details updated');
            console.log('User details updated:', response.data.data);
        } catch (error) {
            console.log('Error updating user details:', error);
            message.error('Error updating user details', error);
        } finally {
            setLoading(false);
        }
    };

    const selectBefore = (
        <Form.Item name="phoneNumberPre" noStyle>
            <Select
                style={{ minWidth: '80px' }}
            >
                {countryCodes.map((country, index) => (
                    <Option key={index} value={country.code}>
                        {country.code}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
            <div className='mt-5 py-2'>

            </div>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { title: (<>{profileImage?<Avatar size={20} src={profileImage} />:<UserOutlined/>}<span className='ms-2'>{userDetails?.firstname} {userDetails?.lastname}</span></>) }
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <Tooltip title='Edit Profile'>
                        <EditOutlined onClick={() => setEditProfile(!editProfile)} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                </span>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusXS,
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={saveEdit}
                    >
                        <div className='d-flex flex-column justify-content-left align-items-start ms-2 p-2'>
                            <Avatar size={150} src={profileImage || "https://example.com/default-avatar.jpg"} />
                            {editProfile && (
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            )}

                            <Form.Item
                                name="firstname"
                                label="First Name"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    placeholder='First Name'
                                    prefix={<UserOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item
                                name="lastname"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    placeholder='Last Name'
                                    prefix={<UserOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    placeholder='Email'
                                    prefix={<UserOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item
                                name="phoneNumber"
                                label="Phone Number"
                                rules={[
                                    { required: true, message: 'Please enter your phone number' },
                                    { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number' }
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    placeholder='Phone Number'
                                    addonBefore={selectBefore}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    placeholder='Address'
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item name="facebook" label="Facebook" style={{ width: '100%' }}>
                                <Input
                                    placeholder='Facebook'
                                    prefix={<FacebookOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item name="instagram" label="Instagram" style={{ width: '100%' }}>
                                <Input
                                    placeholder='Instagram'
                                    prefix={<InstagramOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item name="twitter" label="Twitter" style={{ width: '100%' }}>
                                <Input
                                    placeholder='Twitter'
                                    prefix={<TwitterOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item name="linkedIn" label="LinkedIn" style={{ width: '100%' }}>
                                <Input
                                    placeholder='LinkedIn'
                                    prefix={<LinkedinOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            <Form.Item name="whatsapp" label="WhatsApp" style={{ width: '100%' }}>
                                <Input
                                    placeholder='WhatsApp'
                                    prefix={<WhatsAppOutlined />}
                                    disabled={!editProfile}
                                />
                            </Form.Item>

                            {editProfile && (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={loading}
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            </Content>
            <Footer Companyname={Companyname} API_URL={API_URL}  />
        </>
    );
};

export default UserProfilePage;
