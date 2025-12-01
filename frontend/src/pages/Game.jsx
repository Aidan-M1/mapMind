import { useEffect, useState } from 'react';
import axios from 'axios';

import Map from "./Map";

export default function Game() {
  const [msg, setMsg] = useState('');
  return (
    <Map></Map>
  )
}