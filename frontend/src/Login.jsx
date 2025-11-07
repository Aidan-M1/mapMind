import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values, [name]: value}));
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
            "http://localhost:8080/api/login", { username: inputs.username, password: inputs.password }
        );
        localStorage.setItem('token', res.data.token);
        navigate('/game');
      } catch (err) {
        alert(err.response?.data?.error || 'Login failed');
      }
    }
  
    return (
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
        <input type="submit" />
      </form>
    )
  }