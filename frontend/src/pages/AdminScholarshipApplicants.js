import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { Card, Table, Layout, Button, message, Row, Col, Breadcrumb, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, FileMarkdownOutlined, HomeOutlined, PlusOutlined, ProfileOutlined, SolutionOutlined } from '@ant-design/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterComponent from '../components/Filter'; // Make sure this path is correct
import dayjs from 'dayjs';
const { Content } = Layout;

const ScholarshipApplicants = ({ API_URL }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const [applicants, setApplicants] = useState([]);
    const [scholarship, setScholarship] =useState({})
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const fetchApplicants = async () => {
            try {
                const responsescholarsip = await axios.get(`${API_URL}/api/scholarships/${id}?current_date=${currentDate}`);
                setScholarship(responsescholarsip.data.data);
            } catch (error){
                console.error("Error fetching scholarship", error);
                message.error("There was an error fetching the scholarship!", 5);
            } 
            try {
                const response = await axios.get(`${API_URL}/api/scholarshipapplicants?scholarship_id=${id}`);
                // console.log(response.data.data)
                setApplicants(response.data.data);
                setFilteredApplicants(response.data.data); // Initialize filteredApplicants
            } catch (error) {
                console.error("Error fetching applicants", error.response);
                message.error("There was an error fetching the applicants!", 5);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplicants();
    }, [API_URL, id, currentDate]);

    const deleteApplicant = async (applicantId) => {
        try {
            await axios.delete(`${API_URL}/api/scholarshipapplicants/${applicantId}?scholarship_id=${id}`);
            const updatedApplicants = applicants.filter(applicant => applicant.id !== applicantId);
            setApplicants(updatedApplicants);
            setFilteredApplicants(updatedApplicants);
            navigate(`/admin/scholarships/${id}/applicants`);
            message.success("Applicant deleted successfully!", 5);
        } catch (error) {
            console.error("Error deleting applicant", error);
            message.error("There was an error deleting the applicant!", 5);
        }
    };
    // Handle row click to navigate to scholarship applicant details
    const handleRowClick = (record) => {
        navigate(`/admin/scholarships/${id}/applicants/${record.id}`, {state:{scholarshipName:scholarship.name}});
    };

    const filterApplicants = useCallback(({ name, email }) => {
        let filtered = applicants;

        if (name) {
            const searchTerm = name.toLowerCase();
            filtered = filtered.filter(applicant =>
                applicant.first_name.toLowerCase().includes(searchTerm) ||
                applicant.last_name.toLowerCase().includes(searchTerm)
            );
        }

        if (email) {
            const emailTerm = email.toLowerCase();
            filtered = filtered.filter(applicant =>
                applicant.email.toLowerCase().includes(emailTerm)
            );
        }

        setFilteredApplicants(filtered);
    }, [applicants]);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Class Level',
            dataIndex: 'class_level',
            key: 'class_level',
        },
        {
            title: 'Approved',
            dataIndex: 'organisation_approved',
            key: 'organisation_approved',
            render: (text) => (text ? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>),
        },
        {
            title: 'Application Date',
            dataIndex: 'signature_date',
            key: 'signature_date',
            render: (date) => (date ? dayjs(date) : 'N/A'),
        },
        
        {
            
            key: 'actions',
            render: (_, record) => (
                <>
                <Button
                    type="primary"
                    icon={<DeleteOutlined className="text-danger" />}
                    onClick={() => deleteApplicant(record.id)}
                    className='m-1'
                />
                </>
            ),
        },
    ];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout style={{ marginTop: '70px', height: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center p-2 m-2" style={{ backgroundColor: '#d7d7e9', borderRadius: '4px' }}>
                <Breadcrumb
                    items={[
                        { href: '/', title: <HomeOutlined /> },
                        { href: '/#/admin/scholarships', title: (<><SolutionOutlined /><span style={{textDecoration:'none'}}>Scholarships</span></>) },
                        { href: `/#/admin/scholarships/${id}`, title: (<span style={{textDecoration:'none'}}>{scholarship.name}</span>) },
                        { title: (<><ProfileOutlined /><span style={{textDecoration:'none'}}>Applicants</span></>) },
                    ]}
                />
                <Tooltip title='Add Applicant'>
                    <Link to={`admin/scholarships/${id}/applicants/add`} style={{textDecoration:'none'}}>
                        <PlusOutlined style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                    </Link>
                </Tooltip>
            </div>
            <Content className="m-2">
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: '#fff',
                        borderRadius: '4px',
                        height: 'calc(100vh - 140px)',
                    }}
                >
                    <FilterComponent onSearch={filterApplicants} name email /> {/* Include filter options */}
                    <Card title="Applicants" bordered style={{ borderRadius: '2px' }}>
                        <Table
                            dataSource={filteredApplicants}
                            columns={columns}
                            pagination={{ pageSize: 10 }}
                            rowClassName="clickable-row"
                            scroll={{ x: 'max-content' }}
                            onRow={(record) => ({
                                onClick: () => handleRowClick(record),
                            })}
                        />
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default ScholarshipApplicants;
