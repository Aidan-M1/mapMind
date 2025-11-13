import { useEffect, useState } from "react";

export default function useAuth() {
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

    return { authChecked, loggedIn }
}