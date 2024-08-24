import React, { useReducer } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, Checkbox, message, Upload, Select, DatePicker } from 'antd';
import { HomeOutlined, SaveOutlined, UploadOutlined, UserAddOutlined, SolutionOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { countryCodes } from '../utils/utils'; // Adjust the path as necessary

const { Content } = Layout;
const { Option } = Select;

const initialState = {
    loading: false,
    profileImage: null,
    formValues: {
        first_name: '',
        middle_name: '',
        last_name: '',
        birthday: null,
        home_address: '',
        email: '',
        phone_number: '',
        guardian_parent_name: '',
        guardian_parent_home_address: '',
        guardian_parent_email: '',
        guardian_parent_phone_number: '',
        nursery: false,
        primary: false,
        secondary: false,
        tertiary: false,
        name_of_institution: '',
        address_of_institution: '',
        class_level: '',
        amount_approved: '',
        year: '',
        currency: '',
        duration: '',
        organisation_approved: false,
        organisation_signature_date: null,
        candidate_signature_date: null
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_PROFILE_IMAGE':
            return { ...state, profileImage: action.payload };
        case 'SET_FORM_VALUES':
            return { ...state, formValues: { ...state.formValues, ...action.payload } };
        case 'RESET_FORM':
            return { ...state, formValues: initialState.formValues };
        default:
            return state;
    }
}

const AddScholarship = ({ API_URL }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const payload = {
                ...state.formValues,
                profileImage: state.profileImage ? state.profileImage : null,
                birthday: state.formValues.birthday ? moment(state.formValues.birthday).format('YYYY-MM-DD') : null,
                organisation_signature_date: state.formValues.organisation_signature_date ? moment(state.formValues.organisation_signature_date).format('YYYY-MM-DD') : null,
                candidate_signature_date: state.formValues.candidate_signature_date ? moment(state.formValues.candidate_signature_date).format('YYYY-MM-DD') : null
            };
            await axios.post(`${API_URL}/api/scholarships`, payload);
            message.success('Scholarship added successfully!');
            dispatch({ type: 'RESET_FORM' });
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
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            dispatch({ type: 'SET_PROFILE_IMAGE', payload: reader.result });
        };
        reader.onerror = (error) => {
            console.error('There was an error uploading the file!', error);
            message.error('Failed to upload image. Please try again.');
        };
    };

    const handleFormChange = (changedValues) => {
        dispatch({ type: 'SET_FORM_VALUES', payload: changedValues });
    };

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/admin/scholarships">
                        <SolutionOutlined />
                        <span style={{ textDecoration: 'none' }}>Scholarships</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <UserAddOutlined />
                        <span>Add Scholarship</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
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
                        onValuesChange={handleFormChange}
                        initialValues={state.formValues}
                    >
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[{ required: true, message: 'Please enter the first name' }]}
                        >
                            <Input placeholder="Enter First Name" />
                        </Form.Item>

                        <Form.Item
                            label="Middle Name"
                            name="middle_name"
                        >
                            <Input placeholder="Enter Middle Name" />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[{ required: true, message: 'Please enter the last name' }]}
                        >
                            <Input placeholder="Enter Last Name" />
                        </Form.Item>

                        <Form.Item
                            label="Birthday"
                            name="birthday"
                        >
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>

                        <Form.Item
                            label="Home Address"
                            name="home_address"
                            rules={[{ required: true, message: 'Please enter the home address' }]}
                        >
                            <Input placeholder="Enter Home Address" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter the email' }, { type: 'email', message: 'Please enter a valid email' }]}
                        >
                            <Input placeholder="Enter Email" />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[{ required: true, message: 'Please enter the phone number' }]}
                        >
                            <Input placeholder="Enter Phone Number" />
                        </Form.Item>

                        <Form.Item
                            label="Guardian Parent Name"
                            name="guardian_parent_name"
                            rules={[{ required: true, message: 'Please enter the guardian parent name' }]}
                        >
                            <Input placeholder="Enter Guardian Parent Name" />
                        </Form.Item>

                        <Form.Item
                            label="Guardian Parent Home Address"
                            name="guardian_parent_home_address"
                            rules={[{ required: true, message: 'Please enter the guardian parent home address' }]}
                        >
                            <Input placeholder="Enter Guardian Parent Home Address" />
                        </Form.Item>

                        <Form.Item
                            label="Guardian Parent Email"
                            name="guardian_parent_email"
                            rules={[{ required: true, message: 'Please enter the guardian parent email' }, { type: 'email', message: 'Please enter a valid email' }]}
                        >
                            <Input placeholder="Enter Guardian Parent Email" />
                        </Form.Item>

                        <Form.Item
                            label="Guardian Parent Phone Number"
                            name="guardian_parent_phone_number"
                            rules={[{ required: true, message: 'Please enter the guardian parent phone number' }]}
                        >
                            <Input placeholder="Enter Guardian Parent Phone Number" />
                        </Form.Item>

                        <Form.Item
                            label="Nursery"
                            name="nursery"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>Nursery</Checkbox>
                        </Form.Item>

                        <Form.Item
                            label="Primary"
                            name="primary"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>Primary</Checkbox>
                        </Form.Item>

                        <Form.Item
                            label="Secondary"
                            name="secondary"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>Secondary</Checkbox>
                        </Form.Item>

                        <Form.Item
                            label="Tertiary"
                            name="tertiary"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>Tertiary</Checkbox>
                        </Form.Item>

                        <Form.Item
                            label="Name of Institution"
                            name="name_of_institution"
                            rules={[{ required: true, message: 'Please enter the name of institution' }]}
                        >
                            <Input placeholder="Enter Name of Institution" />
                        </Form.Item>

                        <Form.Item
                            label="Address of Institution"
                            name="address_of_institution"
                        >
                            <Input placeholder="Enter Address of Institution" />
                        </Form.Item>

                        <Form.Item
                            label="Class Level"
                            name="class_level"
                        >
                            <Input placeholder="Enter Class Level" />
                        </Form.Item>

                        <Form.Item
                            label="Amount Approved"
                            name="amount_approved"
                        >
                            <Input placeholder="Enter Amount Approved" />
                        </Form.Item>

                        <Form.Item
                            label="Year"
                            name="year"
                        >
                            <Input placeholder="Enter Year" />
                        </Form.Item>

                        <Form.Item
                            label="Currency"
                            name="currency"
                        >
                            <Select placeholder="Select Currency">
                                {countryCodes.map((code) => (
                                    <Option key={code.code} value={code.code}>
                                        {code.name} ({code.code})
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Duration"
                            name="duration"
                        >
                            <Input placeholder="Enter Duration" />
                        </Form.Item>

                        <Form.Item
                            label="Organisation Approved"
                            name="organisation_approved"
                            valuePropName="checked"
                        >
                            <Checkbox>Approved</Checkbox>
                        </Form.Item>

                        <Form.Item
                            label="Organisation Signature Date"
                            name="organisation_signature_date"
                        >
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>

                        <Form.Item
                            label="Candidate Signature Date"
                            name="candidate_signature_date"
                        >
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>

                        <Form.Item
                            label="Profile Image"
                        >
                            <Upload
                                customRequest={handleUpload}
                                showUploadList={false}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={state.loading}
                                icon={<SaveOutlined />}
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

export default AddScholarship;
