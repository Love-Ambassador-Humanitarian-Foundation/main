import { useState, useEffect } from 'react';

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
        const updateLoginStatus = () => {
            const token = localStorage.getItem('lahf_access_token');
            const userId = localStorage.getItem('lahf_user_id');
            setIsLoggedIn(token && userId ? true : false);
        };

        // Call the function to update login status when the component mounts
        updateLoginStatus();

        // Listen for changes in local storage and update login status accordingly
        window.addEventListener('storage', updateLoginStatus);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', updateLoginStatus);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return isLoggedIn;
};
