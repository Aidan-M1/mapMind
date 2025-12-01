import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Game from './pages/Game';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';


function App() {
  const { loggedIn, username } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <header>
        <h1>Geography Game</h1>
      </header>

      <nav>    
        <div className='left-links'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/game">Game</NavLink>
        </div>
        <div className='right-links'>
          {!loggedIn && (
            <NavLink to="/login">Login</NavLink>
          )}
          {loggedIn && (
            <NavLink to="/profile">{ username }</NavLink>
          )}
        </div>
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