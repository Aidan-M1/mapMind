import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Game from './Game';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';


function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <header>
        <h1>Geography Game</h1>
      </header>

      <nav>    
        <NavLink to="/">Home</NavLink>
        <NavLink to="/game">Game</NavLink>

        {!loggedIn && (
          <NavLink to="/login">Login</NavLink>
        )}
        {loggedIn && (
          <NavLink to="/profile">Profile</NavLink>
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

      <footer>
        <h3>Footer</h3>
      </footer>
      
    </BrowserRouter>
  );
}

export default App;