import axios from 'axios';

// Function to retrieve the HomeView data
export const getHomeView = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/home`);
        console.log(response.data.data); // Log response data
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching home view data:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch home view data');
    }
};
//-------------about------------------------
export const getAbout = async(API_URL) => {
    const response = await axios.get(`${API_URL}/api/about`);
    return(response.data.data);
};
export const createCompanyDetails = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/about`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data); // Log response data
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error creating company details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create company details');
    }
};
export const updateCompanyDetails = async (API_URL, payload) => {
    try {
        const response = await axios.put(`${API_URL}/api/about`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data); // Log response data
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error updating company details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to update company details');
    }
};
export const partialUpdateCompanyDetails = async (API_URL, payload) => {
    try {
        const response = await axios.patch(`${API_URL}/api/about`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data); // Log response data
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error partially updating company details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to partially update company details');
    }
};
export const deleteCompanyDetails = async (API_URL) => {
    try {
        const response = await axios.delete(`${API_URL}/api/about`);
        console.log(response.data.data); // Log response data
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error deleting company details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to delete company details');
    }
};


//-------------scholarships-----------------
export const addScholarship = async(API_URL, id,payload) => {
    await axios.post(`${API_URL}/api/scholarships`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return null;
};
export const getScholarships = async(API_URL,currentDate) => {
    const response = await axios.get(`${API_URL}/api/scholarships?current_date=${currentDate}`);
    //console.log(response)
    return response.data.data;
};

export const getScholarshipbyId = async(API_URL, id,currentDate) => {
    const response = await axios.get(`${API_URL}/api/scholarships/${id}?current_date=${currentDate.format('YYYY-MM-DD HH:mm:ss')}`);
    return response.data.data;
};
export const updateScholarshipbyId = async(API_URL, id,payload) => {
    await axios.put(`${API_URL}/api/scholarships/${id}`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return null;
};
export const deleteScholarship = async(API_URL,id) => {
    await axios.delete(`${API_URL}/api/scholarships/${id}`);
    return null;
};

//-------------------scholarship applicants----------------------

export const addScholarshipApplication = async(API_URL, payload) => {
    await axios.post(`${API_URL}/api/scholarshipapplicants`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return null;
};
// Function to list all scholarship applicants (with optional scholarship ID filter)
export const listScholarshipApplicants = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/scholarshipapplicants`);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error fetching scholarship applicants:', error);
        throw error;
    }
};
export const getScholarshipApplicant = async (API_URL, id) => {
    try {
        const response = await axios.get(`${API_URL}/api/scholarshipapplicants/${id}`);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error retrieving scholarship applicant:', error);
        throw error;
    }
};
export const updateScholarshipApplicant = async (API_URL, id, payload) => {
    try {
        const response = await axios.patch(`${API_URL}/api/scholarshipapplicants/${id}`, payload);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error updating scholarship applicant:', error);
        throw error;
    }
};
export const deleteScholarshipApplicant = async (API_URL, id) => {
    try {
        await axios.delete(`${API_URL}/api/scholarshipapplicants/${id}`);
        console.log('Scholarship applicant deleted successfully');
    } catch (error) {
        console.error('Error deleting scholarship applicant:', error);
        throw error;
    }
};
export const approveScholarshipApplicant = async (API_URL, id, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/scholarshipapplicants/${id}/approve`, payload);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error approving scholarship applicant:', error);
        throw error;
    }
};
export const disapproveScholarshipApplicant = async (API_URL, id) => {
    try {
        const response = await axios.post(`${API_URL}/api/scholarshipapplicants/${id}/disapprove`);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error disapproving scholarship applicant:', error);
        throw error;
    }
};



//-------------partners------------------
// Function to create a new partner
export const createPartner = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/partners`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error creating partner:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create partner');
    }
};
export const getPartners = async(API_URL) => {
    const response = await axios.get(`${API_URL}/api/partners`);
    //console.log(response)
    return response.data.data;
};
export const getPartnerbyId = async(API_URL, id) => {
    const response = await axios.get(`${API_URL}/api/partners/${id}`);
    return response.data.data;
};
export const updatePartnerbyId = async(API_URL, id,payload) => {
    await axios.put(`${API_URL}/api/partners/${id}`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return null;
};
export const deletePartner = async(API_URL,id) => {
    await axios.delete(`${API_URL}/api/partners/${id}`);
    return null;
};

//-------------volunteers/users---------------
export const createUser = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/users`, payload);
        return response.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
export const createAdminUser = async (API_URL, payload) => {
    try {
        // Make the POST request to the API
        const response = await axios.post(`${API_URL}/api/adminusers`, payload);
        
        // Return the relevant data from the response
        return response.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export const getUsers = async(API_URL) => {
    const response = await axios.get(`${API_URL}/api/users`);
    //console.log(response)
    return response.data.data;
};
export const getUserbyId = async(API_URL, id) => {
    const response = await axios.get(`${API_URL}/api/users/${id}`);
    return response.data.data;
};
export const updateUserbyId = async(API_URL, id,payload) => {
    const response = await axios.patch(`${API_URL}/api/users/${id}`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data.data;
};
export const deleteUser = async(API_URL,id) => {
    await axios.delete(`${API_URL}/api/users/${id}`);
    return null;
};


export const userLogin = async (API_URL, credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/users`, credentials);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
export const verifyToken = async (API_URL, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/token/verify`, { token });
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
};

export const confirmPasswordReset = async (API_URL, uidb64, token, newPassword) => {
    try {
        const response = await axios.get(`${API_URL}/api/password/reset/confirm/${uidb64}/${token}`, {
            params: { new_password: newPassword }
        });
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error confirming password reset:', error);
        throw error;
    }
};

export const verifyEmail = async (API_URL, uidb64, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/email/verify/${uidb64}/${token}`);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
};


export const requestPasswordReset = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/password/reset`, payload);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
};


//--------------events------------------------
export const createEvent = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/events`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data); // Log response data
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error creating event:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create event');
    }
};

export const getEvents = async(API_URL,currentDate) => {
    const response = await axios.get(`${API_URL}/api/events?current_date=${currentDate}`);
    //console.log(response)
    return response.data.data;
};
export const getEventbyId = async(API_URL, id) => {
    const response = await axios.get(`${API_URL}/api/events/${id}`);
    return response.data.data;
};
export const updateEventbyId = async(API_URL, id,payload) => {
    const response = await axios.put(`${API_URL}/api/events/${id}`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};
export const deleteEvent = async(API_URL,id) => {
    await axios.delete(`${API_URL}/api/events/${id}`);
    return null;
};

//---------------------contactus---------------------------
export const contactUs = async(API_URL, payload) => {
    const response = await axios.post(`${API_URL}/api/contactus`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

//---------------------news letters---------------------

// Function to create a newsletter
export const createNewsletter = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/newsletters`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error creating newsletter:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create newsletter');
    }
};
// Function to list all newsletters
export const listNewsletters = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/newsletter/`);
        console.log(response.data);  // Log the response
        return response.data;  // Return the data from the response
    } catch (error) {
        console.error('Error fetching newsletters:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch newsletters');
    }
};
// Function to retrieve a specific newsletter by ID
export const getNewsletterById = async (API_URL, newsletterId) => {
    try {
        const response = await axios.get(`${API_URL}/api/newsletters/${newsletterId}`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Newsletter with ID ${newsletterId} not found`);
            throw new Error(`Newsletter with ID ${newsletterId} not found`);
        }
        console.error('Error fetching newsletter:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch newsletter');
    }
};
// Function to update a newsletter by ID
export const updateNewsletter = async (API_URL, newsletterId, payload) => {
    try {
        const response = await axios.put(`${API_URL}/api/newsletters/${newsletterId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error updating newsletter:', error.response ? error.response.data : error.message);
        throw new Error('Failed to update newsletter');
    }
};
// Function to delete a newsletter by ID
export const deleteNewsletter = async (API_URL, newsletterId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/newsletters/${newsletterId}`);
        console.log('Newsletter deleted successfully');  // Log the response
        return response.data.data;  // No need to return data for delete
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Newsletter with ID ${newsletterId} not found`);
            throw new Error(`Newsletter with ID ${newsletterId} not found`);
        }
        console.error('Error deleting newsletter:', error.response ? error.response.data : error.message);
        throw new Error('Failed to delete newsletter');
    }
};


//---------------------news letter receipeints---------------------------
export const addnewsLetterReceipients = async(API_URL, payload) => {
    const response = await axios.post(`${API_URL}/api/newsletter-recipients`,payload,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response)
    return response.data.data;
};
// Function to list all newsletter recipients
export const listNewsletterRecipients = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/newsletter-recipients`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error fetching newsletter recipients:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch newsletter recipients');
    }
};
// Function to retrieve a specific newsletter recipient by ID
export const getNewsletterRecipientById = async (API_URL, recipientId) => {
    try {
        const response = await axios.get(`${API_URL}/api/newsletter-recipients/${recipientId}`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Newsletter recipient with ID ${recipientId} not found`);
            throw new Error(`Newsletter recipient with ID ${recipientId} not found`);
        }
        console.error('Error fetching newsletter recipient:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch newsletter recipient');
    }
};
// Function to update a newsletter recipient by ID
export const updateNewsletterRecipient = async (API_URL, recipientId, payload) => {
    try {
        const response = await axios.put(`${API_URL}/api/newsletter-recipients/${recipientId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error updating newsletter recipient:', error.response ? error.response.data : error.message);
        throw new Error('Failed to update newsletter recipient');
    }
};
// Function to delete a newsletter recipient by ID
export const deleteNewsletterRecipient = async (API_URL, recipientId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/newsletter-recipients/${recipientId}`);
        console.log('Recipient deleted successfully');
        return response.data.data;  // Return the response data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Recipient with ID ${recipientId} not found`);
            throw new Error(`Recipient with ID ${recipientId} not found`);
        }
        console.error('Error deleting recipient:', error.response ? error.response.data : error.message);
        throw new Error('Failed to delete recipient');
    }
};


//--------------------------payments---------------------------------

// Function to list all payments
export const listPayments = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/payments`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error fetching payments:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch payments');
    }
};

// Function to create a new payment
export const createPayment = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/payments`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error creating payment:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create payment');
    }
};
// Function to retrieve payment details
export const getPaymentDetails = async (API_URL, paymentId) => {
    try {
        const response = await axios.get(`${API_URL}/api/payments/${paymentId}`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error fetching payment details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch payment details');
    }
};

// Function to update a payment
export const updatePayment = async (API_URL, paymentId, payload) => {
    try {
        const response = await axios.put(`${API_URL}/api/payments/${paymentId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error updating payment:', error.response ? error.response.data : error.message);
        throw new Error('Failed to update payment');
    }
};

// Function to delete a payment
export const deletePayment = async (API_URL, paymentId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/payments/${paymentId}`);
        console.log('Payment deleted successfully');  // Log the response
        return response.data;  // No need to return data for delete
    } catch (error) {
        console.error('Error deleting payment:', error.response ? error.response.data : error.message);
        throw new Error('Failed to delete payment');
    }
};

//----------------------logs--------------------------
// Function to list all logs
export const listLogs = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/logs`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error fetching logs:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch logs');
    }
};

// Function to create a new log
export const createLog = async (API_URL, payload) => {
    try {
        const response = await axios.post(`${API_URL}/api/logs`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);  // Log the response
        return response.data;  // Return the data from the response
    } catch (error) {
        console.error('Error creating log:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create log');
    }
};
// Function to retrieve log details
export const getLogDetails = async (API_URL, logId) => {
    try {
        const response = await axios.get(`${API_URL}/api/logs/${logId}`);
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error fetching log details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch log details');
    }
};

// Function to update a log
export const updateLog = async (API_URL, logId, payload) => {
    try {
        const response = await axios.put(`${API_URL}/api/logs/${logId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data.data);  // Log the response
        return response.data.data;  // Return the data from the response
    } catch (error) {
        console.error('Error updating log:', error.response ? error.response.data : error.message);
        throw new Error('Failed to update log');
    }
};

// Function to delete a log
export const deleteLog = async (API_URL, logId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/logs/${logId}`);
        console.log('Log deleted successfully');  // Log the response
        return response.data.data;  // No need to return data for delete
    } catch (error) {
        console.error('Error deleting log:', error.response ? error.response.data : error.message);
        throw new Error('Failed to delete log');
    }
};
//-----------------reports-------------------
export const getVolunteerReport = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/reports/volunteer`);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error fetching volunteer report:', error);
        throw error;
    }
};
export const getScholarshipsReport = async (API_URL) => {
    try {
        const response = await axios.get(`${API_URL}/api/reports/scholarships`);
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error fetching scholarships report:', error);
        throw error;
    }
};
export const getLoggedInUsersReport = async (API_URL, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/api/reports/loggedin`, { params: { limit } });
        return response.data.data; // Accessing the data from the response
    } catch (error) {
        console.error('Error fetching logged-in users report:', error);
        throw error;
    }
};

