import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams,useNavigate, Link, useLocation } from 'react-router-dom';
import { Card, Table, Layout, Button, message, Breadcrumb, Tooltip } from 'antd';
import { DeleteOutlined, HomeOutlined, PlusOutlined, ProfileOutlined, SolutionOutlined } from '@ant-design/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterComponent from '../components/Filter'; // Make sure this path is correct
const { Content } = Layout;

const ScholarshipApplicants = ({ API_URL }) => {
    const { id } = useParams();
    const location = useLocation();
    const scholarship = location?.state?.scholarship;
    console.log(location,scholarship)
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const fetchApplicants = async () => {
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
            navigate(`/admin/scholarships/${id}/applicants`, {state:{scholarship:scholarship}});
            message.success("Applicant deleted successfully!", 5);
        } catch (error) {
            console.error("Error deleting applicant", error);
            message.error("There was an error deleting the applicant!", 5);
        }
    };
    // Handle row click to navigate to scholarship applicant details
    const handleRowClick = (record) => {
        navigate(`/admin/scholarships/${id}/applicants/${record.id}`, {state:{scholarship:scholarship}});
    };

    const filterApplicants = useCallback(({ itemName,dateRange }) => {
        let filtered = applicants;

        if (itemName) {
            const searchTerms = itemName ? itemName.toLowerCase().split(' ').filter(itemName => itemName): '';
            filtered = filtered.filter(applicant => {
                return ( searchTerms.every(searchTerm =>
                    applicant.first_name.toLowerCase().includes(searchTerm) ||
                    applicant.last_name.toLowerCase().includes(searchTerm) ||
                    applicant.email.toLowerCase().includes(searchTerm) ||
                    applicant.home_address.toLowerCase().includes(searchTerm) ||
                    applicant.class_level.toLowerCase().includes(searchTerm) ||
                    applicant.phone_number.toLowerCase().includes(searchTerm))
                );
            }
            );
        }

        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            filtered = filtered.filter(applicant=> {
                const applicantDate = new Date(applicant.candidate_signature_date);
                return applicantDate >= startDate && applicantDate <= endDate;
            });
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
            dataIndex: 'candidate_signature_date',
            key: 'candidate_signature_date',
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
                        { href: '/#/admin/scholarships', title: (<><ProfileOutlined /><span style={{textDecoration:'none'}}>Scholarships</span></>) },
                        { href: `/#/admin/scholarships/${id}`, title: (<span style={{textDecoration:'none'}}>{scholarship.name}</span>) },
                        { title: (<><SolutionOutlined /><span style={{textDecoration:'none'}}>Applicants</span></>) },
                    ]}
                />
                <Tooltip title='Add Applicant'>
                    <Link to={`/admin/scholarships/${id}/applicants/add`} state={{scholarship:scholarship}} style={{textDecoration:'none'}}>
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
                    <FilterComponent onSearch={filterApplicants} name date /> {/* Include filter options */}
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
