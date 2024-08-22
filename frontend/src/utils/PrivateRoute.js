import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUpdateLoginStatus } from '../utils/hooks';

const PrivateRoute = ({ children, redirectUrl, API_URL }) => {
    const isLoggedIn = useUpdateLoginStatus();

    console.log('is logged in:', isLoggedIn);

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ redirectUrl: redirectUrl }} />
    );
};

export default PrivateRoute;
