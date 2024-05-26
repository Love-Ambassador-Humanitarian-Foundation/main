import React from 'react';
import { HomeOutlined, UserOutlined , EditOutlined, SaveOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/Header';
import Footer from '../components/Footer';
import { Row, Col, Avatar, Typography,Breadcrumb,Input } from 'antd';
import { Select } from 'antd';


import { Button} from '../components/button';
import { useParams } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;

const UserProfilePage = ({Companyname,isloggedIn}) => {
    const {userdetails} = useParams();
    console.log(userdetails+"==========");
    const [editprofile,setEditProfile] = React.useState(false);
    
    const [name, setName] = React.useState('John Doe');
    const [status, setStatus] = React.useState('Active');
    const [email, setEmail] = React.useState('john@email.com');
    const [phonenumber,setPhonenumber] = React.useState('08012345678');
    const [address,setAddress] = React.useState('Lagos state');
    const [phonenumberpre,setPhonenumberpre] = React.useState('+234');
    const [facebook,setFacebook] = React.useState('facebook.com/john');
    const [instagram,setInstagram] = React.useState('instagram.com/john');
    const [twitter,setTwitter] = React.useState('twitter.com/john');
    const [linkedIn, setLinkedIn] = React.useState('linkedin.com/in/john');
    const [whatsapp,setWhatsapp] = React.useState('whatsapp.com/john');

    const saveEdit = () => {
        setEditProfile(false);
    }
    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'status') {
          setStatus(e.target.value);
        } else if (e.target.id === 'email') {
          setEmail(e.target.value);
        } else if (e.target.id === 'phonenumber') {
            const newValue = e.target.value;
            const lastChar = newValue.charAt(newValue.length - 1);
            if (!isNaN(lastChar)) {
                setPhonenumber(e.target.value); // Concatenate digits to the current phone number
                console.log(phonenumberpre+"("+e.target.value+")");
            } 
            
        } else if (e.target.id === 'address') {
            setAddress(e.target.value);
        } else if (e.target.id === 'facebook') {
            setFacebook(e.target.value);
        } else if (e.target.id === 'instagram') {
            setInstagram(e.target.value);
        } else if (e.target.id === 'twitter') {
          setTwitter(e.target.value);
        } else if (e.target.id === 'linkedIn') {
            setLinkedIn(e.target.value);
        } else if (e.target.id === 'whatsapp') {
            setWhatsapp(e.target.value);
        }

    };
    const countryCodes = [
        {
          code: "+1",
          name: "United States"
        },
        {
          code: "+93",
          name: "Afghanistan"
        },
        {
          code: "+355",
          name: "Albania"
        },
        {
          code: "+213",
          name: "Algeria"
        },
        {
          code: "+376",
          name: "Andorra"
        },
        {
          code: "+244",
          name: "Angola"
        },
        {
          code: "+1264",
          name: "Anguilla"
        },
        {
          code: "+1268",
          name: "Antigua and Barbuda"
        },
        {
          code: "+54",
          name: "Argentina"
        },
        {
          code: "+374",
          name: "Armenia"
        },
        {
          code: "+297",
          name: "Aruba"
        },
        {
          code: "+61",
          name: "Australia"
        },
        {
          code: "+43",
          name: "Austria"
        },
        {
          code: "+994",
          name: "Azerbaijan"
        },
        {
          code: "+1242",
          name: "Bahamas"
        },
        {
          code: "+973",
          name: "Bahrain"
        },
        {
          code: "+880",
          name: "Bangladesh"
        },
        {
          code: "+1246",
          name: "Barbados"
        },
        {
          code: "+375",
          name: "Belarus"
        },
        {
          code: "+32",
          name: "Belgium"
        },
        {
          code: "+501",
          name: "Belize"
        },
        {
          code: "+229",
          name: "Benin"
        },
        {
          code: "+1441",
          name: "Bermuda"
        },
        {
          code: "+975",
          name: "Bhutan"
        },
        {
          code: "+591",
          name: "Bolivia"
        },
        {
          code: "+387",
          name: "Bosnia and Herzegovina"
        },
        {
          code: "+267",
          name: "Botswana"
        },
        {
          code: "+55",
          name: "Brazil"
        },
        {
          code: "+673",
          name: "Brunei Darussalam"
        },
        {
          code: "+359",
          name: "Bulgaria"
        },
        {
          code: "+226",
          name: "Burkina Faso"
        },
        {
          code: "+257",
          name: "Burundi"
        },
        {
          code: "+855",
          name: "Cambodia"
        },
        {
          code: "+237",
          name: "Cameroon"
        },
        {
          code: "+1",
          name: "Canada"
        },
        {
          code: "+238",
          name: "Cape Verde"
        },
        {
          code: "+1345",
          name: "Cayman Islands"
        },
        {
          code: "+236",
          name: "Central African Republic"
        },
        {
          code: "+235",
          name: "Chad"
        },
        {
          code: "+56",
          name: "Chile"
        },
        {
          code: "+86",
          name: "China"
        },
        {
          code: "+61",
          name: "Christmas Island"
        },
        {
          code: "+61",
          name: "Cocos (Keeling) Islands"
        },
        {
          code: "+57",
          name: "Colombia"
        },
        {
          code: "+269",
          name: "Comoros"
        },
        {
          code: "+242",
          name: "Congo"
        },
        {
          code: "+243",
          name: "Democratic Republic of the Congo"
        },
        {
          code: "+682",
          name: "Cook Islands"
        },
        {
          code: "+506",
          name: "Costa Rica"
        },
        {
          code: "+385",
          name: "Croatia"
        },
        {
          code: "+53",
          name: "Cuba"
        },
        {
          code: "+599",
          name: "Curacao"
        },
        {
          code: "+357",
          name: "Cyprus"
        },
        {
          code: "+420",
          name: "Czech Republic"
        },
        {
          code: "+45",
          name: "Denmark"
        },
        {
          code: "+253",
          name: "Djibouti"
        },
        {
          code: "+1767",
          name: "Dominica"
        },
        {
          code: "+1809",
          name: "Dominican Republic"
        },
        {
          code: "+593",
          name: "Ecuador"
        },
        {
          code: "+20",
          name: "Egypt"
        },
        {
          code: "+503",
          name: "El Salvador"
        },
        {
          code: "+240",
          name: "Equatorial Guinea"
        },
        {
          code: "+291",
          name: "Eritrea"
        },
        {
          code: "+372",
          name: "Estonia"
        },
        {
          code: "+251",
          name: "Ethiopia"
        },
        {
          code: "+500",
          name: "Falkland Islands"
        },
        {
          code: "+298",
          name: "Faroe Islands"
        },
        {
          code: "+679",
          name: "Fiji"
        },
        {
          code: "+358",
          name: "Finland"
        },
        {
          code: "+33",
          name: "France"
        },
        {
          code: "+689",
          name: "French Polynesia"
        },
        {
          code: "+241",
          name: "Gabon"
        },
        {
          code: "+220",
          name: "Gambia"
        },
        {
          code: "+995",
          name: "Georgia"
        },
        {
          code: "+49",
          name: "Germany"
        },
        {
          code: "+233",
          name: "Ghana"
        },
        {
          code: "+350",
          name: "Gibraltar"
        },
        {
          code: "+30",
          name: "Greece"
        },
        {
          code: "+299",
          name: "Greenland"
        },
        {
          code: "+1473",
          name: "Grenada"
        },
        {
          code: "+1671",
          name: "Guam"
        },
        {
          code: "+502",
          name: "Guatemala"
        },
        {
          code: "+224",
          name: "Guinea"
        },
        {
          code: "+245",
          name: "Guinea-Bissau"
        },
        {
          code: "+592",
          name: "Guyana"
        },
        {
          code: "+509",
          name: "Haiti"
        },
        {
          code: "+504",
          name: "Honduras"
        },
        {
          code: "+852",
          name: "Hong Kong"
        },
        {
          code: "+36",
          name: "Hungary"
        },
        {
          code: "+354",
          name: "Iceland"
        },
        {
          code: "+91",
          name: "India"
        },
        {
          code: "+62",
          name: "Indonesia"
        },
        {
          code: "+98",
          name: "Iran"
        },
        {
          code: "+964",
          name: "Iraq"
        },
        {
          code: "+353",
          name: "Ireland"
        },
        {
          code: "+972",
          name: "Israel"
        },
        {
          code: "+39",
          name: "Italy"
        },
        {
          code: "+1876",
          name: "Jamaica"
        },
        {
          code: "+81",
          name: "Japan"
        },
        {
          code: "+962",
          name: "Jordan"
        },
        {
          code: "+77",
          name: "Kazakhstan"
        },
        {
          code: "+254",
          name: "Kenya"
        },
        {
          code: "+686",
          name: "Kiribati"
        },
        {
          code: "+850",
          name: "Democratic People's Republic of Korea"
        },
        {
          code: "+82",
          name: "Republic of Korea"
        },
        {
          code: "+965",
          name: "Kuwait"
        },
        {
          code: "+996",
          name: "Kyrgyzstan"
        },
        {
          code: "+856",
          name: "Lao People's Democratic Republic"
        },
        {
          code: "+371",
          name: "Latvia"
        },
        {
          code: "+961",
          name: "Lebanon"
        },
        {
          code: "+266",
          name: "Lesotho"
        },
        {
          code: "+231",
          name: "Liberia"
        },
        {
          code: "+218",
          name: "Libya"
        },
        {
          code: "+423",
          name: "Liechtenstein"
        },
        {
          code: "+370",
          name: "Lithuania"
        },
        {
          code: "+352",
          name: "Luxembourg"
        },
        {
          code: "+853",
          name: "Macao"
        },
        {
          code: "+389",
          name: "Macedonia"
        },
        {
          code: "+261",
          name: "Madagascar"
        },
        {
          code: "+265",
          name: "Malawi"
        },
        {
          code: "+60",
          name: "Malaysia"
        },
        {
          code: "+960",
          name: "Maldives"
        },
        {
          code: "+223",
          name: "Mali"
        },
        {
          code: "+356",
          name: "Malta"
        },
        {
          code: "+692",
          name: "Marshall Islands"
        },
        {
          code: "+222",
          name: "Mauritania"
        },
        {
          code: "+230",
          name: "Mauritius"
        },
        {
          code: "+52",
          name: "Mexico"
        },
        {
          code: "+691",
          name: "Micronesia"
        },
        {
          code: "+373",
          name: "Moldova"
        },
        {
          code: "+377",
          name: "Monaco"
        },
        {
          code: "+976",
          name: "Mongolia"
        },
        {
          code: "+382",
          name: "Montenegro"
        },
        {
          code: "+1664",
          name: "Montserrat"
        },
        {
          code: "+212",
          name: "Morocco"
        },
        {
          code: "+258",
          name: "Mozambique"
        },
        {
          code: "+95",
          name: "Myanmar"
        },
        {
          code: "+264",
          name: "Namibia"
        },
        {
          code: "+674",
          name: "Nauru"
        },
        {
          code: "+977",
          name: "Nepal"
        },
        {
          code: "+31",
          name: "Netherlands"
        },
        {
          code: "+599",
          name: "Netherlands Antilles"
        },
        {
          code: "+64",
          name: "New Zealand"
        },
        {
          code: "+505",
          name: "Nicaragua"
        },
        {
          code: "+227",
          name: "Niger"
        },
        {
          code: "+234",
          name: "Nigeria"
        },
        {
          code: "+683",
          name: "Niue"
        },
        {
          code: "+672",
          name: "Norfolk Island"
        },
        {
          code: "+1670",
          name: "Northern Mariana Islands"
        },
        {
          code: "+47",
          name: "Norway"
        },
        {
          code: "+968",
          name: "Oman"
        },
        {
          code: "+92",
          name: "Pakistan"
        },
        {
          code: "+680",
          name: "Palau"
        },
        {
          code: "+970",
          name: "Palestine"
        },
        {
          code: "+507",
          name: "Panama"
        },
        {
          code: "+675",
          name: "Papua New Guinea"
        },
        {
          code: "+595",
          name: "Paraguay"
        },
        {
          code: "+51",
          name: "Peru"
        },
        {
          code: "+63",
          name: "Philippines"
        },
        {
          code: "+64",
          name: "Pitcairn"
        },
        {
          code: "+48",
          name: "Poland"
        },
        {
          code: "+351",
          name: "Portugal"
        },
        {
          code: "+1787",
          name: "Puerto Rico"
        },
        {
          code: "+974",
          name: "Qatar"
        },
        {
          code: "+82",
          name: "Republic of Korea"
        },
        {
          code: "+40",
          name: "Romania"
        },
        {
          code: "+7",
          name: "Russia"
        },
        {
          code: "+250",
          name: "Rwanda"
        },
        {
          code: "+590",
          name: "Saint Barthelemy"
        },
        {
          code: "+290",
          name: "Saint Helena"
        },
        {
          code: "+1869",
          name: "Saint Kitts and Nevis"
        },
        {
          code: "+1758",
          name: "Saint Lucia"
        },
        {
          code: "+590",
          name: "Saint Martin"
        },
        {
          code: "+508",
          name: "Saint Pierre and Miquelon"
        },
        {
          code: "+1784",
          name: "Saint Vincent and the Grenadines"
        },
        {
          code: "+685",
          name: "Samoa"
        },
        {
          code: "+378",
          name: "San Marino"
        },
        {
          code: "+239",
          name: "Sao Tome and Principe"
        },
        {
          code: "+966",
          name: "Saudi Arabia"
        },
        {
          code: "+221",
          name: "Senegal"
        },
        {
          code: "+381",
          name: "Serbia"
        },
        {
          code: "+248",
          name: "Seychelles"
        },
        {
          code: "+232",
          name: "Sierra Leone"
        },
        {
          code: "+65",
          name: "Singapore"
        },
        {
          code: "+599",
          name: "Sint Maarten"
        },
        {
          code: "+421",
          name: "Slovakia"
        },
        {
          code: "+386",
          name: "Slovenia"
        },
        {
          code: "+677",
          name: "Solomon Islands"
        },
        {
          code: "+252",
          name: "Somalia"
        },
        {
          code: "+27",
          name: "South Africa"
        },
        {
          code: "+211",
          name: "South Sudan"
        },
        {
          code: "+34",
          name: "Spain"
        },
        {
          code: "+94",
          name: "Sri Lanka"
        },
        {
          code: "+249",
          name: "Sudan"
        },
        {
          code: "+597",
          name: "Suriname"
        },
        {
          code: "+47",
          name: "Svalbard and Jan Mayen"
        },
        {
          code: "+268",
          name: "Swaziland"
        },
        {
          code: "+46",
          name: "Sweden"
        },
        {
          code: "+41",
          name: "Switzerland"
        },
        {
          code: "+963",
          name: "Syrian Arab Republic"
        },
        {
          code: "+886",
          name: "Taiwan"
        },
        {
          code: "+992",
          name: "Tajikistan"
        },
        {
          code: "+255",
          name: "Tanzania"
        },
        {
          code: "+66",
          name: "Thailand"
        },
        {
          code: "+670",
          name: "Timor-Leste"
        },
        {
          code: "+228",
          name: "Togo"
        },
        {
          code: "+690",
          name: "Tokelau"
        },
        {
          code: "+676",
          name: "Tonga"
        },
        {
          code: "+1868",
          name: "Trinidad and Tobago"
        },
        {
          code: "+216",
          name: "Tunisia"
        },
        {
          code: "+90",
          name: "Turkey"
        },
        {
          code: "+993",
          name: "Turkmenistan"
        },
        {
          code: "+1649",
          name: "Turks and Caicos Islands"
        },
        {
          code: "+688",
          name: "Tuvalu"
        },
        {
          code: "+256",
          name: "Uganda"
        },
        {
          code: "+380",
          name: "Ukraine"
        },
        {
          code: "+971",
          name: "United Arab Emirates"
        },
        {
          code: "+44",
          name: "United Kingdom"
        },
        {
          code: "+598",
          name: "Uruguay"
        },
        {
          code: "+998",
          name: "Uzbekistan"
        },
        {
          code: "+678",
          name: "Vanuatu"
        },
        {
          code: "+379",
          name: "Vatican City State"
        },
        {
          code: "+58",
          name: "Venezuela"
        },
        {
          code: "+84",
          name: "Viet Nam"
        },
        {
          code: "+1284",
          name: "Virgin Islands"
        },
        {
          code: "+681",
          name: "Wallis and Futuna"
        },
        {
          code: "+967",
          name: "Yemen"
        },
        {
          code: "+260",
          name: "Zambia"
        },
        {
          code: "+263",
          name: "Zimbabwe"
        }
    ];
    const items = [
        { title: 'Fundraising', 
            amount:34,
            content: [
                {title: 'Upcoming Fundraiser', date: 'May 25th, 2023'},
                {title: 'Fundraiser Report', date: 'June 15th, 2023'}
            ] },
        { title: 'Volunteering', 
            amount:34,
            content: [
                {title: 'Orphanage visitation', date: 'May 25th, 2023'},
                {title: 'Food distribution', date: 'June 15th, 2023'},
                {title: 'Clothes donation drive', date: 'July 1st-15th, 2023'}
            ] },
        { title: 'Donation', 
            amount:34,
            content: [
                {title: 'Donation Drive', date: 'June 15th - 30th, 2023'},
                {title: 'Donation Drive Report', date: 'July 15th, 2023'}
            ] },
        { title: 'Seminars', 
            amount:34,
            content: [
                {title: 'Seminar on Nutrition', date: 'July 10th, 2023'},
                {title: 'Seminar on Child Development', date: 'August 15th, 2023'}
            ] },
        {
          title:'Partnerships',
          amount:1,
          content: [
              {title: 'Partnership with XYZ Foundation', date: 'August 30th, 2023'},
          ]
        }
    ]
      
    const selectBefore = (
        <Select defaultValue={phonenumberpre} disabled={!editprofile} onChange={(value) => setPhonenumberpre(value)} style={{minWidth: '80px'}}>
            {countryCodes.map((country, index) => (
                <Option key={index} value={country.code}>
                {country.code}
                </Option>
            ))}
        </Select>
    );

    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} />
            <div className='mt-5 p-4 pt-5 '>
                <div className='d-flex justify-content-between align-items-center p-2 mb-4' style={{backgroundColor: '#d7d7e9' }}>
                    <Breadcrumb
                        items={[
                            {href: '/',title: <HomeOutlined />,},
                            {title: (<><UserOutlined /><span>{userdetails}dfsvdff</span></>),},
                        ]}
                    />
                    <EditOutlined onClick={() =>setEditProfile(true)} style={{ fontSize: '20px', color: 'black', cursor: 'pointer' }} />
                </div>
                <Row justify="center" align="middle" style={{ marginBottom: '30px' }} >
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{backgroundColor: '#d7d7e9'}} >
                        <div className='d-flex flex-column justify-content-between align-items-center ms-2 p-2'>
                            <Avatar size={150} src="https://example.com/avatar.jpg" />
                            <div className='d-flex flex-column justify-content-left'>
                                <Title level={3}>Mr. John Doe</Title>
                                <Text strong>Status: {userdetails}</Text> 
                                <Text strong>Phone Number: {userdetails}</Text> 
                                <Text strong>Email: {userdetails}</Text> 
                                <Text strong>Location: New York, USA</Text> 
                            </div>
                        </div>
                    </Col>
                    
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} span={24} >
                        <div className='d-flex flex-column justify-content-left ms-2 p-2'>
                            <Text strong> 
                                Full Name: <input id="name" type="text" className="form-control" placeholder={name} value={name} onChange={handleInputChange} disabled={!editprofile} />
                            </Text>
                            <Text strong>Status: <input id="status" type="text" className="form-control" placeholder={status} value={status} disabled /></Text> 
                            <Text strong>Phone Number: <Input id="phonenumber" type="text" addonBefore={editprofile && selectBefore }  placeholder={phonenumber} onChange={handleInputChange} value={phonenumber} disabled={!editprofile} />
                            </Text> 
                            <Text strong>Email: <input id="email" type="text" className="form-control" placeholder={email} value={email} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            <Text strong>Address: <input id="address" type="text" className="form-control" placeholder={address} value={address} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                        </div>  
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{display: 'flex',alignItems: 'flex-start'}} >
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-left py-2' >
                            <Text strong className='mb-2'>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                Face Book <span></span>
                                </a>
                            <FacebookOutlined style={{fontSize:16, color:'#1877F2'}} />: <input id="facebook" type="text" className="form-control" placeholder={facebook} value={facebook} onChange={handleInputChange} disabled={!editprofile} /></Text>
                            
                            <Text strong className='mb-2'>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Twitter <span></span>
                                </a>
                                <TwitterOutlined style={{fontSize:16,color:'#1DA1F2'}} />: <input id="twitter" type="text" className="form-control" placeholder={twitter} value={twitter} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                            <Text strong className='mb-2'>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Instagram <span></span>
                                </a>
                                <InstagramOutlined style={{fontSize:16, color:'#E4405F'}} />: <input id="instagram" type="text" className="form-control" placeholder={instagram} value={instagram} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                            <Text strong className='mb-2'>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    Whatsapp <span></span>
                                </a>
                            <WhatsAppOutlined style={{fontSize:16, color:'#25D366'}} />: <input id="whatsapp" type="text" className="form-control" placeholder={whatsapp} value={whatsapp} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                            <Text strong className='mb-2'>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='mt-2 text-decoration-none text-black'>
                                    LinkedIn <span></span>
                                </a>
                            <LinkedinOutlined style={{fontSize:16, color:'#0077B5'}} />: <input id="linkedln" type="text" className="form-control" placeholder={linkedIn} value={linkedIn} onChange={handleInputChange} disabled={!editprofile} /></Text> 
                            
                        </div>  
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className='d-flex flex-column justify-content-left ms-2'>
                            {items.map((item, index) => (
                                <div key={index} className='my-2'>
                                    <Text strong>{item.title} - ({item.amount}) : {item.content.map((c) => (<input id={`${index}-${c.title}`} type="text" className="form-control" placeholder={c.title} value={`${c.title} - ${c.date}`} disabled />))}</Text>
                                </div>
                            ))}
                        </div>  
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ marginTop: '30px' }}>
                    {editprofile ?
                    <Col>
                        <Button text="Save Changes" icon={<SaveOutlined style={{ color: '#25D366' }} />} onClick={saveEdit} />
                    </Col>
                    :
                    <>
                    </>
                    }
                </Row>
                
            </div>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </> 
  );
};

export default UserProfilePage;

