import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function ProtectedRoute({ children }) {
    const { authChecked, loggedIn } = useAuth();

    if (!authChecked) { 
        return <p>Loading.....</p>;
    }
    if (!loggedIn) { 
        return <Navigate to="/login" replace />;
    }
    return children;
}