import React from 'react'
import { Navigate } from "react-router-dom";
import Dashboard from './Dashboard';

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("@user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/login" replace={true} />
            )}
            <Dashboard />
        </>
    )
}

export default ProtectedRoute
