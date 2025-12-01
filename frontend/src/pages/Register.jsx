import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setLoggedIn } = useContext(AuthContext);
  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values, [name]: value}));
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (!inputs.username || !inputs.password || !inputs.confirmPassword){
        setError('Please complete all fields.');
        return;
      }
      if (inputs.password !== inputs.confirmPassword){
        setError('Passwords do not match.');
        return;
      }
      try {
        const res = await axios.post(
            "http://localhost:8080/api/register", 
            { 
              username: inputs.username, 
              password: inputs.password, 
              confirmPassword: inputs.confirmPassword,
            },
            { withCredentials: true }
        );
        setLoggedIn(true);
        navigate('/game');
      } catch (err) {
        setError(err.response?.data?.error || 'Registration failed');
      }
    }
  
    return (
      <>
        <h2>Register</h2>
        <form onSubmit ={handleSubmit} className="container">
            <label>Username:
            <input 
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
            />
            </label>
            <label>Password:
            <input 
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
            />
            </label>
            <label>Confirm Password:
            <input
                type="password"
                name="confirmPassword"
                value={inputs.confirmPassword}
                onChange={handleChange}  
            />
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="submit" value="Register"/>
        </form>
      </>
    )
  }