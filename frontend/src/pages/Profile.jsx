import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
    const [error, setError] = useState('');
    const { setLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const clickLogOut = async () => {
        setError('');
        try {
            const res = await axios.post(
                "http://localhost:8080/api/logout",
                {},
                { withCredentials: true }
            );
            setLoggedIn(false)
        } catch (err) {
            setError(err.response?.data?.error || 'Logout failed')
        }
    }

    return (
        <>
            <h1>Profile</h1>
            <div className='container'>
                <p>Hello Username</p>
                <button onClick={clickLogOut}>Logout</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        </>
    )
}