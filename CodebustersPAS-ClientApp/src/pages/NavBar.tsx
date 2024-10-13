
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>CodeBusters Peer Assessment</h2>
      </div>
      <div className="navbar-links">
        <Link to="/">Login</Link>
        <Link to="/signup">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
