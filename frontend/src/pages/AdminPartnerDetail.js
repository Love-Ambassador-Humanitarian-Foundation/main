import React, { useState, useEffect } from 'react';
import {
    HomeOutlined,
    EditOutlined,
    SaveOutlined,
    FilePdfOutlined,
    TeamOutlined,
    UploadOutlined
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import {
    Row, Col, Typography, Input, Button, message,
    Breadcrumb, Layout, Form, DatePicker,
    Tooltip, Image, Upload
} from 'antd';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import dayjs from 'dayjs';  // Import dayjs for date formatting

const { Title, Text } = Typography;
const { Content } = Layout;

const Partner = ({ API_URL }) => {
    const { id } = useParams();
    const [editPartner, setEditPartner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [logoLoading, setLogoLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: '',
        description: '',
        logo: '',  // Base64 encoded string for the logo
        link: '',
        created_date: dayjs(),  // Default to current date
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            created_date: date
        }));
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_URL}/api/partners/${id}`);
                const data = response.data.data;

                setFormData({
                    id: data.id || '',
                    title: data.title || '',
                    description: data.description || '',
                    logo: data.logo || '',
                    link: data.link || '',
                    created_date: data.created_date ? dayjs(data.created_date) : null,
                });
            } catch (error) {
                console.error('Error fetching partner details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, id]);

    const handleLogoUpload = (file) => {
        setLogoLoading(true);

        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            setFormData(prevData => ({
                ...prevData,
                logo: `data:image/png;base64,${base64String}`
            }));
            message.success('Logo uploaded successfully');
        };

        reader.onerror = (error) => {
            console.error('There was an error uploading the file!', error);
            message.error('Failed to upload image. Please try again.');
        };

        reader.readAsDataURL(file);  // Ensure 'file' is of type Blob/File

        setLogoLoading(false);
    };

    const saveEdit = async () => {
        setLoading(true);
        try {
            await axios.patch(`${API_URL}/api/partners/${id}`, {
                ...formData,
                created_date: formData.created_date ? formData.created_date.format('YYYY-MM-DD') : null,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            message.success('Partner details updated');
            setEditPartner(false);
        } catch (error) {
            console.error('Error updating Partner details:', error);
            message.error('Error updating Partner details');
        } finally {
            setLoading(false);
        }
    };

    const generatePdf = async () => {
        setPdfLoading(true);
        try {
            const doc = new jsPDF();
            const logoWidth = 34;
            const logoHeight = 30;
            const companyNameFontSize = 17;
            const titleFontSize = 14;

            if (formData.logo) {
                const imgData = formData.logo;
                doc.addImage(imgData, 'PNG', 10, 10, logoWidth, logoHeight);
            }
            
            doc.setFontSize(companyNameFontSize);
            doc.setFont('Helvetica', 'bold');
            doc.text('LOVE AMBASSADORS HUMANITARIAN', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            doc.text('FOUNDATION (LAHF)', doc.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
            doc.setFont('Arial', 'normal');
            doc.setFontSize(titleFontSize);
            doc.text('Scholarship Form', doc.internal.pageSize.getWidth() / 2, 38, { align: 'center' });
            doc.text(`Name: ${formData.title}`, 20, 60);
            doc.text(`Link: ${formData.link}`, 20, 70);
            doc.text(`Description: ${formData.description}`, 20, 80);
            doc.text(`Created Date: ${formData.created_date ? formData.created_date.format('YYYY-MM-DD') : ''}`, 20, 90);
            doc.save(`partner_${formData.title}.pdf`);
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
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/partners', title: (<><TeamOutlined /><span style={{ textDecoration: 'none' }}>Partner</span></>) },
                        { title: (<span>{formData.title}</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    {pdfLoading && <div className='spinnersmall'></div>}
                    <Tooltip title='Generate PDF'>
                        <FilePdfOutlined onClick={generatePdf} className='mx-2 text-danger' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title='Edit Partner'>
                        <EditOutlined onClick={() => setEditPartner(!editPartner)} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
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
                                    {formData.title}
                                </Title>
                            </Col>
                            <Col>
                                {editPartner ? (
                                    <Upload
                                        name="logo"
                                        showUploadList={false}
                                        customRequest={({ file, onSuccess, onError }) => {
                                            try {
                                                handleLogoUpload(file);  // Pass the file directly
                                                onSuccess();  // Call onSuccess when upload is successful
                                            } catch (error) {
                                                onError(error);  // Call onError if there is an issue
                                            }
                                        }}
                                    >
                                        <Button loading={logoLoading} icon={<UploadOutlined />}>Upload Logo</Button>
                                    </Upload>
                                ) : (
                                    <Image
                                        width={100}
                                        src={formData.logo}
                                        alt="Logo"
                                    />
                                )}
                            </Col>
                        </Row>
                        <Text className='m-4'>
                            {formData.id}
                        </Text>
                        <Form.Item label="Partner Title" className='mt-4'>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                disabled={!editPartner}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input.TextArea
                                name="description"
                                value={formData.description}
                                rows={7}
                                onChange={handleInputChange}
                                disabled={!editPartner}
                            />
                        </Form.Item>
                        <Form.Item label="Link">
                            <Input
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                disabled={!editPartner}
                            />
                        </Form.Item>
                        <Form.Item label="Created Date">
                            <DatePicker
                                name="created_date"
                                value={formData.created_date}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                                disabled={!editPartner}
                            />
                        </Form.Item>
                        {editPartner && (
                            <Row justify="center">
                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
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

export default Partner;
