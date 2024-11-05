import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../authSlice';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const user = useSelector((state) => state.auth.user); // Update with the correct path to user state
    const dispatch = useDispatch();
    const authTokens = useSelector((state) => state.auth.authTokens);

    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens, dispatch]);

    useEffect(() => {
        if (user) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, [user]);

    if (isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center justify-center p-5">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
