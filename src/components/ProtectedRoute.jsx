import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/business" />;
    }

    // If a specific role is required (investor or management)
    if (role && user.appRole !== role) {
        return <Navigate to="/business" />;
    }

    return children;
};

export default ProtectedRoute;
