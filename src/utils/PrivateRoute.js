import React from 'react';
import { Navigate } from 'react-router-dom';
import {useUpdateLoginStatus, useUpdateUserDetails} from '../utils/UpdateLoginstatus';
const PrivateRoute = ({ children, redirectUrl, API_URL }) => {
    const isLoggedIn = useUpdateLoginStatus();
    const userDetails = useUpdateUserDetails(API_URL);
    
    return (isLoggedIn && userDetails) ? children : <Navigate to="/login" state={{ redirectUrl: redirectUrl }} />;
};

export default PrivateRoute;
