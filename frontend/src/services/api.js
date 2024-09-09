import axios from 'axios';

//-------------about------------------------
export const getAbout = async(API_URL) => {
    const response = await axios.get(`${API_URL}/api/about`);
    return(response.data.data);
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
    const response = await axios.get(`${API_URL}/api/scholarships/${id}?current_date=${currentDate.format('YYYY-MM-DD')}`);
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


//-------------partners------------------
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

//--------------events------------------------
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
