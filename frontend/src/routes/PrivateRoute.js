import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUpdateLoginStatus } from '../hooks/hooks';

const PrivateRoute = ({ children, redirectUrl, API_URL }) => {
    const { isLoggedIn } = useUpdateLoginStatus(API_URL);
    console.log('loggedin,',isLoggedIn)
    // Wait until `isLoggedIn` is determined
    if (isLoggedIn === null) {
        return null; // or a loading spinner
    }

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ redirectUrl }} />
    );
};

export default PrivateRoute;
