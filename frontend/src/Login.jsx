import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export default function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
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
      try {
        const res = await axios.post(
            "http://localhost:8080/api/login", 
            { username: inputs.username, password: inputs.password },
            { withCredentials: true }
        );
        setLoggedIn(true)
        navigate('/game');
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed');
      }
    }

    const clickRegister = () => {
      navigate('/register');
    }
  
    return (
      <>
        <h1>Login</h1>
        <form onSubmit ={handleSubmit}>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="submit" value="Login"/>
        </form>
        <p>Don't have an account? <button onClick={clickRegister}>Register Here</button></p>
      </>
    )
  }