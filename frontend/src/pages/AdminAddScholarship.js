import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, Select, message } from 'antd';
import { HomeOutlined, ProfileOutlined, SaveOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import currencyCodes from 'currency-codes';
import dayjs from 'dayjs';  // Import dayjs for date handling

const { Content } = Layout;
const { Option } = Select;

const singularUnits = [
    'year', 'month', 'week', 'day', 'hour', 'minute', 'second'
];

const pluralUnits = [
    'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'
];

const AddScholarship = ({ API_URL }) => {
    const [loading, setLoading] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const [formData, setFormData] = useState({
        name: '',
        year: dayjs().year(), // Default to current year using dayjs
        description:'',
        amount_approved: '',
        currency: 'USD',
        duration: '',
        durationUnit: 'months', // Default to months
        created_date: currentDate, // Default to current date using dayjs
        
    });
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async () => {
        setLoading(true);
        try {
            const payload = {
                ...formData,
                amount_approved: parseFloat(formData.amount_approved).toFixed(2), // Ensure the amount is formatted correctly
                duration: `${formData.duration} ${formData.durationUnit}`, // Combine value and unit
                current_date:currentDate
            };
            await axios.post(`${API_URL}/api/scholarships`, payload);
            message.success('Scholarship added successfully!');
            navigate('/admin/scholarships');
        } catch (error) {
            console.error('There was an error adding the scholarship!', error.response?.data || error.message);
            message.error('Failed to add scholarship. Please try again.');

            if (error.response && error.response.data && error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    const messages = error.response.data.errors[key];
                    messages.forEach((msg) => {
                        message.error(`${msg} for ${key}`);
                    });
                });
            } else {
                message.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleDateChange = (date, dateString) => {
    //     if (date) {
    //         setFormData({
    //             ...formData,
    //             created_date: dateString,
    //         });
    //     }
    // };

    // const handleYearChange = (date, dateString) => {
    //     if (date) {
    //         setFormData({
    //             ...formData,
    //             year: date.year(),
    //         });
    //     }
    // };

    const handleDurationChange = (value) => {
        setFormData({
            ...formData,
            durationUnit: value,
        });
    };

    // Conditionally set the duration units based on the value
    const getDurationUnitOptions = () => {
        if (formData.duration === '1') {
            return singularUnits.map(unit => (
                <Option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </Option>
            ));
        } else {
            return pluralUnits.map(unit => (
                <Option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </Option>
            ));
        }
    };

    const currencyOptions = currencyCodes.codes().map(code => (
        <Option key={code} value={code}>
            {`${currencyCodes.code(code).currency} (${code})`}
        </Option>
    ));

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/scholarships', title: (<><ProfileOutlined /><span style={{ textDecoration: 'none' }}>Scholarships</span></>) },
                        { title: (<span>Add Scholarship</span>) },
                    ]}
                />
            </div>
            <Content className='m-2'>
                <div
                    className='mb-5'
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Scholarship Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter the scholarship name' }]}
                        >
                            <Input 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter Scholarship Name" 
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Description" 
                            name="description"
                            rules={[{ required: true, message: 'Please enter the description' }]}>
                            <Input.TextArea
                                name="description"
                                value={formData.description}
                                rows={7}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        {/* <Form.Item
                            label="Year"
                            name="year"
                            rules={[{ required: true, message: 'Please select the year' }]}
                        >
                            <DatePicker
                                picker="year"
                                value={dayjs().year(formData.year)}
                                onChange={handleYearChange}
                                format="YYYY"
                            />
                        </Form.Item> */}

                        <Form.Item
                            label="Amount Approved"
                            name="amount_approved"
                            rules={[{ required: true, message: 'Please enter the approved amount' }]}
                        >
                            <Input 
                                name="amount_approved"
                                type="number"
                                value={formData.amount_approved}
                                onChange={handleInputChange}
                                placeholder="Enter Amount Approved" 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Currency"
                            name="currency"
                            rules={[{ required: true, message: 'Please select the currency' }]}
                        >
                            <Select 
                                name="currency"
                                value={formData.currency}
                                onChange={(value) => setFormData({ ...formData, currency: value })}
                            >
                                {currencyOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Duration"
                            name="duration"
                            rules={[{ required: true, message: 'Please enter the duration' }]}
                        >
                            <Input 
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="Enter Duration" 
                                suffix={<Select
                                    name="durationUnit"
                                    value={formData.durationUnit}
                                    onChange={handleDurationChange}
                                    style={{ width: '100px', marginLeft: '8px' }}
                                >
                                    {getDurationUnitOptions()}
                                </Select>}
                            />
                        </Form.Item>

                        {/* <Form.Item label="Created Date">
                            <DatePicker
                                name="created_date"
                                value={dayjs(formData.created_date)} // Use dayjs for the value
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item> */}

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading} 
                                icon={<SaveOutlined className='text-white' />}
                            >
                                Add Scholarship
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AddScholarship;
