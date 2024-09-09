import { useState, useEffect } from 'react';
import { fetchUserDetails } from '../utils/helper';

// Custom hook to update login status
export const useUpdateLoginStatus = (API_URL ) => {
    const userd = fetchUserDetails(API_URL);
    const [isLoggedIn, setIsLoggedIn] = useState(userd ? true : false);
    const [userDetails, setUserDetails] = useState(userd);

    useEffect(() => {
        const updateLoginStatus = async() => {
            const userData = await fetchUserDetails(API_URL);
            setUserDetails(userData);
            setIsLoggedIn(userData ? true : false);
        };

        // Call the function to update login status when the component mounts
        updateLoginStatus();

        // Listen for changes in local storage and update login status accordingly
        window.addEventListener('storage', updateLoginStatus);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', updateLoginStatus);
        };
    }, [API_URL]); // Depend only on API_URL

    return { isLoggedIn, userDetails };
};

