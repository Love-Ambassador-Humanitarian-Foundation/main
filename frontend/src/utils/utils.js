import axios from 'axios';
import jsQR from 'jsqr';

/**
 * Decodes QR code from an image URL or base64 string.
 * @param {string} imageSrc - The URL or base64 string of the QR code image.
 * @returns {Promise<string>} - The decoded text from the QR code.
 */

export const decodeQRCode = async (imageSrc) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, img.width, img.height);
            if (code) {
                resolve(code.data);
            } else {
                reject('QR code not detected');
            }
        };
        img.onerror = (error) => reject(error);
    });
};

export const countryCodes = [
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
export const eventTypes = [
  { value: 'seminar', name: 'Seminar' },
  { value: 'fundraiser', name: 'Fundraiser' },
  { value: 'donation', name: 'Donation' },
  { value: 'awareness', name: 'Awareness' },
  { value: 'conference', name: 'Conference' },
  { value: 'workshop', name: 'Workshop' },
  { value: 'webinar', name: 'Webinar' },
  { value: 'networking', name: 'Networking' },
  { value: 'panel', name: 'Panel Discussion' },
  { value: 'training', name: 'Training' },
  { value: 'charity', name: 'Charity Event' },
  { value: 'meetup', name: 'Meetup' },
  { value: 'competition', name: 'Competition' },
  { value: 'hackathon', name: 'Hackathon' },
  { value: 'retreat', name: 'Retreat' },
  { value: 'social', name: 'Social Event' },
  { value: 'volunteering', name: 'Volunteering' },
  { value: 'exhibition', name: 'Exhibition' },
  { value: 'summit', name: 'Summit' },
  { value: 'launch', name: 'Product Launch' },
  { value: 'celebration', name: 'Celebration' },
  { value: 'festival', name: 'Festival' },
  { value: 'fundraising', name: 'Fundraising Event' },
  { value: 'gala', name: 'Gala Dinner' },
  { value: 'concert', name: 'Concert' },
  { value: 'reunion', name: 'Reunion' },
  { value: 'rally', name: 'Rally' },
  { value: 'lecture', name: 'Lecture' },
  { value: 'symposium', name: 'Symposium' },
  { value: 'openhouse', name: 'Open House' },
  { value: 'camp', name: 'Camp' },
  { value: 'screening', name: 'Film Screening' },
  { value: 'birthday', name: 'Birthday Party' },
  { value: 'wedding', name: 'Wedding' },
  { value: 'anniversary', name: 'Anniversary Celebration' },
  { value: 'trade_show', name: 'Trade Show' },
  { value: 'expo', name: 'Expo' },
  { value: 'community', name: 'Community Event' },
  { value: 'roundtable', name: 'Roundtable Discussion' },
  { value: 'debate', name: 'Debate' },
  { value: 'press_conference', name: 'Press Conference' },
  { value: 'demonstration', name: 'Demonstration' },
  { value: 'fund', name: 'Fundraising' }
];

export const getRandomBgColorClass = () => {
  const colors = [
      'bg-primary',
      'bg-secondary',
      'bg-success',
      'bg-danger',
      'bg-warning',
      'bg-info',
      'bg-light',
      'bg-dark',
      'bg-white'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const fetchUserDetails = (API_URL) => {
  return verifyAccessToken(API_URL)
      .then((userId) => {
          if (userId) {
              return axios.get(`${API_URL}/api/users/${userId}`, {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('lahf_access_token')}`
                  }
              });
          } else {
              console.error('User ID not found after token verification');
              return null;
          }
      })
      .then((response) => {
          if (response && response.data) {
              return response.data.data;
          } else {
              return null;
          }
      })
      .catch((error) => {
          console.error('Error fetching user details:', error);
          return null;
      });
};

export const verifyAccessToken = (API_URL) => {
  const token = localStorage.getItem('lahf_access_token');
  if (!token) {
      console.error('No access token found');
      return Promise.resolve(null);
  }

  return axios.post(`${API_URL}/api/users/token/verify`, { token })
      .then((response) => {
          if (response.data && response.data.user_id) {
              return response.data.user_id;
          } else {
              console.error('Token verification failed or user_id missing in response');
              return null;
          }
      })
      .catch((error) => {
          console.error('Error verifying access token:', error);
          return null;
      });
};



export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
  
};

export const convertVideoToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = async (base64String, fileName) => {
  const res = await fetch(base64String);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};

export const detectenterkey = (e,rows, setRows) =>{
  if (e.key === 'Enter') {
    e.preventDefault();  // Prevent the default behavior of adding a new line
    setRows(rows => rows + 1);  // Increase the number of rows
}
}