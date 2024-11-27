import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const response = await fetch("https://localhost:7010/api/Authentification/ChangePassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          oldPassword,  
          newPassword,  
        }),
      });

      if (!response.ok) {
        const errorData = await response.text(); 
        let errorMessage = 'Something went wrong.';

        if (errorData) {
          try {
            const jsonErrorData = JSON.parse(errorData);
            errorMessage = jsonErrorData.message || errorMessage;
          } catch (e) {
            console.error('Error parsing response:', e);
          }
        }

        setError(errorMessage);
        return;
      }

      const data = await response.json();
      setMessage(data.message); 
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(''); 

    } catch (error) {
      setError('Error communicating with the server.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2>Change Password</h2>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Change Password</button>
        </form>

        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default ChangePassword;

