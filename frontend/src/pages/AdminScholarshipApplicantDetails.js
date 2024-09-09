import React, { useEffect, useState,useCallback } from 'react';
import {
    HomeOutlined,
    EditOutlined,
    SaveOutlined,
    FilePdfOutlined,
    SolutionOutlined,
    ProfileOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import {
    Row, Col, Typography, Input, Button, message,
    Breadcrumb, Select, Layout, Form, DatePicker,
    Checkbox, Tooltip,
    Image
} from 'antd';
import { useParams, useLocation, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;

// Corrected CLASS_LEVEL_CHOICES format
const CLASS_LEVEL_CHOICES = [
    { label: 'Nursery', value: 'Nursery' },
    { label: 'Primary', value: 'Primary' },
    { label: 'Junior Secondary School', value: 'JSS' },
    { label: 'Senior Secondary School', value: 'SSS' },
    { label: 'Tertiary', value: 'Tertiary' }
];

const AdminScholarshipApplicant = ({ API_URL }) => {
    const { id, applicantid } = useParams();
    const location = useLocation();
    
    const scholarship = location?.state?.scholarship || {}; // Access the state
    
    const [editScholarshipApplication, setEditScholarshipApplication] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
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
        name_of_institution: '',
        address_of_institution: '',
        class_level: '',
        qrcode: '',
        organisation_approved: false,
        organisation_signature_date: null,
        candidate_signature_date: null
    });
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const [approved, setApproved] =useState(formData.organisation_approved)
    const [organisation_signature_date, setOrganisationSignatureDate] = useState(formData.organisation_signature_date ? dayjs(formData.organisation_signature_date) : null)

    

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

    const handleDateChange = (date, dateString, name) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: date
        }));
    };
    const approve = async () =>{
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/scholarshipapplicants/${applicantid}/approve`, {
                organisation_signature_date: currentDate,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success('Scholarship applicant Approved successfully');
            fetchDetails();
            setEditScholarshipApplication(false);
        } catch (error) {
            console.error('Error approving applicant:', error);
            message.error('Error approving applicant');
        } finally {
            setLoading(false);
            setApproved(true);
            console.log(dayjs(currentDate),'----')
            setOrganisationSignatureDate(dayjs(currentDate))
        }
    }
    const disapprove = async () =>{
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/scholarshipapplicants/${applicantid}/disapprove`, {
                organisation_signature_date: currentDate,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success('Scholarship applicant DisApproved successfully');
            fetchDetails()
            setEditScholarshipApplication(false);
        } catch (error) {
            console.error('Error Disapproving applicant:', error);
            message.error('Error Disapproving applicant');
        } finally {
            setLoading(false);
            setApproved(false);
            setOrganisationSignatureDate(null);
        }
    }

    const saveEdit = async () => {
        setLoading(true);
        try {
            await axios.patch(`${API_URL}/api/scholarshipapplicants/${applicantid}`, {
                ...formData,
                birthday: formData.birthday ? formData.birthday.format('YYYY-MM-DD') : null,
                organisation_signature_date: formData.organisation_signature_date ? formData.organisation_signature_date.format('YYYY-MM-DD') : null,
                candidate_signature_date: formData.candidate_signature_date ? formData.candidate_signature_date.format('YYYY-MM-DD') : null
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success('Scholarship applicant details updated');
            setEditScholarshipApplication(false);

        } catch (error) {
            console.error('Error updating scholarship details:', error);
            message.error('Error updating scholarship details');
        } finally {
            setLoading(false);
        }
    };

    const saveApprove = async ()=>{
        saveEdit();
        approve();
    }

    const generatePdf = async () => {
        setPdfLoading(true);
        try {
            const doc = new jsPDF();
            const logoWidth = 34;
            const logoHeight = 30;
            const companyNameFontSize = 17;
            const titleFontSize = 14;

            doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);
            doc.setFontSize(companyNameFontSize);
            doc.setFont('Helvetica', 'bold');
            doc.text('LOVE AMBASSADORS HUMANITARIAN', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            doc.text('FOUNDATION (LAHF)', doc.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
            doc.setFont('Arial', 'normal');
            doc.setFontSize(titleFontSize);
            doc.text('Scholarship Form', doc.internal.pageSize.getWidth() / 2, 38, { align: 'center' });
            doc.text(`Name: ${formData.first_name} ${formData.middle_name ? formData.middle_name + ' ' : ''}${formData.last_name}`, 20, 60);
            doc.text(`Birthday: ${formData.birthday ? formData.birthday.format('YYYY-MM-DD') : ''}`, 20, 70);
            doc.text(`Home Address: ${formData.home_address}`, 20, 80);
            doc.text(`Email: ${formData.email}`, 20, 90);
            doc.text(`Phone Number: ${formData.phone_number}`, 20, 100);
            doc.text(`Guardian/Parent Name: ${formData.guardian_parent_name}`, 20, 110);
            doc.text(`Guardian/Parent Address: ${formData.guardian_parent_home_address}`, 20, 120);
            doc.text(`Guardian/Parent Email: ${formData.guardian_parent_email}`, 20, 130);
            doc.text(`Guardian/Parent Phone: ${formData.guardian_parent_phone_number}`, 20, 140);
            doc.text(`Educational Background: Nursery: ${formData.nursery ? 'Yes' : 'No'}, Primary: ${formData.primary ? 'Yes' : 'No'}, Secondary: ${formData.secondary ? 'Yes' : 'No'}, Tertiary: ${formData.tertiary ? 'Yes' : 'No'}`, 20, 150);
            doc.text(`Institution: ${formData.name_of_institution}`, 20, 160);
            doc.text(`Institution Address: ${formData.address_of_institution}`, 20, 170);
            doc.text(`Class Level: ${formData.class_level}`, 20, 180);
            doc.text(`QR Code: ${formData.qrcode}`, 20, 190);
            doc.text(`Organisation Approved: ${formData.organisation_approved ? 'Yes' : 'No'}`, 20, 200);
            doc.text(`Organisation Signature Date: ${formData.organisation_signature_date ? formData.organisation_signature_date.format('YYYY-MM-DD') : ''}`, 20, 210);
            doc.text(`Candidate Signature Date: ${formData.candidate_signature_date ? formData.candidate_signature_date.format('YYYY-MM-DD') : ''}`, 20, 220);
            doc.save(`scholarship_${formData.first_name}_${formData.last_name}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setPdfLoading(false);
        }
    };

    const fetchDetails = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/api/scholarshipapplicants/${applicantid}?id=${id}`);
            const data = response.data.data;

            setFormData({
                id: data.id || '',
                first_name: data.first_name || '',
                middle_name: data.middle_name || '',
                last_name: data.last_name || '',
                birthday: data.birthday ? dayjs(data.birthday) : null,
                home_address: data.home_address || '',
                email: data.email || '',
                phone_number: data.phone_number || '',
                guardian_parent_name: data.guardian_parent_name || '',
                guardian_parent_home_address: data.guardian_parent_home_address || '',
                guardian_parent_email: data.guardian_parent_email || '',
                guardian_parent_phone_number: data.guardian_parent_phone_number || '',
                name_of_institution: data.name_of_institution || '',
                address_of_institution: data.address_of_institution || '',
                class_level: data.class_level || '',
                qrcode: data.qrcode || '',
                organisation_approved: data.organisation_approved || false,
                organisation_signature_date: data.organisation_signature_date ? dayjs(data.organisation_signature_date) : null,
                candidate_signature_date: data.candidate_signature_date ? dayjs(data.candidate_signature_date) : null
            });
            setApproved(data.organisation_approved || false);
            setOrganisationSignatureDate(data.organisation_signature_date ? dayjs(data.organisation_signature_date) : null);

        } catch (error) {
            console.error('Error fetching scholarship details:', error);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL, applicantid, id]); // Dependencies

    useEffect(() => {
        fetchDetails(); // Call the memoized fetchDetails
    }, [fetchDetails]); // Dependency array

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9' }}>
            <Breadcrumb
                items={[
                    { href: '/', title: <HomeOutlined /> },
                    { href: '/#/admin/scholarships', title: (<><ProfileOutlined /><span style={{ textDecoration: 'none' }}>Scholarships</span></>) },
                    {
                    href: `/#/admin/scholarships/${id}`,
                    title: (<span style={{ textDecoration: 'none' }}>{scholarship?.name}</span>)
                    },
                    {
                    title: (
                        <Link
                            to={`/admin/scholarships/${id}/applicants`}
                            state={{ scholarship: scholarship }}
                            style={{ textDecoration: 'none' }}
                            >
                            <SolutionOutlined />
                            <span>Applicants</span>
                        </Link>
                    )
                    },
                    {
                    title: (<span style={{ textDecoration: 'none' }}>{formData.first_name + ' ' + formData.last_name}</span>)
                    },
                ]}
                />

                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    {
                        approved?
                        <Tooltip title='DisApprove Application'>
                            <CloseCircleOutlined onClick={disapprove} className='mx-2 text-danger' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                        </Tooltip>:
                        <Tooltip title='Approve Application'>
                            <CheckCircleOutlined onClick={approve} className='mx-2 text-success' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                        </Tooltip>
                    }
                    {pdfLoading ? <div className='spinnersmall'></div> : null}
                    <Tooltip title='Generate pdf'>
                        <FilePdfOutlined onClick={generatePdf} className='mx-2 text-danger' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title='Edit Scholarship'>
                        <EditOutlined onClick={() => setEditScholarshipApplication(!editScholarshipApplication)} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                </span>
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
                    <Form layout="vertical">
                        <Row gutter={16} align="middle">
                            <Col>
                                <Title level={3}>
                                    {formData.first_name} {formData.middle_name ? formData.middle_name + ' ' : ''}{formData.last_name}
                                </Title>
                            </Col>
                            {formData.qrcode && (
                                <Col>
                                    <Image
                                        width={100}
                                        src={formData.qrcode ? `data:image/png;base64,${formData.qrcode}` : ''}
                                        alt="QR Code"
                                    />
                                </Col>
                            )}
                        </Row>
                        <Text className='m-4'>
                            {formData.id}
                        </Text>
                        <Form.Item label="First Name" className='mt-4'>
                            <Input
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Middle Name">
                            <Input
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Last Name">
                            <Input
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Birthday">
                            <DatePicker
                                name="birthday"
                                value={formData.birthday}
                                onChange={(date, dateString) => handleDateChange(date, dateString, 'birthday')}
                                format="YYYY-MM-DD"
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Home Address">
                            <Input
                                name="home_address"
                                value={formData.home_address}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            <Input
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian/Parent Name">
                            <Input
                                name="guardian_parent_name"
                                value={formData.guardian_parent_name}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian/Parent Address">
                            <Input
                                name="guardian_parent_home_address"
                                value={formData.guardian_parent_home_address}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian/Parent Email">
                            <Input
                                name="guardian_parent_email"
                                value={formData.guardian_parent_email}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Guardian/Parent Phone">
                            <Input
                                name="guardian_parent_phone_number"
                                value={formData.guardian_parent_phone_number}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Institution Name">
                            <Input
                                name="name_of_institution"
                                value={formData.name_of_institution}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Institution Address">
                            <Input
                                name="address_of_institution"
                                value={formData.address_of_institution}
                                onChange={handleInputChange}
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        <Form.Item label="Class Level">
                            <Select
                                value={formData.class_level}
                                onChange={(value) => handleSelectChange('class_level', value)}
                                disabled={!editScholarshipApplication}
                            >
                                {CLASS_LEVEL_CHOICES.map((choice) => (
                                    <Option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {!editScholarshipApplication ? 
                            <>
                                <Form.Item label={approved ? "Organisation Approved" : "Organisation Not Approved"}>
                                <Checkbox
                                    name="organisation_approved"
                                    checked={formData.organisation_approved}
                                    disabled={true}  // Disable the checkbox to make it non-editable
                                    
                                >
                                    {approved ? <span className='text-success'>Approved</span>: <span className='text-danger'>Not Approved</span>}
                                </Checkbox>
                            </Form.Item> 
                            <Form.Item label="Organisation Signature Date">
                                <DatePicker
                                    name="organisation_signature_date"
                                    value={organisation_signature_date}
                                    onChange={(date, dateString) => handleDateChange(date, dateString, 'organisation_signature_date')}
                                    format="YYYY-MM-DD"
                                    disabled={!editScholarshipApplication}
                                />
                            </Form.Item>
                            </>
                        : null
                            }
                        
                        
                        <Form.Item label="Candidate Signature Date">
                            <DatePicker
                                name="candidate_signature_date"
                                value={formData.candidate_signature_date}
                                onChange={(date, dateString) => handleDateChange(date, dateString, 'candidate_signature_date')}
                                format="YYYY-MM-DD"
                                disabled={!editScholarshipApplication}
                            />
                        </Form.Item>
                        {editScholarshipApplication && (
                            <Row justify="center">
                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={saveEdit}
                                        loading={loading}
                                        className='m-1'
                                    >
                                        Save
                                    </Button>
                                    {
                                        approved?null:
                                        <Button
                                            type="primary"
                                            icon={<CheckCircleOutlined className='text-success' />}
                                            onClick={saveApprove}
                                            loading={loading}
                                            className='m-1'
                                        >
                                            Save and Approve
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        )}
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default AdminScholarshipApplicant;
