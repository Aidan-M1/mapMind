import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";

export default function AuthProvider({ children }) {
    const [authChecked, setAuthChecked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:8080/api/check-session', 
                    { withCredentials: true }
                );
                setLoggedIn(res.data.loggedIn);
            } catch (err) {
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
            loggedIn, 
            setLoggedIn
        }}>
            { children }
        </AuthContext.Provider>
    );
};