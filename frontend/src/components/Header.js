
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import '../App.css';

const Header = () => {
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="site-title">
        <Link to="/">COMP3123</Link>
      </div>
      <div className="header-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="welcome-message">Welcome, {username}!</span>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
