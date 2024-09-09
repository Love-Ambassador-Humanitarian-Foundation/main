import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker, List, message, Layout, Breadcrumb, Form } from 'antd';
import { SaveOutlined, HomeOutlined, MailOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { detectenterkey } from '../utils/helper';
import { useUpdateLoginStatus } from '../hooks/hooks';
import LoadingSpinner from '../components/LoadingSpinner';

const { Content } = Layout;

const AddAdminNewsletter = ({ API_URL }) => {
    const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
    console.log('loggedin :',isLoggedIn)
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [recipients, setRecipients] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        is_sent: true,
        created_at: dayjs(), // Set to the current date
    });
    

    const [textAreaRows, setTextAreaRows] = useState(7);
    const navigate = useNavigate();

    // Update sender in formData when userDetails.email changes

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/newsletter-recipients`);
                setRecipients(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };

        fetchRecipients();
        setIsLoading(false);
    }, [API_URL,userDetails.email]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            created_at: date ? dayjs(date).format("YYYY-MM-DD") : null,
        }));
    };

    const handleTextAreaKeyDown = (e) => {
        detectenterkey(e, textAreaRows, setTextAreaRows);
    };

    const saveEdit = async () => {
        setLoading(true);
        console.log(formData,'++++++++++')
        try {
            await axios.post(`${API_URL}/api/newsletters`, 
                {...formData,
                    created_at:formData.created_at ? formData.created_at.format('YYYY-MM-DD') : null,
                });
            navigate('/admin/newsletters');
            message.success('Newsletter added successfully');
        } catch (error) {
            console.error('Failed to save newsletter details', error);
            message.error('Failed to save newsletter details');
            if (error.response && error.response.data.errors) {
                for (const key in error.response.data.errors) {
                    if (error.response.data.errors.hasOwnProperty(key)) {
                        message.error(error.response.data.errors[key]);
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    };


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/newsletters', title: (<><MailOutlined /><span>Newsletters</span></>) },
                        { title: (<span>Add Newsletter</span>) },
                    ]}
                />
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
                    <Form
                        layout="vertical"
                        onFinish={saveEdit}
                        initialValues={formData} // Form will reflect these values at render
                    >
                        <Form.Item
                            label="Title"
                            className='mt-4'
                            name="title"
                            rules={[{ required: true, message: 'Please enter the title' }]}
                        >
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Item>



                        <Form.Item
                            label="Sender"
                            name="sender"
                        >
                            <input style={{visibility:'hidden'}} value={formData.sender? formData.sender: userDetails.email}></input>
                            <Input
                                id="sender"
                                value={formData.sender? formData.sender: userDetails.email} // Set the value from formData
                                onChange={handleInputChange}
                                disabled={true}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: 'Please enter the message' }]}
                        >
                            <Input.TextArea
                                id="message"
                                value={formData.message}
                                rows={textAreaRows}
                                onChange={handleInputChange}
                                onKeyDown={handleTextAreaKeyDown}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Created At"
                            name="created_at"
                        >
                            <DatePicker
                                value={formData.created_at ? dayjs(formData.created_at) : null}
                                format="YYYY-MM-DD"
                                onChange={handleDateChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Recipients"
                        >
                            <List
                                bordered
                                dataSource={recipients}
                                renderItem={user => (
                                    <List.Item key={user.email}>
                                        {user.email}
                                        {user.firstname && user.lastname ? ` - (${user.firstname} ${user.lastname})` : ''}
                                    </List.Item>
                                )}
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={loading}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AddAdminNewsletter;
