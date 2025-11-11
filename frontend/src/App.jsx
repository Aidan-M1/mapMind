import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Game from './Game';
import Register from './Register';

const navLinkStyles = ({ isActive }) => ({
  color: isActive ? '#007bff' : '#333',
  textDecoration: isActive ? 'none' : 'underline',
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px'
});

function Home() {
  return <h1>Home</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: '20px' }}>
        <NavLink to="/" style={navLinkStyles}>Home</NavLink> |{" "}
        <NavLink to="/game" style={navLinkStyles}>Game</NavLink> |{" "}
        <NavLink to="/login" style={navLinkStyles}>Login</NavLink>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;