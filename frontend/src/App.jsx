import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Game from './Game';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';


const navLinkStyles = ({ isActive }) => ({
  color: isActive ? '#007bff' : '#333',
  textDecoration: isActive ? 'none' : 'underline',
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px'
});


function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <nav style={{ marginBottom: '20px' }}>
        <NavLink to="/" style={navLinkStyles}>Home</NavLink>
        |{" "}<NavLink to="/game" style={navLinkStyles}>Game</NavLink>
        {!loggedIn && (
          <>
          |{" "}<NavLink to="/login" style={navLinkStyles}>Login</NavLink>
          </>
        )}
        {loggedIn && (
          <>
          |{" "}<NavLink to="/profile" style={navLinkStyles}>Profile</NavLink>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;