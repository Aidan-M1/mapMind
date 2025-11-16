import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";


export default function ProtectedRoute({ children }) {
    const { authChecked, loggedIn } = useContext(AuthContext);

    if (!authChecked) { 
        return <p>Loading.....</p>;
    }
    if (!loggedIn) { 
        return <Navigate to="/login" replace />;
    }
    return children;
}