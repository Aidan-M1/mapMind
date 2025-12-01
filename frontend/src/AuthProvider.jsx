import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";

export default function AuthProvider({ children }) {
    const [authChecked, setAuthChecked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:8080/api/check-session', 
                    { withCredentials: true }
                );
                console.log(res.data)
                setUsername(res.data.username);
                setLoggedIn(res.data.loggedIn);
            } catch (err) {
                setUsername('');
                setLoggedIn(false);
            } finally {
                setAuthChecked(true);
            }
        };
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{
            authChecked,
            username,
            loggedIn, 
            setLoggedIn
        }}>
            { children }
        </AuthContext.Provider>
    );
};