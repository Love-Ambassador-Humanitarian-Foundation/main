import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Form, Select, Col, Row, message } from 'antd';
import { SaveOutlined, LinkedinOutlined, FacebookOutlined, WhatsAppOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import { countryCodes,backendUrl } from '../utils/utils';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const { Text } = Typography;
const { Option } = Select;

const AboutPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [aboutData, setAboutData] = useState({
        _id: 'dummy-id',
        logo: 'http://dummy-logo-url.com/logo.png',
        info: 'Dummy company info',
        mission: 'Dummy mission statement',
        name: 'Dummy Company Name',
        email: 'dummy-email@company.com',
        phonenumber: '08012345678',
        phonenumberpre: '+234',
        address: 'Dummy address, City, Country',
        how_to_bid: 'Step 1: Do this\nStep 2: Do that',
        register_as_bidder: 'Step 1: Register here\nStep 2: Verification process',
        register_as_auctioneer: 'Step 1: Apply here\nStep 2: Verification process',
        how_to_register: 'Step 1: Fill the form\nStep 2: Submit documents',
        updated_by: 'Admin Name',
        last_updated: new Date().toISOString(),
        terms_and_conditions: 'Dummy terms and conditions.',
        fb: 'http://facebook.com/dummy',
        twitter: 'http://twitter.com/dummy',
        ig: 'http://instagram.com/dummy',
        linkedin: 'http://linkedin.com/in/dummy',
        telegram: 'http://telegram.com/dummy',
    });

    const [editAbout, setEditAbout] = useState(false);
    const [form] = Form.useForm();

    const fetchAboutData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/v1/about`);
            if (response.data.size > 0) {
                
                setAboutData(response.data.data[0]); // Assuming the first item in the response array is what you want
                console.log('response.data.data[0]:', response.data.data[0]);
            }
        } catch (error) {
            console.error('Error fetching the about data:', error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        fetchAboutData();
    }, []);

    const saveEdit = async (values) => {
        if (aboutData._id){
            try {
                await axios.put(`${backendUrl}/api/v1/about/${aboutData._id}`, values);
                setEditAbout(false);
                fetchAboutData();
                message.success('About data has been updated successfully!');
            } catch (error) {
                console.error('Error updating about data:', error);
            }
        }else {
            try {
                await axios.post(`${backendUrl}/api/v1/about`, values);
                setEditAbout(false);
                fetchAboutData();
                message.success('About data has been saved successfully!');
            } catch (error) {
                console.error('Error saving about data:', error);
            }
        }
        
    };

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div style={{ padding: '24px' }} className='container-fluid bg-white'>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={aboutData}
                    onFinish={saveEdit}
                >
                    <Form.Item label="Logo" name="logo">
                        <Input placeholder="Enter Logo" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Info" name="info">
                        <Input.TextArea rows={4} placeholder="Enter Company Info" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Mission" name="mission">
                        <Input.TextArea rows={4} placeholder="Enter Mission Statement" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Enter Name" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Enter Email" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phonenumber">
                        <Input addonBefore={
                            <Select defaultValue={aboutData.phonenumberpre || '+234'} disabled={!editAbout} style={{ minWidth: '80px' }}>
                                {countryCodes.map((country, index) => (
                                    <Option key={index} value={country.code}>
                                        {country.code}
                                    </Option>
                                ))}
                            </Select>
                        } placeholder="Enter Phone Number" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input placeholder="Enter Address" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="How to Bid" name="how_to_bid">
                        <Input.TextArea rows={4} placeholder="Enter How to Bid instructions" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Register as Bidder" name="register_as_bidder">
                        <Input.TextArea rows={4} placeholder="Enter Register as Bidder instructions" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Register as Auctioneer" name="register_as_auctioneer">
                        <Input.TextArea rows={4} placeholder="Enter Register as Auctioneer instructions" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="How to Register" name="how_to_register">
                        <Input.TextArea rows={4} placeholder="Enter How to Register instructions" disabled={!editAbout} />
                    </Form.Item>
                    <Form.Item label="Updated By" name="updated_by">
                        <Input placeholder="Updated By" disabled />
                    </Form.Item>
                    <Form.Item label="Terms and Conditions" name="terms_and_conditions">
                        <Input.TextArea rows={4} placeholder="Enter Terms and Conditions" disabled={!editAbout} />
                    </Form.Item>
                    <Row justify="center" align="middle" style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={`d-flex ${window.innerWidth <= 768 ? 'flex-column' : 'flex-row'} justify-content-left py-2`} style={{ width: '100%' }}>
                                <Text strong className='mb-2'>
                                    <FacebookOutlined style={{ fontSize: 16, color: '#1877F2' }} />: <Input id="fb" type="text" className="form-control" placeholder={aboutData.fb} value={aboutData.fb} onChange={(e) => form.setFieldsValue({ fb: e.target.value })} disabled={!editAbout} />
                                </Text>
                                <Text strong className='mb-2'>
                                    <TwitterOutlined style={{ fontSize: 16, color: '#1DA1F2' }} />: <Input id="twitter" type="text" className="form-control" placeholder={aboutData.twitter} value={aboutData.twitter} onChange={(e) => form.setFieldsValue({ twitter: e.target.value })} disabled={!editAbout} />
                                </Text>
                                <Text strong className='mb-2'>
                                    <InstagramOutlined style={{ fontSize: 16, color: '#E4405F' }} />: <Input id="ig" type="text" className="form-control" placeholder={aboutData.ig} value={aboutData.ig} onChange={(e) => form.setFieldsValue({ ig: e.target.value })} disabled={!editAbout} />
                                </Text>
                                <Text strong className='mb-2'>
                                    <WhatsAppOutlined style={{ fontSize: 16, color: '#25D366' }} />: <Input id="whatsapp" type="text" className="form-control" placeholder={aboutData.whatsapp} value={aboutData.whatsapp} onChange={(e) => form.setFieldsValue({ whatsapp: e.target.value })} disabled={!editAbout} />
                                </Text>
                                <Text strong className='mb-2'>
                                    <LinkedinOutlined style={{ fontSize: 16, color: '#0077B5' }} />: <Input id="linkedin" type="text" className="form-control" placeholder={aboutData.linkedin} value={aboutData.linkedin} onChange={(e) => form.setFieldsValue({ linkedin: e.target.value })} disabled={!editAbout} />
                                </Text>
                                <Text strong className='mb-2'>
                                    <WhatsAppOutlined style={{ fontSize: 16, color: '#0088CC' }} />: <Input id="telegram" type="text" className="form-control" placeholder={aboutData.telegram} value={aboutData.telegram} onChange={(e) => form.setFieldsValue({ telegram: e.target.value })} disabled={!editAbout} />
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    {editAbout && (
                        <Form.Item style={{ marginTop: '30px' }}>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ marginRight: '10px' }}>Save Changes</Button>
                        </Form.Item>
                    )}
                </Form>
            </div>
    );
}

export default AboutPage;
