
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import LogoutButton from './LogoutButton';

interface NavbarProps {
  showLogout: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>CodeBusters Peer Assessment</h2>
      </div>
      <div className="navbar-links">
        <div className="left-links">
          {!showLogout && (
            <>
              <Link to="/">Login</Link>
              <Link to="/signup">Register</Link>
            </>
          )}
          {showLogout && (
            <>
              <Link to="/change-password">Change Password</Link>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

