import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to update login status
export const useUpdateLoginStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Check initial values in local storage
        const token = localStorage.getItem('lahf_access_token');
        const userId = localStorage.getItem('lahf_user_id');
        return token && userId ? true : false;
    });

    useEffect(() => {
        // Update the state when the component mounts or local storage changes
        const token = localStorage.getItem('lahf_access_token');
        const userId = localStorage.getItem('lahf_user_id');
        setIsLoggedIn(token && userId ? true : false);
    }, []); // Empty dependency array means this effect runs once after the initial render

    return isLoggedIn;
};


// Custom hook to update user details
export const useUpdateUserDetails = async (API_URL) => {
    const token = localStorage.getItem('lahf_access_token');
    const userId = localStorage.getItem('lahf_user_id');

    try {
        const response = await axios.get(`${API_URL}/api/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Set user details in state
        //setUserDetails(response.data.data);
        //console.log('User details fetched:', response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null
    }
    
};
