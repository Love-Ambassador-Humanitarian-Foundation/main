import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Pagination, Tooltip, Avatar, Tag } from 'antd';
import storyimg from '../assets/storyimg.jpeg';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import { FacebookOutlined, WhatsAppOutlined, LinkedinOutlined, TwitterOutlined, InstagramOutlined, UserOutlined } from '@ant-design/icons';
import { useUpdateLoginStatus } from '../hooks/hooks';
import { getAbout, getPartners, getUsers } from '../services/api';

const { Meta } = Card;

const AboutPage = ({ API_URL, Companyname }) => {
  const location = useLocation();
  const { isLoggedIn, userDetails } = useUpdateLoginStatus(API_URL);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4; // Number of team members per page

  const totalMembers = teamMembers.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutResponse = await getAbout(API_URL);
        setData(aboutResponse);
      } catch (error) {
        console.error(error.message);
      }
      try {
        const membersResponse = await getUsers(API_URL);
        const startIndex = (currentPage - 1) * pageSize;
        setTeamMembers(membersResponse.slice(startIndex, startIndex + pageSize));

      } catch (error) {
        console.error(error.message);
      } 
      try {
        const partnersResponse = await getPartners(API_URL);
        setPartners(partnersResponse);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [API_URL,currentPage,pageSize]);

  useEffect(() => {
    const scrollToHashElement = (hash) => {
      if (hash) {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);

        if (element) {
          console.log(`Scrolling to element with ID: ${elementId}`);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.log(`No element found for ID: ${elementId}`);
        }
      }
    };

    if (location.hash) {
      scrollToHashElement(location.hash);
    }
  }, [location]);
  const renderTextWithBold = (text) => {
    // Split text based on asterisks
    const parts = text.split('**');

    return parts.map((part, index) => {
      // If the part is at an odd index, it was inside an asterisk and should be bold
      if (index % 2 !== 0) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div id="about">
      <HeaderComponent Companyname={Companyname} isloggedIn={isLoggedIn} userDetails={userDetails} />
      <div className="container py-5">
        <div className="row d-flex align-items-start mt-5" id="story">
          <div className="col-xs-12 col-md-6">
            <img src={storyimg} alt="About Us" className="img-fluid" style={{ width: '100%' }} />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="text-center text-md-start">
              <h2 className="mb-4">Our Story</h2>
              <p style={{ textAlign: 'justify', textIndent: '60px' }}>{renderTextWithBold(data?.story)}</p>
            </div>
          </div>
        </div>

        <hr />
        <div className="row mt-5" id="mission">
          <div className="col">
            <h2 className="mb-4 text-center">Our Mission</h2>
            <p style={{ textAlign: 'justify', textIndent: '60px' }}>{renderTextWithBold(data?.mission)}</p>
          </div>
        </div>
        <hr />
        <div className="row mt-5" id="policies">
          <div className="col">
            <h2 className="mb-4 text-center">Our Policies</h2>
            <p style={{ textAlign: 'justify', textIndent: '60px' }}>{renderTextWithBold(data?.policies)}</p>
          </div>
        </div>

        <hr />
        <div className="row mt-5" id="values">
          <div className="col">
            <h2 className="mb-4 text-center">Our Values</h2>
            <p style={{ textAlign: 'justify', textIndent: '60px' }}>{renderTextWithBold(data?.values)}</p>
          </div>
        </div>

        <hr />
        <div className="row mt-5" id="team">
          <div className="col">
            <h2 className="mb-4 text-center">Our Team</h2>
            <Row gutter={[16, 16]}>
              {teamMembers.map((member, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <Avatar
                        size={'100%'}
                        shape="square"
                        src={member.profileImage}
                        icon={
                          <UserOutlined
                            style={{
                              fontSize: '172px',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        }
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    }
                    bodyStyle={{ padding: '10px' }}
                  >
                    <Meta title={`${member.firstname} ${member.lastname}`} description={member.position} />
                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                      {(member.facebook || member.instagram || member.linkedin || member.twitter || member.whatsapp) && (
                        <>
                          {member.facebook && (
                            <Tooltip title="Facebook">
                              <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ fontSize: '16px', margin: '0 10px', color: '#3b5998' }} />
                              </a>
                            </Tooltip>
                          )}
                          {member.instagram && (
                            <Tooltip title="Instagram">
                              <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ fontSize: '16px', margin: '0 10px', color: '#d6249f' }} />
                              </a>
                            </Tooltip>
                          )}
                          {member.linkedin && (
                            <Tooltip title="LinkedIn">
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <LinkedinOutlined style={{ fontSize: '16px', margin: '0 10px', color: '#0a66c2' }} />
                              </a>
                            </Tooltip>
                          )}
                          {member.twitter && (
                            <Tooltip title="Twitter">
                              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                                <TwitterOutlined style={{ fontSize: '16px', margin: '0 10px', color: '#0a66c2' }} />
                              </a>
                            </Tooltip>
                          )}
                          {member.whatsapp && (
                            <Tooltip title="WhatsApp">
                              <a href={member.whatsapp} target="_blank" rel="noopener noreferrer">
                                <WhatsAppOutlined style={{ fontSize: '16px', margin: '0 10px', color: '#25d366' }} />
                              </a>
                            </Tooltip>
                          )}
                        </>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              className="mt-4 text-center"
              current={currentPage}
              total={totalMembers}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        <hr />
        <div className="row mt-5" id="partners">
          <div className="col">
            <h2 className="mb-4 text-center">Our Partners</h2>
            <Row gutter={[16, 16]}>
              {partners.length > 0 ? (
                partners.map((partner, index) => (
                  <Col key={index} xs={12} sm={8} md={6} lg={4}>
                    <Card
                      hoverable
                      cover={
                        partner.logo ? (
                          <img
                            alt={partner.title}
                            src={partner.logo}
                            style={{ height: '150px', objectFit: 'contain' }}
                          />
                        ) : (
                          <div
                            style={{
                              height: '150px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f0f0f0',
                            }}
                          >
                            <span>No Logo</span>
                          </div>
                        )
                      }
                      onClick={() => window.open(partner.link, '_blank')}
                    >
                      <Meta title={partner.title} description={partner.description} />
                    </Card>
                  </Col>
                ))
              ) : (
                <Tag color="orange">No Partners Yet</Tag>
              )}
            </Row>
          </div>
        </div>

        <hr />
        <div className="row mt-5" id="accountdetails">
          {data?.account_details.length > 0 ? (
            <div className="col">
              <h2 className="mb-4 text-center">Bank Accounts</h2>
              <Row gutter={[16, 16]}>
                {data?.account_details.map((account, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6}>
                    <Card hoverable bodyStyle={{ padding: '12px' }} style={{ borderRadius: '0px' }}>
                      <Meta
                        description={
                          <div>
                            <p>
                              <strong>Bank Name:</strong> {account.bankname || 'N/A'}
                            </p>
                            <p>
                              <strong>Account Holder's Name:</strong> {account.holdername || 'N/A'}
                            </p>
                            {account.currency && (
                              <p>
                                <strong>Currency:</strong> {account.currency}
                              </p>
                            )}
                            {account.number && (
                              <p>
                                <strong>Account Number:</strong> {account.number}
                              </p>
                            )}
                            {account.sortcode && (
                              <p>
                                <strong>Sort Code:</strong> {account.sortcode}
                              </p>
                            )}
                            {account.iban && (
                              <p>
                                <strong>IBAN:</strong> {account.iban}
                              </p>
                            )}
                            {account.swiftbic && (
                              <p>
                                <strong>SWIFT:</strong> {account.swiftbic}
                              </p>
                            )}
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <div className="col text-center">
              <Tag color="orange">No Bank Accounts Yet</Tag>
            </div>
          )}
        </div>
      </div>
      <Footer Companyname={Companyname} API_URL={API_URL}  />
    </div>
  );
};

export default AboutPage;
