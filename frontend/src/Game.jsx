import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Game() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/protected', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => setMsg(r.data.hello)).catch(() => setMsg('error'));
  }, []);
  return <div>Protected message: {msg}</div>;
}