import React, { useEffect, useState } from 'react';
import {
    HomeOutlined,
    EditOutlined,
    SaveOutlined,
    FilePdfOutlined,
    UserOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import {
    Row, Col, Typography, Input, Button, message,
    Breadcrumb, Select, Layout, Form, DatePicker,
    Checkbox, Tooltip
} from 'antd';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import currencyCodes from 'currency-codes';
import logo from '../assets/logo.jpg';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;

const singularUnits = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
const pluralUnits = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
const years = Array.from({ length: 20 }, (_, i) => dayjs().year() - i);

const Scholarship = ({ API_URL }) => {
    const { id } = useParams();
    const [editScholarship, setEditScholarship] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const currentDate = dayjs();  // Use dayjs for current date formatting
    const [formData, setFormData] = useState({
        id: "",
        name: '',
        description: '',
        year: dayjs().year(),
        amount_approved: '',
        currency: 'USD',
        duration: '',
        durationUnit: 'months',
        created_date: null,
        is_expired: null
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/scholarships/${id}?current_date=${currentDate.format('YYYY-MM-DD')}`);
                const data = response.data.data;

                setFormData({
                    id: data.id || '',
                    name: data.name || '',
                    description: data.description || '',
                    year: data.year || dayjs().year(),
                    amount_approved: data.amount_approved || '',
                    currency: data.currency || 'USD',
                    duration: data.duration ? data.duration.split(' ')[0] : '',
                    durationUnit: data.duration ? data.duration.split(' ')[1] : 'months',
                    created_date: data.created_date ? dayjs(data.created_date) : null,
                    is_expired: data.is_expired || null
                });
            } catch (error) {
                console.error('Error fetching scholarship details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [API_URL, id, currentDate]);

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

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            created_date: date
        }));
    };

    const saveEdit = async () => {
        setLoading(true);
        try {
            await axios.patch(`${API_URL}/api/scholarships/${id}`, {
                ...formData,
                duration: formData.duration + ' ' + formData.durationUnit,
                created_date: formData.created_date ? formData.created_date.format('YYYY-MM-DD') : null,
                current_date: currentDate.format('YYYY-MM-DD')
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success('Scholarship details updated');
            setEditScholarship(false);
        } catch (error) {
            console.error('Error updating scholarship details:', error);
            message.error('Error updating scholarship details');
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

            doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);
            doc.setFontSize(companyNameFontSize);
            doc.setFont('Helvetica', 'bold');
            doc.text('LOVE AMBASSADORS HUMANITARIAN', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            doc.text('FOUNDATION (LAHF)', doc.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
            doc.setFont('Arial', 'normal');
            doc.setFontSize(titleFontSize);
            doc.text('Scholarship Form', doc.internal.pageSize.getWidth() / 2, 38, { align: 'center' });
            doc.text(`Name: ${formData.name}`, 20, 60);
            doc.text(`Year: ${formData.year}`, 20, 70);
            doc.text(`Amount Approved: ${formData.amount_approved} ${formData.currency}`, 20, 80);
            doc.text(`Duration: ${formData.duration} ${formData.durationUnit}`, 20, 90);
            doc.text(`Created Date: ${formData.created_date ? formData.created_date.format('YYYY-MM-DD') : ''}`, 20, 100);
            doc.save(`scholarship_${formData.name}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setPdfLoading(false);
        }
    };

    const currencyOptions = currencyCodes.codes().map(code => (
        <Option key={code} value={code}>
            {`${currencyCodes.code(code).currency} (${code})`}
        </Option>
    ));

    const durationUnitOptions = () => {
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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className='d-flex justify-content-between align-items-center p-2 m-2' style={{ backgroundColor: '#d7d7e9' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/scholarships', title: (<><ProfileOutlined /><span style={{textDecoration:'none'}}>Scholarships</span></>) },
                        { title: (<span>{formData.name}</span>) },
                    ]}
                />
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <Tooltip title="View Applicants">
                        <Link to={`/admin/scholarships/${formData.id}/applicants`} state={{scholarship:formData}} style={{ textDecoration: 'none' }}>
                            <UserOutlined className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                        </Link>
                    </Tooltip>

                    {pdfLoading ? <div className='spinnersmall'></div> : null}
                    <Tooltip title='Generate pdf'>
                        <FilePdfOutlined onClick={generatePdf} className='mx-2 text-danger' style={{ fontSize: '20px', color: pdfLoading ? 'gray' : 'black', cursor: pdfLoading ? 'not-allowed' : 'pointer' }} />
                    </Tooltip>
                    <Tooltip title='Edit Scholarship'>
                        <EditOutlined onClick={() => setEditScholarship(!editScholarship)} className='mx-2' style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
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
                        <Title level={3}>
                            {formData.name}
                        </Title>
                        <Text className='m-4'>
                            {formData.id}
                        </Text>
                        <Form.Item label="Scholarship Name" className='mt-4'>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input.TextArea
                                name="description"
                                value={formData.description}
                                rows={7}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        <Form.Item label="Year">
                            <Select
                                name="year"
                                value={formData.year}
                                onChange={value => handleSelectChange('year', value)}
                                disabled={!editScholarship}
                            >
                                {years.map(year => (
                                    <Option key={year} value={year}>
                                        {year}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Amount Approved">
                            <Input
                                name="amount_approved"
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
                                {currencyOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Duration">
                            <Input
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleInputChange}
                                disabled={!editScholarship}
                                addonAfter={
                                    <Select
                                        name="durationUnit"
                                        value={formData.durationUnit}
                                        onChange={value => handleSelectChange('durationUnit', value)}
                                        disabled={!editScholarship}
                                    >
                                        {durationUnitOptions()}
                                    </Select>
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Created Date">
                            <DatePicker
                                name="created_date"
                                value={formData.created_date ? dayjs(formData.created_date) : null}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                                disabled={!editScholarship}
                            />
                        </Form.Item>
                        {!editScholarship ? 
                            <Form.Item label="Is Expired">
                                <Checkbox
                                    checked={formData.is_expired}  // Use 'checked' to reflect the value
                                    disabled={true}  // Disable the checkbox to make it non-editable
                                >
                                    {formData.is_expired ? <span className='text-danger'>Expired</span>: <span className='text-success'>Not Expired</span>}
                                </Checkbox>
                            </Form.Item> 
                        : null}

                        {editScholarship && (
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

export default Scholarship;
