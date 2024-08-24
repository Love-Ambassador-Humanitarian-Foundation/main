import React, { useEffect, useState } from 'react';
import {
    HomeOutlined,
    EditOutlined,
    SaveOutlined,
    FilePdfOutlined
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import { Row, Col, Typography, Input, Button, message, Breadcrumb, Select, Layout, Form, Avatar } from 'antd';
import { useParams,Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { decodeQRCode } from '../utils/utils'; // Ensure this is the correct path

const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

const Scholarship = ({ API_URL }) => {
    const { id } = useParams();
    const [editScholarship, setEditScholarship] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pdfloading, setPdfLoading] = useState(false);
    const [decodedText, setDecodedText] = useState('');

    // State variables
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        birthday: '',
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
        year: 2024,
        currency: 'NGN',
        duration: '',
        organisation_approved: true,
        organisation_signature_date: '',
        candidate_signature_date: '',
        qrcode:''
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/scholarships/${id}`);
                const data = response.data.data;

                //console.log(data);

                // Update state with fetched data
                setFormData({
                    first_name: data.first_name || '',
                    middle_name: data.middle_name || '',
                    last_name: data.last_name || '',
                    birthday: data.birthday || '',
                    home_address: data.home_address || '',
                    email: data.email || '',
                    phone_number: data.phone_number || '',
                    guardian_parent_name: data.guardian_parent_name || '',
                    guardian_parent_home_address: data.guardian_parent_home_address || '',
                    guardian_parent_email: data.guardian_parent_email || '',
                    guardian_parent_phone_number: data.guardian_parent_phone_number || '',
                    nursery: data.nursery || false,
                    primary: data.primary || false,
                    secondary: data.secondary || false,
                    tertiary: data.tertiary || false,
                    name_of_institution: data.name_of_institution || '',
                    address_of_institution: data.address_of_institution || '',
                    class_level: data.class_level || '',
                    amount_approved: data.amount_approved || '',
                    year: data.year || 2024,
                    currency: data.currency || 'NGN',
                    duration: data.duration || '',
                    organisation_approved: data.organisation_approved || true,
                    organisation_signature_date: data.organisation_signature_date || '',
                    candidate_signature_date: data.candidate_signature_date || '',
                    qrcode: `data:image/png;base64,${data.qrcode}` || ''
                });
                var text = await decodeQRCode(`data:image/png;base64,${data.qrcode}` || '');
                
                const domainName = window.location.hostname;
                const protocol = window.location.protocol;
                const port = window.location.port;
                text = text.replace(protocol+'//'+domainName+':'+port+'/#','');
                setDecodedText(text);
                
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const saveEdit = async () => {
        setLoading(true);
        try {
            await axios.patch(`${API_URL}/api/scholarships/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success('Scholarship details updated');
            setEditScholarship(false);
        } catch (error) {
            console.error('Error updating scholarship details:', error);
            message.error('Error updating scholarship details');
        }
        setLoading(false);
    };

    const generatePdf = async () => {
        console.log('Generating PDF...');
        setPdfLoading(true);

        try {
            const doc = new jsPDF();

            // Add content to the PDF
            doc.text('Hello world!', 10, 10);
            doc.text('This is a sample PDF generated with jsPDF.', 10, 20);

            // Save the PDF
            doc.save(`scholarship_${formData.first_name}_${formData.last_name}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setPdfLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href='/#/admin/scholarships' className='text-decoration-none'>
                        <span>Scholarships</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>{formData.first_name} {formData.last_name}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    
                    {pdfloading && (
                        
                        <div className='spinnersmall'></div>
                    )}
                    <FilePdfOutlined onClick={generatePdf}  className='mx-2 text-danger' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    <EditOutlined onClick={() => setEditScholarship(!editScholarship)} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </span>
            </div>
            <Content className='m-2'>
                <div
                    style={{
                        padding: 12,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <Form layout="vertical">
                        <Title level={3}>{formData.first_name} {formData.middle_name} {formData.last_name} 
                            <span className='ms-5'></span>
                            <Link to={decodedText} className='text-decoration-none'>
                                <Avatar shape='square' src={formData.qrcode} size={80}></Avatar>
                            </Link>
                            
                            
                        </Title>
                        
                        <Form.Item label="First Name">
                            <Input
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Middle Name">
                            <Input
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Last Name">
                            <Input
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Birthday">
                            <Input
                                name="birthday"
                                type="date"
                                value={formData.birthday}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Home Address">
                            <Input
                                name="home_address"
                                value={formData.home_address}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            <Input
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                    
                        <Form.Item label="Guardian Parent Name">
                            <Input
                                name="guardian_parent_name"
                                value={formData.guardian_parent_name}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian Parent Home Address">
                            <Input
                                name="guardian_parent_home_address"
                                value={formData.guardian_parent_home_address}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian Parent Email">
                            <Input
                                name="guardian_parent_email"
                                type="email"
                                value={formData.guardian_parent_email}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian Parent Phone Number">
                            <Input
                                name="guardian_parent_phone_number"
                                value={formData.guardian_parent_phone_number}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Educational Level">
                            <Select
                                name="educational_level"
                                value={formData.educational_level}
                                onChange={value => handleSelectChange('educational_level', value)}
                                disabled={!editScholarship}
                            >
                                <Option value="nursery">Nursery</Option>
                                <Option value="primary">Primary</Option>
                                <Option value="secondary">Secondary</Option>
                                <Option value="tertiary">Tertiary</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Name of Institution">
                            <Input
                                name="name_of_institution"
                                value={formData.name_of_institution}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Address of Institution">
                            <Input
                                name="address_of_institution"
                                value={formData.address_of_institution}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Class Level">
                            <Input
                                name="class_level"
                                value={formData.class_level}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Amount Approved">
                            <Input
                                name="amount_approved"
                                type="number"
                                value={formData.amount_approved}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Currency">
                            <Select
                                name="currency"
                                value={formData.currency}
                                onChange={value => handleSelectChange('currency', value)}
                                disabled={!editScholarship}
                            >
                                <Option value="NGN">NGN</Option>
                                <Option value="USD">USD</Option>
                                <Option value="EUR">EUR</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Duration">
                            <Input
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Organisation Approved">
                            <Select
                                name="organisation_approved"
                                value={formData.organisation_approved}
                                onChange={value => handleSelectChange('organisation_approved', value)}
                                disabled={!editScholarship}
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        </Form.Item>
                        
                        {editScholarship && (
                            <Row justify="center">
                                <Col>
                                    <Button
                                        type="primary"
                                        className='text-white'
                                        icon={<SaveOutlined className='text-white'/>}
                                        onClick={saveEdit}
                                        loading={loading}
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default Scholarship;
