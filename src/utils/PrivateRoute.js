import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children,redirectUrl }) => {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to="/login" state={{redirectUrl:redirectUrl}} />;
};

export default PrivateRoute;

