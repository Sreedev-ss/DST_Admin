import React from "react";
import { Navigate, useLocation } from "react-router-dom";
/* eslint-disable */
const ProtectedRoute = ({ children }) => {
    let location = useLocation();
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
        return <Navigate to="/authentication/sign-in" state={{ from: location }} replace />
    }
    return children
}

export default ProtectedRoute