import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default function ProtectedRoute({ children }) {
    const [authChecked, setAuthChecked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/check-session', {
                    withCredentials: true
                });
                setLoggedIn(res.data.loggedIn);
            } catch (err) {
                setLoggedIn(false);
            } finally {
                setAuthChecked(true);
            }
        };
        checkSession();
    }, []);
    
    if (!authChecked) { 
        return <p>Loading.....</p>;
    }
    if (!loggedIn) { 
        return <Navigate to="/login" replace />;
    }
    return children;
}