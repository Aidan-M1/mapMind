import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Game() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/api/protected', {
      withCredentials: true
    })
    .then(r => setMsg(r.data.hello))
    .catch(() => setMsg('error'));
  }, [])
  return <div className="container">Protected message: {msg}</div>;
}