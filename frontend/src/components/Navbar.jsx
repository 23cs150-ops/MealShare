import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login/restaurant');
  };

  return (
    <nav className="navbar">
      <div style={{ fontWeight: 700 }}>
        <Link to="/">ShareMeal</Link>
      </div>
      <div className="nav-links">
        {user?.role === 'restaurant' && <Link to="/restaurant">Restaurant</Link>}
        {user?.role === 'ngo' && <Link to="/ngo">NGO</Link>}
        {user?.role === 'ngo' && <Link to="/ngo/requests">My Requests</Link>}
        {!user && <Link to="/login/restaurant">Restaurant Login</Link>}
        {!user && <Link to="/login/ngo">NGO Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <button className="button" style={{ padding: '6px 10px' }} onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
