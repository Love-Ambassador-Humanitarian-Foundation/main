import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUpdateLoginStatus } from '../utils/hooks';
import { fetchUserDetails } from './utils';

const PrivateRoute = ({ children, redirectUrl, API_URL }) => {
    const isLoggedIn = useUpdateLoginStatus();
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchUserData = () => {
            fetchUserDetails(API_URL)
                .then(userData => {
                    setUserDetails(userData);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setIsLoading(false);
                });
        };
        fetchUserData();
    }, [API_URL]);

    if (isLoading) {
        return null; // or return loading indicator
    }

    return isLoggedIn && userDetails ? (
        children
    ) : (
        <Navigate to="/login" state={{ redirectUrl: redirectUrl }} />
    );
};

export default PrivateRoute;
